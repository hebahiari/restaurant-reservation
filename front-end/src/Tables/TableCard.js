import React from "react";
import { useHistory } from "react-router";
import { unreserveTable } from "../utils/api"

function TableCard({table}) {

    let history = useHistory()
    const { capacity, table_name, reservation_id } = table

function handleFinishButton() {

    if (
      window.confirm("Is this table ready to seat new guests? This cannot be undone.")
    ) {
      unreserveTable(table.table_id)
      // .then(() => changeStatus(reservation_id, "finished"))
      .then(() => history.push("/"));
    }
}

    const finishButton = ( <button
      type="button"
      className="btn btn-success m-1"
      data-table-id-finish={table.table_id}
      // in progress
      onClick={handleFinishButton}
    >
      Finish
    </button>)

    return (<div className="card text-white m-3 row-md-2 border-0 ">
    <div className="card-body">
      <h5 className="card-title"> <b>Table:</b> {table_name}  </h5>
      <p className="card-text"><b>Capacity: </b>{capacity}</p>
      <p className="card-text" data-table-id-status={table.table_id}>Status: {reservation_id ? "Occupied" : "Free"}</p>
      {table.reservation_id ? finishButton : null}
    </div>
  </div>)

}

export default TableCard