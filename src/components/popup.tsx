export default function Popup({
  title,
  text,
  closePopup,
  handleOnClick,
  buttonText,
  buttonColor,
}: any) {
  return (
    <div className="bg-black/30 absolute w-screen h-screen z-10 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-[440px] shadow-md shadow-black/30">
        <div className="mb-10">
          <h1 className="text-xl text-gray-600 font-semibold">{title}</h1>
        </div>

        <div>{text}</div>

        <div className="grid grid-cols-5 gap-4 mt-10">
          <button
            className="col-span-2 bg-gray-300 text-gray-600 px-4 py-2 rounded-md"
            onClick={closePopup}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`col-span-3 bg-${buttonColor}-500 text-white p-2 rounded`}
            onClick={handleOnClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
