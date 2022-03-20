import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { listTables } from "../utils/api"
import { useParams } from "react-router-dom"
import { seatReservation } from "../utils/api";

function SeatReservation() {

  const { reservationId } = useParams();
  const [tables, setTables] = useState([])
  const [selectedTableId, setSelectedTableId] = useState("null")
  const [tablesError, setTablesError] = useState(null)
  const history = useHistory();

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
    .then(setTables)
    .catch(setTablesError)
    return () => abortController.abort();
  }

const handleTableChange = (event) => {
  setSelectedTableId(event.target.value);
  console.log(selectedTableId)
};

const handleConfirmButton = (event) => {
event.preventDefault();
seatReservation(selectedTableId, reservationId)
.then(() => history.push("/"))
};

    return ( <fieldset>
      <legend>Select Table</legend>
      <div>
        <label htmlFor="table">Type: </label>
        <select id="table" name="table" required={true} onChange={handleTableChange} value={selectedTableId}>
          {tables.map((table) => <option value={table.table_id}>{table.table_name} - {table.capacity}</option>)}
        </select>
        <button className="btn btn-secondary m-1" onClick={handleConfirmButton}>
          Confirm
        </button>
        </div>
        </fieldset>)

}

export default SeatReservation