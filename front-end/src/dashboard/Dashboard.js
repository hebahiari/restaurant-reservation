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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .then(() => setLoading(false))
      .catch(setReservationsError);

    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const history = useHistory();
  const todaysDate = today();
  const nextDay = next(todaysDate);
  const PreviousDay = previous(todaysDate);

  const loadingSpinner = (
    <div className="d-flex justify-content-center p-5 m-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden"></span>
      </div>
    </div>
  );

  const addReservationButton = (
    <button
      className="btn btn-success m-3"
      onClick={() => history.push(`/reservations/new`)}
    >
      Add Reservation
    </button>
  );

  const addTableButton = (
    <button
      className="btn btn-success m-3"
      onClick={() => history.push(`/tables/new`)}
    >
      Add Table
    </button>
  );

  return (
    <>
      <div className="col-lg-7 col-md-7 col-xs-6 col-sm-12 align-self-start m-2 me-4 card-main">
        <div className="text-center">
          <div>
            <div className="row p-0 justify-content-center">
              <div className="col-auto p-1">
                <h2>Reservations</h2>
              </div>
              <div className="col-auto plus-button p-1">
                <Link className="nav-link " to="/reservations/new">
                  <span className="oi oi-plus" />
                  &nbsp;
                </Link>
              </div>
            </div>

            <h6 className="my-2">
              <b>Date: </b>
              {date ? date : todaysDate}
            </h6>
            <div className="mb-3">
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
              {loading ? loadingSpinner : null}
              <ListReservations reservations={reservations} />
              {!reservations.length ? (
                <div className="container p-3 text-center">
                  <p>No reservations found for this date.</p>
                  {addReservationButton}
                </div>
              ) : null}
              <ErrorAlert error={reservationsError} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-4 col-xs-6 col-sm-12 align-self-start m-2 card-main">
        <div className="text-center">
          <div className="row justify-content-center">
            <div className="col-auto p-1">
              <h2>Tables</h2>
            </div>
            <div className="col-auto plus-button p-1">
              <Link className="nav-link" to="/tables/new">
                <span className="oi oi-plus" />
                &nbsp;
              </Link>
            </div>
          </div>
          {loading ? loadingSpinner : null}
          <ListTables tables={tables} />
          {!tables.length ? (
            <div className="container p-3 text-center">
              <p>No Tables found</p>
              {addTableButton}
            </div>
          ) : null}
          <ErrorAlert error={tablesError} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
