import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { listTables } from "../utils/api";
import { useParams } from "react-router-dom";
import { seatReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
//hi
function SeatReservation() {
  const { reservationId } = useParams();
  const [tables, setTables] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState("");
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();

  useEffect(loadTables, []);

  // sending an api call to retrieve the tables information
  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
    .then(setTables)
    .catch(setTablesError);
    return () => abortController.abort();
  }

  // controlling the component
  const handleTableChange = (event) => {
    setSelectedTableId(event.target.value);
  };

// sending an api call to add the reservation id to the selected table
  const handleConfirmButton = (event) => {
    event.preventDefault();
    seatReservation(selectedTableId, reservationId)
      // .then(() => changeStatus(reservationId, "seated"))
      .then(() => history.push("/"))
      .catch(setTablesError);
  };

  return (
    <fieldset className="card">
      <legend>Select Table</legend>
      <div>
        <label htmlFor="table">Type: </label>
        <select
          id="table"
          name="table_id"
          required={true}
          onChange={handleTableChange}
          value={selectedTableId}
        >
          <option value="" selected disabled hidden>
            Choose here
          </option>
          {tables.map((table, index) => (
            <option value={table.table_id} key={index}>
              {table.table_name} - {table.capacity}
            </option>
          ))}
        </select>
        <br />
        <button
          type="submit"
          className="btn btn-secondary m-1"
          onClick={handleConfirmButton}
        >
          Confirm
        </button>
        <ErrorAlert error={tablesError} />
      </div>
    </fieldset>
  );
}

export default SeatReservation;
