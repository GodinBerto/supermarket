import { useState, useEffect } from "react";
import Container from "../components/content-container";
import { FaMedal } from "react-icons/fa";

import { Edit3, MoreVertical, Trash2 } from "lucide-react";
import Popup from "../components/popup";

export default function Item() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [successMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [itemToDelete, setitemToDelete] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [, setCurrentitemId] = useState("");
  const [newitem, setNewitem] = useState({
    name: "",
    email: "",
    phone: "",
    salary: "",
    status: "",
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/items/", {
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
      const response = await fetch("http://127.0.0.1:8000/api/v1/items/", {
        method: "POST",
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
      closeModal();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleOpenUpdateModal = (item: any) => {
    setNewitem(item);
    setCurrentitemId(item.id);
    setIsUpdating(true);
    setIsModalOpen(true);
  };

  const handleUpdateitem = async () => {
    try {
      //   await updateitem(currentitemId, newitem);
      //   setSuccessMessage("item updated successfully! 🏅");
      //   fetchitems();
      closeModal();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDeleteitem = async () => {
    try {
      if (itemToDelete) {
        // await deleteitem(itemToDelete);
        // setSuccessMessage("item deleted successfully! 🏅");
        // fetchitems();
        closePopup();
      }
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
    setNewitem({ name: "", email: "", phone: "", salary: "", status: "" });
  };

  const closePopup = () => {
    setPopup(false);
    setitemToDelete(null);
  };

  // Filter items based on the search term
  useEffect(() => {
    const results = items.filter(
      (item: any) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase()) // <-- Ensures no error
    );
    setFilteredItems(results);
  }, [searchTerm, items]);

  return (
    <div>
      {isModalOpen && (
        <Medal
          closeModal={closeModal}
          handleInputChange={handleInputChange}
          handleSaveitem={isUpdating ? handleUpdateitem : handleAdditem}
          newitem={newitem}
          isUpdating={isUpdating}
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
                <th className="px-4 py-2 font-semibold ">PRICE</th>
                <th className="px-4 py-2 font-semibold ">QUANTITY</th>
                <th className="px-4 py-2 font-semibold ">CATEGORY</th>
                <th className="px-4 py-2 font-semibold ">MANUFACTURE DATE</th>
                <th className="px-4 py-2 font-semibold ">EXPIRY DATE</th>
                {/* <th className="px-4 py-2 font-semibold ">SUPPLIER</th>
                <th className="px-4 py-2 font-semibold ">CUSTOMER</th> */}
                <th className="px-4 py-2 font-semibold ">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item: any, index) => (
                  <tr className="hover:bg-blue-50" key={item.id}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.price}</td>
                    <td className="px-4 py-2">{item.stock_quantity}</td>
                    <td className="px-4 py-2">{item.category}</td>
                    <td className="px-4 py-2">{item.manufacture_date}</td>
                    <td className="px-4 py-2">{item.expiry_date}</td>
                    {/* <td className="px-4 py-2">{item.supplier}</td>
                    <td className="px-4 py-2">{item.customer}</td> */}

                    <td className="px-4 py-2 flex gap-3">
                      <button
                        className="flex items-center text-white p-[4px] bg-blue-500 rounded-md"
                        onClick={() => handleOpenUpdateModal(item)}
                      >
                        <Edit3 size={20} />
                      </button>
                      <button
                        className="flex items-center text-white p-[4px] bg-red-500 rounded-md"
                        onClick={() => {
                          setPopup(true);
                          setitemToDelete(item.id);
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
  handleSaveitem,
  // newitem,
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
