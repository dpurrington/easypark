import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SessionsList from "./SessionsList";
import SessionCreator from "./SessionCreator";

function App() {
  return (
    <div className="App">
      <SessionsList />
      <SessionCreator />
    </div>
  );
}

export default App;
