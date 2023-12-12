import Link from "next/link";
import logo from "@/img/logo.jpg";
import Image from "next/image";
import { useRootState } from "@/context/RootStateContext";
import LogOutModal, { LogoutButton } from "./logOutModal";

function Navbar() {

  const { globalState } = useRootState();

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand" href="/"><Image src={logo} alt="" height="30"
            className="rounded-circle" /> Weboender Store</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" href="/">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/categories">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/sponsors">Sponsors</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/shippings">Shippings</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/transactions">Transactions</Link>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  {globalState.user?.name}
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" href="/profile">Profile</Link></li>
                  <li><LogoutButton className="dropdown-item"></LogoutButton></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <LogOutModal />
    </header>
  );
}

export default Navbar;