import { useUser } from "../hooks/useUser";
import { Logout } from "../features/authentication/components/Logout";
import { Link } from "@tanstack/react-router";

function NavBar() {
  const { isAuthenticated, isLoading } = useUser();

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

      <div className="flex gap-2 items-center">
        {isLoading ? (
          <span className="text-gray-500">Loading...</span>
        ) : isAuthenticated ? (
          <>
            <Link to="/dashboard" className="[&.active]:font-bold">
              Dashboard
            </Link>
            <Logout />
          </>
        ) : (
          <>
            <Link to="/signup" className="[&.active]:font-bold">
              Sign up
            </Link>
            <Link to="/signin" className="[&.active]:font-bold">
              Sign in
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
