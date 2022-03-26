import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import { useHistory } from "react-router";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  const history = useHistory();
  return (
    <div>
      <div className="row-md-2" style={{ backgroundColor: "#1f424b" }}>
        <Menu />
      </div>
      <div className="container">
        <div className="row-12">
          <div className="center-text" onClick={() => history.push("/")}>
          <h1 className="text-center header-logo">Periodic Tables</h1>
          {/* <h6 text-center>the ultimate restaurant reservation system</h6> */}
          </div>
          <div className="row gx-5 justify-content-center align-items-start p-4">
            <Routes />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
