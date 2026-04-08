import { Link } from "@tanstack/react-router";

function NavBar() {
  return (
    <nav className="p-2 flex gap-2 justify-between ">
      <div>
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>

      <div>login / logout</div>
    </nav>
  );
}

export default NavBar;
