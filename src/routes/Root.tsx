import Sidebar from "../Sidebar";
import SessionsList from "../SessionsList";
export default function Root() {
  return (
    <div>
      <Sidebar />
      <SessionsList />
      <div id="detail"></div>
    </div>
  );
}
