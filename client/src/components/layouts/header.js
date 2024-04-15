import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: '#018bfa', color: 'white', boxShadow: '6px 3px 6px 2px rgba(0, 0, 0, 0.3)', zIndex: '100', position: 'absolute', width: '100%'}}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <img src="Logo.png" alt='$' style={{height: "6vh", top: '0px', padding: '0rem 1rem'}}></img>
            <Link className="navbar-brand h5" to="/" style={{color: 'white', textAlign: 'center', paddingBottom: '0'}}>
              Expense Management
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {" "}
                <p className="nav-item navbar-brand m-0 lead" style={{color: 'white', paddingRight: '1rem'}}> 
                  {loginUser && loginUser._doc.name}
                  </p>
                {" "}
              </li>
              <li className="nav-item">
                <button className="btn btn-primary" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;