import { Logout } from "../features/authentication/components/Logout";
import { Link } from "@tanstack/react-router";

type Props = {
  authenticated: boolean;
};

function NavBar({ authenticated }: Props) {
  return (
    <nav className="p-2 flex gap-2 justify-between">
      {authenticated ? (
        <div>
          <h1 className="font-bold">Expense Tracker LOGO</h1>{" "}
        </div>
      ) : (
        <div className="flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
        </div>
      )}

      <div className="flex gap-2 items-center">
        {authenticated ? (
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
