export default function Navbar({ title }: any) {
  return (
    <div className="bg-white w-full p-4 rounded-b-lg shadow-lg shadow-blue-200">
      <div>
        <h1 className="text-xl text-gray-600 font-semibold">{title}</h1>
      </div>
    </div>
  );
}
