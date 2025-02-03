import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  return (
    <main>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="bg-white p-4 rounded-md shadow-lg shadow-blue-200 w-[400px]">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-8">
              Register
            </h2>
          </div>
          <form action="Dashboard">
            <div className="mb-4">
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Gender</label>
              <select
                name="gender"
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="grid grid-cols-3 w-full gap-3 mt-10">
              <button
                className="w-full text-blue-500 font-semibold py-2 px-4 rounded-md col-span-1 flex justify-center border-2 border-blue-500 hover:bg-blue-500 duration-150 hover:text-white"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md col-span-2"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
