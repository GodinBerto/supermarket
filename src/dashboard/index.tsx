import { useEffect, useState } from "react";
import Container from "../components/content-container";
import Cards from "../components/cards";
import BarChart from "../components/barchart";

export default function Dashboard() {
  const [employees, _setEmployees] = useState([]);
  const [itemData, _setItemData] = useState<{
    labels: string[];
    values: number[];
  }>({
    labels: [],
    values: [],
  });

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
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/items/chart-data"
      );
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

        // Mapping received data to match labels
        const values = labels.map((month) => {
          const found = result.data.labels.find((date: string) =>
            date.includes(month)
          );
          return found
            ? result.data.values[result.data.labels.indexOf(found)]
            : 0;
        });

        console.log(itemData);
        console.log(result);

        _setItemData({ labels, values });
      } else {
        console.error("Failed to fetch data:", result.error);
      }
    } catch (error) {
      console.error("Failed to fetch item data:", error);
    }
  };

  const [totalEmployees, _setTotalEmployees] = useState(0);
  const [activeEmployees, _setActiveEmployees] = useState(0);
  const [totalSalary, _setTotalSalary] = useState(0);
  const [onLeave, _setOnLeave] = useState(0);

  useEffect(() => {
    // Fetch total number of employees
    const fetchTotalEmployees = async () => {
      try {
        // const response = await getTotalEmployees();
        // setTotalEmployees(response.totalEmployees); // Ensure correct key from API response
      } catch (error) {
        console.error("Error fetching total employees:", error);
      }
    };

    // Fetch total active employees
    const fetchActiveEmployees = async () => {
      try {
        // const response = await getActiveEmployees();
        // setActiveEmployees(response.length); // Assuming response is an array of active employees
      } catch (error) {
        console.error("Error fetching active employees:", error);
      }
    };

    // Fetch total on-leave employees
    const fetchOnLeaveEmployees = async () => {
      try {
        // const response = await getOnLeaveEmployees();
        // setOnLeave(response.length); // Assuming response is an array of on-leave employees
      } catch (error) {
        console.error("Error fetching on-leave employees:", error);
      }
    };

    // Fetch total salary
    const fetchTotalSalary = async () => {
      try {
        // const response = await getTotalSalary();
        // setTotalSalary(response.totalSalary); // Ensure correct key from API response
      } catch (error) {
        console.error("Error fetching total salary:", error);
      }
    };

    // Call all API methods
    fetchTotalEmployees();
    fetchActiveEmployees();
    fetchOnLeaveEmployees(); // Invoke this function properly
    fetchTotalSalary();
  }, []);

  return (
    <main>
      <Container title={"Dashboard"}>
        <div className="flex w-full justify-between">
          <Cards heading={"Total Items"} number={totalEmployees.toString()} />
          <Cards heading={"Sold Items"} number={activeEmployees.toString()} />
          <Cards heading={"Income"} number={onLeave.toString()} />
          <Cards heading={"Profit"} number={`$${totalSalary.toString()}`} />
        </div>

        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4 w-full flex-wrap mt-10">
          <div className="bg-white rounded-md w-full shadow-md shadow-blue-300 flex justify-center p-4">
            <BarChart
              className={"min-w-[300px] min-h-[300px]"}
              itemData={itemData}
            />
          </div>
          <div className="">
            <div className="bg-white p-4 rounded-lg shadow-md shadow-blue-300">
              <table className="w-full table-auto h-[400px]">
                <thead>
                  <tr className="bg-blue-100 text-left">
                    <th className="px-4 py-2 font-semibold ">ID</th>
                    <th className="px-4 py-2 font-semibold ">ITEM NAME</th>
                    <th className="px-4 py-2 font-semibold ">PRICE</th>
                    <th className="px-4 py-2 font-semibold ">QUANTITY</th>
                    <th className="px-4 py-2 font-semibold ">CATEGORY</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee: any, index) => (
                    <tr className="hover:bg-blue-50" key={employee.id}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{employee.name}</td>
                      <td className="px-4 py-2">${employee.salary}</td>
                      <td className="px-4 py-2">{employee.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
