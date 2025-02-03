export default function Table() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md shadow-blue-300 min-w-[500px]">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-blue-100 text-left">
            <th className="px-4 py-2 font-semibold border-l-2 border-blue-100">
              Name
            </th>
            <th className="px-4 py-2 font-semibold border-x-2 border-blue-100">
              Name
            </th>
            <th className="px-4 py-2 font-semibold border-x-2 border-blue-100">
              Name
            </th>
            <th className="px-4 py-2 font-semibold border-x-2 border-blue-100">
              Name
            </th>
            <th className="px-4 py-2 font-semibold border-x-2 border-blue-100">
              Name
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-blue-50 border-b-2 border-blue-100">
            <td className="px-4 py-2 border-x-2 border-blue-100">Godfred</td>
            <td className="px-4 py-2 border-x-2 border-blue-100">Godfred</td>
            <td className="px-4 py-2 border-x-2 border-blue-100">Godfred</td>
            <td className="px-4 py-2 border-x-2 border-blue-100">Godfred</td>
            <td className="px-4 py-2 border-x-2 border-blue-100">Godfred</td>
          </tr>
          <tr className="hover:bg-blue-50 border-b-2 border-blue-100">
            <td className="px-4 py-2 border-x-2 border-blue-100">Godfred</td>
            <td className="px-4 py-2 border-x-2 border-blue-100">Godfred</td>
            <td className="px-4 py-2 border-x-2 border-blue-100">Godfred</td>
            <td className="px-4 py-2 border-x-2 border-blue-100">Godfred</td>
            <td className="px-4 py-2 border-x-2 border-blue-100">Godfred</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
