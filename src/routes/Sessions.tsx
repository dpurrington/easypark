import { Navigation, SessionsList } from "../components";

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
