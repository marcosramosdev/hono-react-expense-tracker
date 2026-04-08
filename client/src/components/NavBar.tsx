import { Link } from "@tanstack/react-router";

function NavBar() {
  return (
    <nav className="p-2 flex gap-2 justify-between">
      <div className="flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>

      <div className="flex gap-2">
        <Link to="/signup" className="[&.active]:font-bold">
          Sign up
        </Link>{" "}
        <Link to="/signin" className="[&.active]:font-bold">
          sign in
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
