import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next, today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ListReservations from "../Reservations/ListReservations";
import ListTables from "../Tables/ListTables";
import { Link } from "react-router-dom";
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
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const history = useHistory();
  const todaysDate = today();
  const nextDay = next(todaysDate);
  const PreviousDay = previous(todaysDate);

  return (
    <>
      <div className="col-lg-6 col-xs-12 align-self-start">
        <div
          className="text-center card"
          style={{ backgroundColor: "#1f424b", borderRadius: "1.25rem" }}
        >
          <div>
            <h2>Reservations</h2>

            <Link className="nav-link align-self-end" to="/reservations/new">
              <span className="oi oi-plus" />
              &nbsp;
            </Link>

            <h6>Date: {date ? date : todaysDate}</h6>
            <div>
              <button
                className="btn btn-secondary m-1"
                onClick={() =>
                  history.push(`/reservations?date=${PreviousDay}`)
                }
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
            <div className="text-left">
              <ListReservations reservations={reservations} />
              <ErrorAlert error={reservationsError} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-xs-12 align-self-start">
        <div
          className="text-center card"
          style={{ backgroundColor: "#1f424b", borderRadius: "1.25rem" }}
        >
          <div className="row">
            <div className="col align-self-center">
              <h2>Tables</h2>
            </div>
            <div className="col  align-self-end">
              <Link className="nav-link" to="/tables/new">
                <span className="oi oi-plus" />
                &nbsp;
              </Link>
            </div>
          </div>
          <ListTables tables={tables} />
          <ErrorAlert error={tablesError} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
