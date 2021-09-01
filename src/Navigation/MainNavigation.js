import React from "react";
import { Link } from "react-router-dom";

import NavbarDetail from "./GenreList";
import SearchBar from "./SearchBar";
import NavbarCart from "./Cart";
import GoogleAuth from "../Auth/GoogleAuth";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar__nav">
          <Link to="/" className="logo">
            BOKO
          </Link>
          <SearchBar />
          <GoogleAuth />
        </div>
        <NavbarDetail />
      </div>
      <NavbarCart />
    </nav>
  );
}
