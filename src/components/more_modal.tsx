import { ItemsTypes } from "../../types";

interface MoreModalProps {
  details: ItemsTypes | null;
  closeModal: () => void;
}

export const MoreModal = ({ details, closeModal }: MoreModalProps) => {
  if (!details) return null; // Don't render if no details exist

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/30 bg-opacity-50 z-40"
      onClick={closeModal} // Close on backdrop click
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-[400px]"
        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
      >
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          More Details
        </h2>

        <div className="space-y-2">
          {Object.entries(details).map(([key, value]) => (
            <div key={key} className="flex gap-2">
              <label className="font-semibold capitalize">{key}:</label>
              <p>{value?.toString()}</p>
            </div>
          ))}
        </div>

        <button
          onClick={closeModal}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};
