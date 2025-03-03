/* eslint-disable @typescript-eslint/no-explicit-any */

import Container from "../components/content-container";
import { FaMedal } from "react-icons/fa";

import { Edit3, Trash2 } from "lucide-react";
import Popup from "../components/popup";
import { API_BASE_URL, DepartmentsTypes, StaffTypes } from "../../types";
import { MoreModal } from "../components/more_modal";
import { useEffect, useState } from "react";

export default function Staff() {
  const [staffs, setStaff] = useState<StaffTypes[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStaff, setFilteredStaff] = useState<StaffTypes[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStaffId, setCurrentStaffId] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState<StaffTypes>();
  const [newStaff, setNewStaff] = useState({
    id: 0,
    name: "",
    email: "",
    department: "",
    role: "",
    phone: 0,
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/staffs/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setStaff(data.data); // <-- Ensure Staff state is updated
        setFilteredStaff(data.data); // <-- This initializes filtered Staff
      } else {
        console.error("Error fetching staffs:", data.error);
      }
    } catch (error) {
      console.error("Error fetching staffs:", error);
    }
  };

  const handleAddStaff = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/staffs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStaff), // <-- Send new Staff data
      });

      const data = await response.json();
      if (response.ok) {
        setStaff((prevStaff) => [...prevStaff, data.data]); // <-- Append new Staff
        setFilteredStaff((prevStaff) => [...prevStaff, data.data]);
        setSuccessMessage("Staff added successfully! 🏅");
      } else {
        console.error("Error adding Staff:", data.error);
      }

      closeModal();
    } catch (error) {
      console.error("Error adding Staff:", error);
    }
  };

  const handleOpenUpdateModal = (staff: any) => {
    setNewStaff(staff); // Populate the modal fields with Staff details
    setCurrentStaffId(staff.id); // Set the ID correctly
    setIsUpdating(true);
    setIsModalOpen(true);
  };

  const handleFetchStaff = async (id: number) => {
    if (!id) {
      console.error("Staff ID is required for updating.");
      return;
    }

    try {
      const getStaffResponse = await fetch(`${API_BASE_URL}/staffs/id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataFetched = await getStaffResponse.json();

      if (getStaffResponse.ok) {
        setNewStaff(dataFetched.data); // Populate inputs
      } else {
        console.error("Error fetching Staff:", dataFetched.error);
      }
    } catch (error) {
      console.error("Error fetching Staff:", error);
    }
  };

  const handleUpdateStaff = async () => {
    if (!currentStaffId) {
      console.error("Staff ID is required for updating.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/staffs/id=${currentStaffId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newStaff), // Use updated state
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStaff((prevStaff) =>
          prevStaff.map((Staff) =>
            Staff.id === Number(newStaff.id) ? data.data : Staff
          )
        );
        setFilteredStaff((prevStaff) =>
          prevStaff.map((Staff) =>
            Staff.id === Number(newStaff.id) ? data.data : Staff
          )
        );
        setSuccessMessage("Staff updated successfully! 🏅");
        closeModal();
      } else {
        console.error("Error updating Staff:", data.error);
      }
    } catch (error) {
      console.error("Error updating Staff:", error);
    }
  };

  const handleDeleteStaff = async () => {
    if (!staffToDelete) {
      console.error("Staff ID is required for deletion.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/staffs/id=${staffToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setStaff((prevStaff) =>
          prevStaff.filter((Staff) => Staff.id !== staffToDelete)
        );
        setFilteredStaff((prevStaff) =>
          prevStaff.filter((Staff) => Staff.id !== staffToDelete)
        );

        setSuccessMessage("Staff deleted successfully! 🏅");
      } else {
        const data = await response.json();
        console.error("Error deleting Staff:", data.error);
      }

      // closePopup();
    } catch (error) {
      console.error("Error deleting Staff:", error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewStaff((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsUpdating(false);
    setNewStaff({
      id: 0,
      name: "",
      email: "",
      department: "",
      role: "",
      phone: 0,
    });
  };

  const closePopup = () => {
    setPopup(false);
    setStaffToDelete(null);
  };

  // Filter Staff based on the search term
  useEffect(() => {
    const results = staffs.filter((Staff: StaffTypes) =>
      Staff.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStaff(results);
  }, [searchTerm, staffs]);

  const onDoubleClick = (staff: StaffTypes) => {
    setSelectedStaff({
      name: staff.name,
      email: staff.email,
      department: staff.department,
      role: staff.role,
      phone: staff.phone,
      password: staff.password,
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
          handleSaveStaff={isUpdating ? handleUpdateStaff : handleAddStaff}
          newStaff={newStaff}
          isUpdating={isUpdating}
        />
      )}

      {selectedStaff && (
        <MoreModal
          details={selectedStaff}
          closeModal={() => setSelectedStaff(undefined)}
        />
      )}

      {popup && (
        <Popup
          title={"Delete"}
          text={"Are you sure you want to delete this Staff?"}
          buttonText={"Delete"}
          buttonColor={"red"}
          handleOnClick={handleDeleteStaff}
          closePopup={closePopup}
        />
      )}

      <Container title="Staff">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Staff..."
            className="p-2 border rounded-md shadow-sm w-1/3 outline-none border-gray-300  bg-white"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
          >
            Create Staff
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
                <th className="px-4 py-2 font-semibold ">STAFF NAME</th>
                <th className="px-4 py-2 font-semibold ">EMAIL</th>
                <th className="px-4 py-2 font-semibold ">PHONE NUMBER</th>
                <th className="px-4 py-2 font-semibold ">DEPARTMENT</th>
                <th className="px-4 py-2 font-semibold ">ROLE</th>
                <th className="px-4 py-2 font-semibold ">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.length > 0 ? (
                filteredStaff.map((Staff: StaffTypes, index) => (
                  <tr
                    className="hover:bg-blue-50"
                    key={Staff.id}
                    onDoubleClick={onDoubleClick.bind(null, Staff)}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{Staff.name}</td>
                    <td className="px-4 py-2">{Staff.email}</td>
                    <td className="px-4 py-2">{Staff.phone}</td>
                    <td className="px-4 py-2">{Staff.department}</td>
                    <td className="px-4 py-2">{Staff.role}</td>
                    <td className="px-4 py-2 flex gap-3">
                      <button
                        className="flex items-center text-white p-[4px] bg-blue-500 rounded-md"
                        onClick={() => {
                          handleOpenUpdateModal(Staff);
                          handleFetchStaff(Staff.id as number);
                        }}
                      >
                        <Edit3 size={20} />
                      </button>
                      <button
                        className="flex items-center text-white p-[4px] bg-red-500 rounded-md"
                        onClick={() => {
                          setPopup(true);
                          setStaffToDelete(Staff.id || 0);
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
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-4">
                    No Staff found
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
  handleSaveStaff,
  newStaff,
  isUpdating,
}: any) {
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/departments/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setDepartments(data.data); // <-- Ensure Departments state is updated
      } else {
        console.error("Error fetching departments:", data.error);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);
  return (
    <div className="bg-black/30 absolute w-screen h-screen z-10 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md shadow-black/30">
        <div className="mb-6 bg-blue-100 px-2 rounded">
          <h1 className="text-xl text-blue-500 font-semibold">
            {isUpdating ? "Update Staff" : "Create Staff"}
          </h1>
          <p className="text-gray-500 text-sm">
            {isUpdating
              ? "Dont make any errors when updating"
              : "Dont make any errors when creating an Staff"}
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-[1px]">
            <label htmlFor="expiry_date" className="text-gray-500 text-sm">
              Full Name
            </label>
            <input
              type="text"
              name={"name"}
              id={"name"}
              onChange={handleInputChange}
              className="border-2 border-gray-300 p-2 rounded-md outline-blue-500"
              placeholder="John Doe"
              value={newStaff.name}
            />
          </div>
          <div className="flex flex-col gap-[1px]">
            <label htmlFor="email" className="text-gray-500 text-sm">
              Phone Number
            </label>
            <input
              type="number"
              name={"phone"}
              id={"phone"}
              onChange={handleInputChange}
              className="border-2 border-gray-300 p-2 rounded-md outline-blue-500"
              placeholder="0530950232"
              value={newStaff.phone}
            />
          </div>
          <div className="flex flex-col gap-[1px]">
            <label htmlFor="email" className="text-gray-500 text-sm">
              Email
            </label>
            <input
              type="email"
              name={"email"}
              id={"email"}
              onChange={handleInputChange}
              className="border-2 border-gray-300 p-2 rounded-md outline-blue-500"
              placeholder="JohnDoe@gmail.com"
              value={newStaff.email}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm">Role</label>
            <select
              name="role"
              id="role"
              onChange={handleInputChange}
              className="border-2 border-gray-300 p-2 rounded-md outline-blue-500"
            >
              <option value="">
                {newStaff.role ? newStaff.role : "Select Role"}
              </option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm">Department</label>
            <select
              name="department"
              id="department"
              onChange={handleInputChange}
              className="border-2 border-gray-300 p-2 rounded-md outline-blue-500"
              value={newStaff.department}
            >
              <option value="">
                {newStaff.department || "Select Department"}
              </option>
              {departments.map((dept: DepartmentsTypes) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-[1px]">
            <label htmlFor="email" className="text-gray-500 text-sm">
              Password
            </label>
            <input
              type="password"
              name={"password"}
              id={"password"}
              onChange={handleInputChange}
              className="border-2 border-gray-300 p-2 rounded-md outline-blue-500"
              placeholder="********"
              value={newStaff.password}
            />
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
            onClick={handleSaveStaff}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            {isUpdating ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
