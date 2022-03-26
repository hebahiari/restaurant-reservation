import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, seatReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatReservation() {
  const { reservationId } = useParams();
  const history = useHistory();
  const [stateForm, setStateForm] = useState({
    tables: [],
    selectedTableId: "",
    tablesError: null,
  });

  const { tables, selectedTableId, tablesError } = stateForm;

  useEffect(loadTables, []);

  // sending an api call to retrieve the tables information
  function loadTables() {
    const abortController = new AbortController();
    setStateForm((currenState) => ({ ...currenState, tablesError: null }));
    listTables(abortController.signal)
      .then((response) =>
        setStateForm((currenState) => ({ ...currenState, tables: response }))
      )
      .catch((error) =>
        setStateForm((currenState) => ({ ...currenState, tablesError: error }))
      );
    return () => abortController.abort();
  }

  // controlling the component
  const handleTableChange = (event) => {
    setStateForm((currenState) => ({ ...currenState, selectedTableId: event.target.value }))
  };

  // sending an api call to add the reservation id to the selected table
  const handleConfirmButton = (event) => {
    event.preventDefault();
    seatReservation(selectedTableId, reservationId)
      .then(() => history.push("/"))
      .catch((error) =>
        setStateForm((currenState) => ({ ...currenState, tablesError: error }))
      );
  };

  return (
    <fieldset className="card-main col-md-8 p-4 mb-3 text-center">
      <h3>Select Table</h3>
      <h6 className="pb-2">table name - capacity</h6>
      <div>
        <select
          id="table"
          name="table_id"
          required={true}
          onChange={handleTableChange}
          value={selectedTableId}
          className="form-select"
          multiple
          aria-label="size 5 select example"
        >
          {tables.map((table) => (
            <option value={table.table_id} key={table.table_id}>
              {table.table_name} - {table.capacity}
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
