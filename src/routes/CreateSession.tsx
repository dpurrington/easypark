import Sidebar from "../Sidebar";
import SessionCreator from "../SessionCreator";
export default function Root() {
  return (
    <>
      <Sidebar />
      <div id="detail">
        <SessionCreator />
      </div>
    </>
  );
}
