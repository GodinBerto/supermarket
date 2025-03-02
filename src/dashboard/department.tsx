/* eslint-disable @typescript-eslint/no-explicit-any */

import Container from "../components/content-container";
import { FaMedal } from "react-icons/fa";

import { Edit3, Trash2 } from "lucide-react";
import Popup from "../components/popup";
import { DepartmentsTypes } from "../../types";
import { MoreModal } from "../components/more_modal";
import { useEffect, useState } from "react";

export default function Departments() {
  const [departments, setDepartments] = useState<DepartmentsTypes[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState<
    DepartmentsTypes[]
  >([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<number | null>(
    null
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentDepartmentId, setCurrentDepartmentId] = useState(null);
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentsTypes>();
  const [newDepartment, setNewDepartment] = useState({
    id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/departments/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setDepartments(data.data); // <-- Ensure Departments state is updated
        setFilteredDepartments(data.data); // <-- This initializes filtered Departments
      } else {
        console.error("Error fetching departments:", data.error);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleAddDepartment = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/departments/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDepartment), // <-- Send new Department data
        }
      );

      const data = await response.json();
      if (response.ok) {
        setDepartments((prevDepartments) => [...prevDepartments, data.data]); // <-- Append new Department
        setFilteredDepartments((prevDepartments) => [
          ...prevDepartments,
          data.data,
        ]);
        setSuccessMessage("Department added successfully! 🏅");
      } else {
        console.error("Error adding Department:", data.error);
      }

      closeModal();
    } catch (error) {
      console.error("Error adding Department:", error);
    }
  };

  const handleOpenUpdateModal = (department: any) => {
    setNewDepartment(department); // Populate the modal fields with Department details
    setCurrentDepartmentId(department.id); // Set the ID correctly
    setIsUpdating(true);
    setIsModalOpen(true);
  };

  const handleFetchDepartment = async (id: number) => {
    if (!id) {
      console.error("Department ID is required for updating.");
      return;
    }

    try {
      const getDepartmentResponse = await fetch(
        `http://127.0.0.1:8000/api/v1/departments/id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const dataFetched = await getDepartmentResponse.json();

      if (getDepartmentResponse.ok) {
        setNewDepartment(dataFetched.data); // Populate inputs
      } else {
        console.error("Error fetching Department:", dataFetched.error);
      }
    } catch (error) {
      console.error("Error fetching Department:", error);
    }
  };

  const handleUpdateDepartment = async () => {
    if (!currentDepartmentId) {
      console.error("Department ID is required for updating.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/departments/id=${currentDepartmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDepartment), // Use updated state
        }
      );

      const data = await response.json();

      if (response.ok) {
        setDepartments((prevDepartments) =>
          prevDepartments.map((Department) =>
            Department.id === Number(newDepartment.id) ? data.data : Department
          )
        );
        setFilteredDepartments((prevDepartments) =>
          prevDepartments.map((Department) =>
            Department.id === Number(newDepartment.id) ? data.data : Department
          )
        );
        setSuccessMessage("Department updated successfully! 🏅");
        closeModal();
      } else {
        console.error("Error updating Department:", data.error);
      }
    } catch (error) {
      console.error("Error updating Department:", error);
    }
  };

  const handleDeleteDepartment = async () => {
    if (!departmentToDelete) {
      console.error("Department ID is required for deletion.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/departments/id=${departmentToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setDepartments((prevDepartments) =>
          prevDepartments.filter(
            (Department) => Department.id !== departmentToDelete
          )
        );
        setFilteredDepartments((prevDepartments) =>
          prevDepartments.filter(
            (Department) => Department.id !== departmentToDelete
          )
        );

        setSuccessMessage("Department deleted successfully! 🏅");
      } else {
        const data = await response.json();
        console.error("Error deleting Department:", data.error);
      }

      // closePopup();
    } catch (error) {
      console.error("Error deleting Department:", error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewDepartment((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsUpdating(false);
    setNewDepartment({
      id: "",
      name: "",
      description: "",
    });
  };

  const closePopup = () => {
    setPopup(false);
    setDepartmentToDelete(null);
  };

  // Filter Departments based on the search term
  useEffect(() => {
    const results = departments.filter((Department: DepartmentsTypes) =>
      Department.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDepartments(results);
  }, [searchTerm, departments]);

  const onDoubleClick = (department: DepartmentsTypes) => {
    setSelectedDepartment({
      name: department.name,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  }, [successMessage]);
  return (
    <div>
      {isModalOpen && (
        <Medal
          closeModal={closeModal}
          handleInputChange={handleInputChange}
          handleSaveDepartment={
            isUpdating ? handleUpdateDepartment : handleAddDepartment
          }
          newDepartment={newDepartment}
          isUpdating={isUpdating}
        />
      )}

      {selectedDepartment && (
        <MoreModal
          details={selectedDepartment}
          closeModal={() => setSelectedDepartment(undefined)}
        />
      )}

      {popup && (
        <Popup
          title={"Delete"}
          text={"Are you sure you want to delete this Department?"}
          buttonText={"Delete"}
          buttonColor={"red"}
          handleOnClick={handleDeleteDepartment}
          closePopup={closePopup}
        />
      )}

      <Container title="Departments">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Department..."
            className="p-2 border rounded-md shadow-sm w-1/3 outline-none border-gray-300  bg-white"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
          >
            Create Department
          </button>
        </div>

        {successMessage && (
          <div className="flex items-center justify-center bg-green-100 text-green-600 p-4 rounded-md mb-4">
            <FaMedal className="mr-2" />
            <p>{successMessage}</p>
          </div>
        )}

        <div className="bg-white p-4 rounded-lg shadow-md shadow-blue-300">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="px-4 py-2 font-semibold ">ID</th>
                <th className="px-4 py-2 font-semibold ">DEPARTMENT NAME</th>
                <th className="px-4 py-2 font-semibold ">DISCRIPTION</th>
                <th className="px-4 py-2 font-semibold ">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.length > 0 ? (
                filteredDepartments.map(
                  (Department: DepartmentsTypes, index) => (
                    <tr
                      className="hover:bg-blue-50"
                      key={Department.id}
                      onDoubleClick={onDoubleClick.bind(null, Department)}
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{Department.name}</td>
                      <td className="px-4 py-2">{Department.description}</td>
                      <td className="px-4 py-2 flex gap-3">
                        <button
                          className="flex items-center text-white p-[4px] bg-blue-500 rounded-md"
                          onClick={() => {
                            handleOpenUpdateModal(Department);
                            handleFetchDepartment(Department.id as number);
                          }}
                        >
                          <Edit3 size={20} />
                        </button>
                        <button
                          className="flex items-center text-white p-[4px] bg-red-500 rounded-md"
                          onClick={() => {
                            setPopup(true);
                            setDepartmentToDelete(Department.id || 0);
                          }}
                        >
                          <Trash2 size={20} />
                        </button>
                        {/* <button
                        className="text-gray-500 hover:text-blue-500"
                        onClick={() => {}}
                      >
                        <MoreVertical size={20} />
                      </button> */}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-4">
                    No Department found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}

function Medal({
  closeModal,
  handleInputChange,
  handleSaveDepartment,
  newDepartment,
  isUpdating,
}: any) {
  return (
    <div className="bg-black/30 absolute w-screen h-screen z-10 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md shadow-black/30">
        <div className="mb-6 bg-blue-100 px-2 rounded">
          <h1 className="text-xl text-blue-500 font-semibold">
            {isUpdating ? "Update Department" : "Create Department"}
          </h1>
          <p className="text-gray-500 text-sm">
            {isUpdating
              ? "Dont make any errors when updating"
              : "Dont make any errors when creating an Department"}
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-[1px]">
            <label htmlFor="expiry_date" className="text-gray-500 text-sm">
              Department Name
            </label>
            <input
              type="text"
              name={"name"}
              id={"name"}
              onChange={handleInputChange}
              className="border-2 border-gray-300 p-2 rounded-md outline-blue-500"
              placeholder="John Doe"
              value={newDepartment.name}
            />
          </div>
          {/* Added Description Text Area */}
          <div className="flex flex-col gap-[1px]">
            <label htmlFor="description" className="text-gray-500 text-sm">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={6}
              onChange={handleInputChange}
              className="border-2 border-gray-300 p-2 rounded-md outline-blue-500"
              placeholder="Enter a brief description..."
              value={newDepartment.description}
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={closeModal}
            className="bg-gray-100 hover:bg-gray-200 text-gray-500 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveDepartment}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            {isUpdating ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
