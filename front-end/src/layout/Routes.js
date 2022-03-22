import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Reservations from "../Reservations/Reservations";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import Tables from "../Tables/Tables";
import SeatReservation from "../Reservations/SeatReservation";
import Search from "../Search/Search";
import EditReservation from "../Reservations/EditReservation";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations/:reservationId/seat">
        <SeatReservation />
      </Route>
      <Route path="/reservations/:reservationId/edit">
        <EditReservation />
      </Route>
      <Route path="/reservations">
        <Reservations />
      </Route>
      <Route path="/tables">
        <Tables />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
