export default function Cards({ heading, number }: any) {
  return (
    <div className="bg-white w-72 p-4 rounded-md flex flex-col shadow-lg shadow-blue-200">
      <div>
        <h1 className="text-md font-semibold text-blue-500">{heading}</h1>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-gray-600">{number}</h2>
      </div>
    </div>
  );
}
