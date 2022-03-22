import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import CreateReservations from "./CreateReservation";
import useQuery from "../utils/useQuery";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */

function Reservations() {

  const query = useQuery();
  const date = query.get("date");

  return (
    <Switch>
      <Route exact={true} path="/reservations/new">
        <CreateReservations />
      </Route>
      <Route path="/reservations/:reservationId/seat">

      </Route>
      <Route path="/reservations">
        <Dashboard date={date} />
      </Route>
    </Switch>
  );
}

export default Reservations;
