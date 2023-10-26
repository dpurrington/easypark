export default function Sidebar() {
  return (
    <div id="sidebar">
      <h1>EasyPark</h1>
      <nav>
        <ul>
          <li>
            <a href={`/sessions`}>All sessions</a>
          </li>
          <li>
            <a href={`/newSession`}>New session</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
