/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Container from "../components/content-container";
import { FaMedal } from "react-icons/fa";

import { Edit3, Trash2 } from "lucide-react";
import Popup from "../components/popup";
import {
  API_BASE_URL,
  CategoriesTypes,
  DepartmentsTypes,
  ItemsTypes,
} from "../../types";
import { MoreModal } from "../components/more_modal";

export default function Item() {
  const [items, setItems] = useState<ItemsTypes[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<ItemsTypes[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [itemToDelete, setitemToDelete] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentItemId, setCurrentitemId] = useState(null);
  const [selectedItem, setSelectedItem] = useState<ItemsTypes | null>(null);
  const [newitem, setNewitem] = useState({
    id: "",
    name: "",
    stock_quantity: "",
    category: "",
    department: "",
    supplier_name: "",
    description: "",
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/items/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setItems(data.data); // <-- Ensure items state is updated
        setFilteredItems(data.data); // <-- This initializes filtered items
      } else {
        console.error("Error fetching items:", data.error);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleAdditem = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/items/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newitem), // <-- Send new item data
      });

      const data = await response.json();
      if (response.ok) {
        setItems((prevItems) => [...prevItems, data.data]); // <-- Append new item
        setFilteredItems((prevItems) => [...prevItems, data.data]);
        setSuccessMessage("item added successfully! 🏅");
      } else {
        console.error("Error adding item:", data.error);
      }

      closeModal();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleOpenUpdateModal = (item: any) => {
    setNewitem(item); // Populate the modal fields with item details
    setCurrentitemId(item.id); // Set the ID correctly
    setIsUpdating(true);
    setIsModalOpen(true);
  };

  /*************  ✨ Codeium Command ⭐  *************/
  /**
 * Fetches an item by its ID from the server and updates the state with the fetched data.
 * 
 * @param {number} id - The unique identifier of the item to be fetched.
 * 
/******  3aab10f0-117e-4b35-abba-10bba25e7ff3  *******/
  const handleFetchItem = async (id: number) => {
    if (!id) {
      console.error("Item ID is required for updating.");
      return;
    }

    try {
      const getItemResponse = await fetch(`${API_BASE_URL}/items/id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataFetched = await getItemResponse.json();

      if (getItemResponse.ok) {
        setNewitem(dataFetched.data); // Populate inputs
      } else {
        console.error("Error fetching item:", dataFetched.error);
      }
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  const handleUpdateItem = async () => {
    if (!currentItemId) {
      console.error("Item ID is required for updating.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/items/id=${currentItemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newitem), // Use updated state
        }
      );

      const data = await response.json();

      if (response.ok) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === Number(newitem.id) ? data.data : item
          )
        );
        setFilteredItems((prevItems) =>
          prevItems.map((item) =>
            item.id === Number(newitem.id) ? data.data : item
          )
        );
        setSuccessMessage("Item updated successfully! 🏅");
        closeModal();
      } else {
        console.error("Error updating item:", data.error);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDeleteitem = async () => {
    if (!itemToDelete) {
      console.error("Item ID is required for deletion.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/items/id=${itemToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemToDelete)
        );
        setFilteredItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemToDelete)
        );

        setPopup(false);
        setSuccessMessage("Item deleted successfully! 🏅");
      } else {
        const data = await response.json();
        console.error("Error deleting item:", data.error);
      }

      // closePopup();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewitem((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsUpdating(false);
    setNewitem({
      id: "",
      name: "",
      stock_quantity: "",
      category: "",
      supplier_name: "",
      description: "",
      department: "",
    });
  };

  const closePopup = () => {
    setPopup(false);
    setitemToDelete(0);
  };

  // Filter items based on the search term
  useEffect(() => {
    const results = items.filter(
      (item: ItemsTypes) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase()) // <-- Ensures no error
    );
    setFilteredItems(results);
  }, [searchTerm, items]);

  const onDoubleClick = (item: ItemsTypes) => {
    setSelectedItem({
      name: item.name,
      stock_quantity: item.stock_quantity,
      category: item.category,
      supplier_name: item.supplier_name,
      department: item.department,
      description: item.description,
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
          handleSaveitem={isUpdating ? handleUpdateItem : handleAdditem}
          newitem={newitem}
          isUpdating={isUpdating}
        />
      )}

      {selectedItem && (
        <MoreModal
          details={selectedItem}
          closeModal={() => setSelectedItem(null)}
        />
      )}

      {popup && (
        <Popup
          title={"Delete"}
          text={"Are you sure you want to delete this item?"}
          buttonText={"Delete"}
          buttonColor={"red"}
          handleOnClick={handleDeleteitem}
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

                <th className="px-4 py-2 font-semibold ">QUANTITY</th>
                <th className="px-4 py-2 font-semibold ">CATEGORY</th>

                <th className="px-4 py-2 font-semibold ">SUPPLIER</th>

                <th className="px-4 py-2 font-semibold ">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item: ItemsTypes, index) => (
                  <tr
                    className="hover:bg-blue-50"
                    key={item.id}
                    onDoubleClick={onDoubleClick.bind(null, item)}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{item.name}</td>

                    <td className="px-4 py-2">{item.stock_quantity}</td>
                    <td className="px-4 py-2">{item.category}</td>

                    <td className="px-4 py-2">{item.supplier_name}</td>

                    <td className="px-4 py-2 flex gap-3">
                      <button
                        className="flex items-center text-white p-[4px] bg-blue-500 rounded-md"
                        onClick={() => {
                          handleOpenUpdateModal(item);
                          handleFetchItem(item.id || 0);
                        }}
                      >
                        <Edit3 size={20} />
                      </button>
                      <button
                        className="flex items-center text-white p-[4px] bg-red-500 rounded-md"
                        onClick={() => {
                          setPopup(true);
                          setitemToDelete(item.id || 0);
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
  handleSaveitem,
  newitem,
  isUpdating,
}: any) {
  const [departments, setDepartments] = useState([]);
  const [categories, setcategories] = useState([]);

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

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setcategories(data.data); // <-- Ensure categories state is updated
      } else {
        console.error("Error fetching categories:", data.error);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchCategories();
  }, []);
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
              name={"name"}
              id={"name"}
              onChange={handleInputChange}
              className="border-2 border-gray-300 p-2 rounded-md outline-blue-500"
              placeholder="John Doe"
              value={newitem.name}
            />
          </div>

          <div className="flex flex-col gap-[1px]">
            <label htmlFor="expiry_date" className="text-gray-500 text-sm">
              Quantity
            </label>
            <input
              type="number"
              name={"stock_quantity"}
              id={"stock_quantity"}
              onChange={handleInputChange}
              className="border-2 border-gray-300 p-2 rounded-md outline-blue-500"
              placeholder="10"
              value={newitem.stock_quantity}
            />
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
              <option value="">
                {newitem.category ? newitem.category : "Select Category"}
              </option>
              {categories.map((categories: CategoriesTypes) => (
                <option key={categories.id} value={categories.name}>
                  {categories.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm">Department</label>
            <select
              name="department"
              id="department"
              onChange={handleInputChange}
              className="border-2 border-gray-300 p-2 rounded-md outline-blue-500"
              value={newitem.department}
            >
              <option value="">
                {newitem.department || "Select Department"}
              </option>
              {departments.map((dept: DepartmentsTypes) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="flex gap-2 justify-between">
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
          </div> */}

          <div className="flex flex-col gap-[1px]">
            <label htmlFor="expiry_date" className="text-gray-500 text-sm">
              Supplier
            </label>
            <input
              type="text"
              name={"supplier_name"}
              id={"supplier_name"}
              onChange={handleInputChange}
              className="border-2 border-gray-300 p-2 rounded-md outline-blue-500"
              placeholder="Super Market Ltd"
              value={newitem.supplier_name}
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
              value={newitem.description}
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
            onClick={handleSaveitem}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            {isUpdating ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
