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
    <fieldset className="card-main col-md-8 p-4 mb-3 text-center" >
      <legend>Select Table</legend>
      <h6 className="pb-2">table name - capacity</h6>
      <div>
        <select
          id="table"
          name="table_id"
          required={true}
          onChange={handleTableChange}
          value={selectedTableId}
          className="form-select" 
          multiple aria-label="size 5 select example"
        >
          <option value="" selected disabled hidden>
            Choose here
          </option>
          {tables.map((table) => (
            <option value={table.table_id} key={table.table_id}>
              {table.table_name} - {table.capacity}      ({table.reservationId? "Occupied" : "Available"})
            </option>
          ))}
        </select>
        <br />
        <button
          type="submit"
          className="btn btn-success m-1"
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
