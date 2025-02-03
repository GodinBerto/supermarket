import { useState, useEffect } from "react";
import Container from "../components/content-container";
import { FaMedal } from "react-icons/fa";

import { Edit3, MoreVertical, Trash2 } from "lucide-react";
import Popup from "../components/popup";

export default function Item() {
  const [employees, _setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [successMessage, _setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [_currentEmployeeId, setCurrentEmployeeId] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    salary: "",
    status: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      //   const data = await getAllEmployees();
      //   setEmployees(data);
      //   setFilteredEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleAddEmployee = async () => {
    try {
      //   await addEmployee(newEmployee);
      //   setSuccessMessage("Employee added successfully! 🎉");
      //   fetchEmployees();
      closeModal();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleOpenUpdateModal = (employee: any) => {
    setNewEmployee(employee);
    setCurrentEmployeeId(employee.id);
    setIsUpdating(true);
    setIsModalOpen(true);
  };

  const handleUpdateEmployee = async () => {
    try {
      //   await updateEmployee(currentEmployeeId, newEmployee);
      //   setSuccessMessage("Employee updated successfully! 🏅");
      //   fetchEmployees();
      closeModal();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDeleteEmployee = async () => {
    try {
      if (employeeToDelete) {
        // await deleteEmployee(employeeToDelete);
        // setSuccessMessage("Employee deleted successfully! 🏅");
        // fetchEmployees();
        closePopup();
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsUpdating(false);
    setNewEmployee({ name: "", email: "", phone: "", salary: "", status: "" });
  };

  const closePopup = () => {
    setPopup(false);
    setEmployeeToDelete(null);
  };

  // Filter employees based on the search term
  useEffect(() => {
    const results = employees.filter(
      (employee: any) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(results);
  }, [searchTerm, employees]);

  return (
    <div>
      {isModalOpen && (
        <Medal
          closeModal={closeModal}
          handleInputChange={handleInputChange}
          handleSaveEmployee={
            isUpdating ? handleUpdateEmployee : handleAddEmployee
          }
          newEmployee={newEmployee}
          isUpdating={isUpdating}
        />
      )}

      {popup && (
        <Popup
          title={"Delete"}
          text={"Are you sure you want to delete this employee?"}
          buttonText={"Delete"}
          buttonColor={"red"}
          handleOnClick={handleDeleteEmployee}
          closePopup={closePopup}
        />
      )}

      <Container title="Items">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Item..."
            className="p-2 border rounded-md shadow-sm w-1/3 outline-none border-gray-300  bg-white"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
          >
            Create Item
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
                <th className="px-4 py-2 font-semibold ">ITEM NAME</th>
                <th className="px-4 py-2 font-semibold ">PRICE</th>
                <th className="px-4 py-2 font-semibold ">QUANTITY</th>
                <th className="px-4 py-2 font-semibold ">CATEGORY</th>
                <th className="px-4 py-2 font-semibold ">MANUFACTURE DATE</th>
                <th className="px-4 py-2 font-semibold ">EXPIRY DATE</th>
                <th className="px-4 py-2 font-semibold ">SUPPLIER</th>
                <th className="px-4 py-2 font-semibold ">CUSTOMER</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee: any, index) => (
                  <tr className="hover:bg-blue-50" key={employee.id}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{employee.name}</td>
                    <td className="px-4 py-2">{employee.email}</td>
                    <td className="px-4 py-2">{employee.phone}</td>
                    <td className="px-4 py-2">${employee.salary}</td>
                    <td className="px-4 py-2">${employee.salary}</td>
                    <td className="px-4 py-2">${employee.salary}</td>
                    <td className="px-4 py-2">${employee.salary}</td>

                    <td className="px-4 py-2 flex gap-3">
                      <button
                        className="flex items-center text-white p-[4px] bg-blue-500 rounded-md"
                        onClick={() => handleOpenUpdateModal(employee)}
                      >
                        <Edit3 size={20} />
                      </button>
                      <button
                        className="flex items-center text-white p-[4px] bg-red-500 rounded-md"
                        onClick={() => {
                          setPopup(true);
                          setEmployeeToDelete(employee.id);
                        }}
                      >
                        <Trash2 size={20} />
                      </button>
                      <button
                        className="text-gray-500 hover:text-blue-500"
                        onClick={() => {}}
                      >
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-4">
                    No item found
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
  handleSaveEmployee,
  // newEmployee,
  isUpdating,
}: any) {
  return (
    <div className="bg-black/30 absolute w-screen h-screen z-10 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md shadow-black/30">
        <div className="mb-6 bg-blue-100 px-2 rounded">
          <h1 className="text-xl text-blue-500 font-semibold">
            {isUpdating ? "Update Item" : "Create Item"}
          </h1>
          <p className="text-gray-500 text-sm">
            {isUpdating
              ? "Dont make any errors when updating"
              : "Dont make any errors when creating an item"}
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-[1px]">
            <label htmlFor="expiry_date" className="text-gray-500 text-sm">
              Item Name
            </label>
            <input
              type="text"
              name={"item_name"}
              id={"item_name"}
              onChange={handleInputChange}
              className="border-2 border-gray-300 p-2 rounded-md outline-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div className="flex gap-2 justify-between">
            <div className="flex flex-col gap-[1px]">
              <label htmlFor="expiry_date" className="text-gray-500 text-sm">
                Quantity
              </label>
              <input
                type="number"
                name={"quantity"}
                id={"quantity"}
                onChange={handleInputChange}
                className="border-2 border-gray-300 p-2 rounded-md outline-blue-500"
                placeholder="10"
              />
            </div>
            <div>
              <div className="flex flex-col gap-[1px]">
                <label htmlFor="expiry_date" className="text-gray-500 text-sm">
                  Price (Ghs)
                </label>
                <input
                  type="number"
                  name={"price"}
                  id={"price"}
                  onChange={handleInputChange}
                  className="border-2 border-gray-300 p-2 rounded-md outline-blue-500"
                  placeholder="100"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="expiry_date" className="text-gray-500 text-sm">
              Category
            </label>
            <select
              name="category"
              id="category"
              onChange={handleInputChange}
              className="border-2 border-gray-300 p-2 rounded-md outline-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div className="flex gap-2 justify-between">
            <div className="flex flex-col flex-1">
              <label
                htmlFor="manufacture_date"
                className="text-gray-500 text-sm"
              >
                Manufacture Date
              </label>
              <input
                type="date"
                name="manufacture_date"
                id="manufacture_date"
                onChange={handleInputChange}
                className="border-2 border-gray-300 p-2 rounded-md outline-blue-500 w-full"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="expiry_date" className="text-gray-500 text-sm">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiry_date"
                id="expiry_date"
                onChange={handleInputChange}
                className="border-2 border-gray-300 p-2 rounded-md outline-blue-500 w-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[1px]">
            <label htmlFor="expiry_date" className="text-gray-500 text-sm">
              Supplier
            </label>
            <input
              type="text"
              name={"supplier"}
              id={"supplier"}
              onChange={handleInputChange}
              className="border-2 border-gray-300 p-2 rounded-md outline-blue-500"
              placeholder="Super Market Ltd"
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
            onClick={handleSaveEmployee}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            {isUpdating ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
