import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllCategories } from "../Api";
import { firstUpper, getCustomer } from "../util";
import { UserModel } from "../models/UserModel";

function Header() {
  const [customer, setCustomer] = useState<UserModel>()
  useEffect(() => {
    const customer=getCustomer()
    if(customer!==null){
      setCustomer(customer)
    }
  }, [])
  const logout=()=>{
    localStorage.removeItem('customer')
  }
  
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
          <div className="dropdown">
              <button
                className="btn btn-dark dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Kategoriler
              </button>
              <ul className="dropdown-menu bg-dark">
                {categories.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      reloadDocument={true}
                      className="dropdown-item text-light custom-button"
                      to={`/Category/${item}`}
                    >
                      {firstUpper(item)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
      {!customer && 
      <>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">
                
              </a>
            </li>
            </>
            }
      {customer && 
      <>
            <li className="nav-item">
              <a onClick={logout} className="nav-link" href="/login" >
               Logout
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">
                {customer?.firstName + " " +customer?.lastName}
              </a>
            </li>
            </>
            }
            
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
