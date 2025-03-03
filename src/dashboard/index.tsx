import { useEffect, useState } from "react";
import Container from "../components/content-container";
import Cards from "../components/cards";
import BarChart from "../components/barchart";
import { API_BASE_URL, ItemsTypes, StaffTypes } from "../../types";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [itemData, _setItemData] = useState<{
    labels: string[];
    values: number[];
  }>({
    labels: [],
    values: [],
  });
  const [items, setItems] = useState<ItemsTypes[]>([]);
  const [staffs, setStaff] = useState<StaffTypes[]>([]);
  const [cardsData, setCardsData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetchEmployees();
    fetchItemData();
  }, []);

  const fetchEmployees = async () => {
    try {
      //   const data = await getAllEmployees();
      //   setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchItemData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}dashboard/monthlyitems`);
      const result = await response.json();

      if (response.ok) {
        const labels = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        // Ensure the received data aligns with labels
        const values = result.MonthlyItems;

        _setItemData({ labels, values });
      } else {
        console.error("Failed to fetch data:", result.error);
      }
    } catch (error) {
      console.error("Failed to fetch item data:", error);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchCards();
    fetchStaff();
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
      } else {
        console.error("Error fetching items:", data.error);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

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
      } else {
        console.error("Error fetching staffs:", data.error);
      }
    } catch (error) {
      console.error("Error fetching staffs:", error);
    }
  };

  const fetchCards = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}dashboard/cards`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCardsData(data); // <-- Ensure items state is updated
      } else {
        console.error("Error fetching items");
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <main>
      <Container title={"Dashboard"}>
        <div className="flex w-full justify-between">
          <Cards
            heading={"Total Items"}
            number={cardsData?.["Total Items"]?.toString() || "0"}
          />
          <Cards
            heading={"Issued Items"}
            number={cardsData?.["Issued Items"]?.toString() || "0"}
          />
          <Cards
            heading={"Registered Staff"}
            number={cardsData?.["Registered Staff"]?.toString() || "0"}
          />
          <Cards
            heading={"Department"}
            number={cardsData?.["Department"]?.toString() || "0"}
          />
        </div>

        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4 w-full flex-wrap mt-10">
          <div className="bg-white rounded-md w-full shadow-md shadow-blue-300 flex justify-center p-4">
            <BarChart
              className={"min-w-[300px] min-h-[300px]"}
              itemData={itemData}
            />
          </div>
          <div className="">
            <div className="bg-white p-4 rounded-lg shadow-md shadow-blue-300 h-[400px] overflow-y-scroll scrollbar-hide">
              <div className="mb-3 bg-blue-100 rounded-md p-2">
                <h1 className="text-gray-500 font-semibold text-xl">
                  REGISTERED STAFF
                </h1>
              </div>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-blue-100 text-left">
                    <th className="px-4 py-2 font-semibold ">ID</th>
                    <th className="px-4 py-2 font-semibold ">NAME</th>
                    <th className="px-4 py-2 font-semibold ">PHONE NUMBER</th>
                    <th className="px-4 py-2 font-semibold ">DEPARTMENT</th>
                    <th className="px-4 py-2 font-semibold ">ROLE</th>
                  </tr>
                </thead>
                <tbody>
                  {staffs.map((staff: any, index) => (
                    <tr
                      className="hover:bg-blue-50"
                      key={staff.id}
                      onDoubleClick={() => navigate("/staff")}
                    >
                      <td className="px-4 py-2 h-3">{index + 1}</td>
                      <td className="px-4 py-2 h-3">{staff.name}</td>
                      <td className="px-4 py-2 h-3">{staff.phone}</td>
                      <td className="px-4 py-2 h-3">{staff.department}</td>
                      <td className="px-4 py-2 h-3">{staff.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md shadow-blue-300 h-[330px] overflow-y-scroll scrollbar-hide mt-10">
          <div className="mb-3 bg-blue-100 rounded-md p-2">
            <h1 className="text-gray-500 font-semibold text-xl">ITEMS</h1>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="px-4 py-2 font-semibold ">ID</th>
                <th className="px-4 py-2 font-semibold ">ITEM NAME</th>
                <th className="px-4 py-2 font-semibold ">QUANTITY</th>
                <th className="px-4 py-2 font-semibold ">CATEGORY</th>
                <th className="px-4 py-2 font-semibold ">SUPPLIER</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any, index) => (
                <tr
                  className="hover:bg-blue-50"
                  key={item.id}
                  onDoubleClick={() => navigate("/items")}
                >
                  <td className="px-4 py-2 h-3">{index + 1}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.stock_quantity}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.supplier_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </main>
  );
}
