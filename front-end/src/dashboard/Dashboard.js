import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next, today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ListReservations from "../Reservations/ListReservations";
import ListTables from "../Tables/ListTables";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);

  // getting the selected date from the url
  const query = useQuery();
  if (query.get("date")) {
    date = query.get("date");
  }

  useEffect(loadDashboard, [date]);

  // sending api calls to list the reservations and tables
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

      ///is this ok?
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }

  const history = useHistory();
  const todaysDate = today();
  const nextDay = next(todaysDate);
  const PreviousDay = previous(todaysDate);

  return (
    <main>
      <h1>Dashboard</h1>
      <ErrorAlert error={reservationsError} />
      <h2>Reservations</h2>
      <div className="d-md-flex mb-3">
        <h6 className="mb-0">Date: {date ? date : todaysDate}</h6>
      </div>
      <ListReservations reservations={reservations} />
      <div>
        <button
          className="btn btn-secondary m-1"
          onClick={() => history.push(`/reservations?date=${PreviousDay}`)}
        >
          Previous Day
        </button>
        <button
          className="btn btn-secondary m-1"
          onClick={() => history.push(`/reservations?date=${todaysDate}`)}
        >
          Today
        </button>
        <button
          className="btn btn-secondary m-1"
          onClick={() => history.push(`/reservations?date=${nextDay}`)}
        >
          Next Day
        </button>
        <p></p>
        <h2>Tables</h2>
        <ListTables tables={tables} />
        <ErrorAlert error={tablesError} />
      </div>
    </main>
  );
}

export default Dashboard;
