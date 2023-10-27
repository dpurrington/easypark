import Navigation from "../Navigation";
import SessionsList from "../SessionsList";
export default function Root() {
  return (
    <>
      <div id="detail">
        <SessionsList />
      </div>
      <Navigation />
    </>
  );
}
