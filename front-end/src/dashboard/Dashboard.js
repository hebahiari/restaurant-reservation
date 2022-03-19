import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation, useSearchParams } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next, today } from "../utils/date-time";
import useQuery from "../utils/useQuery"
import ListReservations from "../Reservations/ListReservations"
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const location = useLocation();


  const query = useQuery();
  if (query.get("date")) {
  date = query.get("date")
  }

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const history = useHistory();
  const todaysDate = today();
  const nextDay = next(todaysDate);
  const PreviousDay = previous(todaysDate);

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ListReservations reservations={reservations}/>
      {/* {JSON.stringify(reservations)} */}
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
      </div>
    </main>
  );
}

export default Dashboard;
