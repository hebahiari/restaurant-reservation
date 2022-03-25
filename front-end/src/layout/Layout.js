import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div>
      <div className="row-md-2" style={{ backgroundColor: "#1f424b" }}>
        <Menu />
      </div>
      <div className="container">
        <div className="row-12">
          <h1
            className="m3 text-center header-logo"
            style={{ fontFamily: "'Seven Day Signature', sans-serif" }}
          >
            Periodic Tables
          </h1>
          <div className="row gx-5 justify-content-center align-items-start">
            <Routes />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
