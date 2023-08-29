import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllCategories } from "../Api";
import { firstUpper } from "../util";

function Navbar() {
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    getAllCategories()
      .then((res) => {
        const dt = res.data;
        if (dt) {
          setCategories(dt);
        }
      })
      .catch((error) => {
        error("Hata: " + error.message);
      });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <div className="navbar-brand">
          <NavLink className="nav-link" to={"/"}>
            Ana Sayfa
          </NavLink>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
     
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">
                Disabled
              </a>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
