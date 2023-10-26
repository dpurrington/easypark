import Sidebar from "../Sidebar";
import SessionsList from "../SessionsList";
export default function Root() {
  return (
    <>
      <Sidebar />
      <div id="detail">
        <SessionsList />
      </div>
    </>
  );
}
