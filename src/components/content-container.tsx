import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function Container({ children, title }: any) {
  return (
    <>
      <Sidebar />
      <div className="ml-[300px] px-4 flex flex-col gap-6">
        <Navbar title={title} />
        <div>{children}</div>
      </div>
    </>
  );
}
