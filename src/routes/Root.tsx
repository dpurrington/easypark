import { Navigation, SessionsList } from "../components";
export default function Root() {
  return (
    <div>
      <SessionsList />
      <Navigation value="createSession" />
    </div>
  );
}
