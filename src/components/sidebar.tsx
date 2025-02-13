import {
  BuildingIcon,
  ChartBarStacked,
  Layers,
  LayoutDashboard,
  LogOut,
  Logs,
  UsersRound,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-[300px] bg-white h-screen rounded-r-xl shadow-lg shadow-blue-200 fixed p-4">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-8">
          <div className="border-b-[1px] border-gray-500/30 py-4">
            <h1 className="text-blue-500 text-lg font-semibold">
              Super Market
            </h1>
          </div>
          <div>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="dashboard"
                  className="flex items-center gap-4 hover:bg-blue-500 hover:text-white p-3 rounded-md "
                >
                  <LayoutDashboard /> Dashboard
                </a>
              </li>
              <li>
                <a
                  href="items"
                  className="flex items-center gap-4 hover:bg-blue-500 hover:text-white p-3 rounded-md"
                >
                  <Layers />
                  Items
                </a>
              </li>
              <li>
                <a
                  href="items"
                  className="flex items-center gap-4 hover:bg-blue-500 hover:text-white p-3 rounded-md"
                >
                  <ChartBarStacked />
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="items"
                  className="flex items-center gap-4 hover:bg-blue-500 hover:text-white p-3 rounded-md"
                >
                  <BuildingIcon />
                  Department
                </a>
              </li>
              <li>
                <a
                  href="items"
                  className="flex items-center gap-4 hover:bg-blue-500 hover:text-white p-3 rounded-md"
                >
                  <Logs />
                  Logs
                </a>
              </li>
              <li>
                <a
                  href="items"
                  className="flex items-center gap-4 hover:bg-blue-500 hover:text-white p-3 rounded-md"
                >
                  <UsersRound />
                  Users
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div>
            <a
              href="/"
              className="flex items-center gap-4 bg-blue-500 text-white p-3 rounded-md w-full"
            >
              <LogOut />
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
