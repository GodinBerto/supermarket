/* eslint-disable @typescript-eslint/no-explicit-any */

import Container from "../components/content-container";
import { FaMedal } from "react-icons/fa";

import { Edit3, Trash2 } from "lucide-react";
import Popup from "../components/popup";
import { API_BASE_URL, CategoriesTypes } from "../../types";
import { MoreModal } from "../components/more_modal";
import { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setcategories] = useState<CategoriesTypes[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredcategories, setFilteredcategories] = useState<
    CategoriesTypes[]
  >([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoriesTypes | null>(null);
  const [newCategory, setNewCategory] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

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
        setFilteredcategories(data.data); // <-- This initializes filtered categories
      } else {
        console.error("Error fetching categories:", data.error);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddcategory = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory), // <-- Send new category data
      });

      const data = await response.json();
      if (response.ok) {
        setcategories((prevcategories) => [...prevcategories, data.data]); // <-- Append new category
        setFilteredcategories((prevcategories) => [
          ...prevcategories,
          data.data,
        ]);
        setSuccessMessage("category added successfully! 🏅");
      } else {
        console.error("Error adding category:", data.error);
      }

      closeModal();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleOpenUpdateModal = (category: any) => {
    setNewCategory(category); // Populate the modal fields with category details
    setCurrentCategoryId(category.id); // Set the ID correctly
    setIsUpdating(true);
    setIsModalOpen(true);
  };

  const handleFetchcategory = async (id: number) => {
    if (!id) {
      console.error("category ID is required for updating.");
      return;
    }

    try {
      const getcategoryResponse = await fetch(
        `${API_BASE_URL}/categories/id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const dataFetched = await getcategoryResponse.json();

      if (getcategoryResponse.ok) {
        setNewCategory(dataFetched.data); // Populate inputs
      } else {
        console.error("Error fetching category:", dataFetched.error);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const handleUpdatecategory = async () => {
    if (!currentCategoryId) {
      console.error("category ID is required for updating.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/categories/id=${currentCategoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCategory), // Use updated state
        }
      );

      const data = await response.json();

      if (response.ok) {
        setcategories((prevcategories) =>
          prevcategories.map((category) =>
            category.id === Number(newCategory.id) ? data.data : category
          )
        );
        setFilteredcategories((prevcategories) =>
          prevcategories.map((category) =>
            category.id === Number(newCategory.id) ? data.data : category
          )
        );
        setSuccessMessage("category updated successfully! 🏅");
        closeModal();
      } else {
        console.error("Error updating category:", data.error);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeletecategory = async () => {
    if (!categoryToDelete) {
      console.error("category ID is required for deletion.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/categories/id=${categoryToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setcategories((prevcategories) =>
          prevcategories.filter((category) => category.id !== categoryToDelete)
        );
        setFilteredcategories((prevcategories) =>
          prevcategories.filter((category) => category.id !== categoryToDelete)
        );

        setSuccessMessage("category deleted successfully! 🏅");
      } else {
        const data = await response.json();
        console.error("Error deleting category:", data.error);
      }

      // closePopup();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsUpdating(false);
    setNewCategory({
      id: "",
      name: "",
    });
  };

  const closePopup = () => {
    setPopup(false);
    setCategoryToDelete(null);
  };

  // Filter categories based on the search term
  useEffect(() => {
    const results = categories.filter((category: CategoriesTypes) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredcategories(results);
  }, [searchTerm, categories]);

  const onDoubleClick = (category: CategoriesTypes) => {
    setSelectedCategory({
      name: category.name,
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
          handleSavecategory={
            isUpdating ? handleUpdatecategory : handleAddcategory
          }
          newcategory={newCategory}
          isUpdating={isUpdating}
        />
      )}

      {selectedCategory && (
        <MoreModal
          details={selectedCategory}
          closeModal={() => setSelectedCategory(null)}
        />
      )}

      {popup && (
        <Popup
          title={"Delete"}
          text={"Are you sure you want to delete this category?"}
          buttonText={"Delete"}
          buttonColor={"red"}
          handleOnClick={handleDeletecategory}
          closePopup={closePopup}
        />
      )}

      <Container title="Categories">
        <div className="flex justify-between categories-center mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search category..."
            className="p-2 border rounded-md shadow-sm w-1/3 outline-none border-gray-300  bg-white"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
          >
            Create category
          </button>
        </div>

        {successMessage && (
          <div className="flex categories-center justify-center bg-green-100 text-green-600 p-4 rounded-md mb-4">
            <FaMedal className="mr-2" />
            <p>{successMessage}</p>
          </div>
        )}

        <div className="bg-white p-4 rounded-lg shadow-md shadow-blue-300">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="px-4 py-2 font-semibold ">ID</th>
                <th className="px-4 py-2 font-semibold ">CATEGORY NAME</th>

                <th className="px-4 py-2 font-semibold ">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredcategories.length > 0 ? (
                filteredcategories.map((category: CategoriesTypes, index) => (
                  <tr
                    className="hover:bg-blue-50"
                    key={category.id}
                    onDoubleClick={onDoubleClick.bind(null, category)}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{category.name}</td>

                    <td className="px-4 py-2 flex gap-3">
                      <button
                        className="flex categories-center text-white p-[4px] bg-blue-500 rounded-md"
                        onClick={() => {
                          handleOpenUpdateModal(category);
                          handleFetchcategory(category.id as number);
                        }}
                      >
                        <Edit3 size={20} />
                      </button>
                      <button
                        className="flex categories-center text-white p-[4px] bg-red-500 rounded-md"
                        onClick={() => {
                          setPopup(true);
                          setCategoryToDelete(category.id || 0);
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
                    No category found
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
  handleSavecategory,
  newcategory,
  isUpdating,
}: any) {
  return (
    <div className="bg-black/30 absolute w-screen h-screen z-10 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md shadow-black/30">
        <div className="mb-6 bg-blue-100 px-2 rounded">
          <h1 className="text-xl text-blue-500 font-semibold">
            {isUpdating ? "Update category" : "Create category"}
          </h1>
          <p className="text-gray-500 text-sm">
            {isUpdating
              ? "Dont make any errors when updating"
              : "Dont make any errors when creating an category"}
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-[1px]">
            <label htmlFor="expiry_date" className="text-gray-500 text-sm">
              Category Name
            </label>
            <input
              type="text"
              name={"name"}
              id={"name"}
              onChange={handleInputChange}
              className="border-2 border-gray-300 p-2 rounded-md outline-blue-500"
              placeholder="John Doe"
              value={newcategory.name}
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
            onClick={handleSavecategory}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            {isUpdating ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
