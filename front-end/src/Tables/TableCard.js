import React from "react";
import { useHistory } from "react-router";

function TableCard({table}) {

    let history = useHistory()
    const { capacity, table_name, reservation_id } = table

    const finishButton = ( <button
      type="button"
      className="btn btn-secondary m-1"
      data-table-id-finish={table.table_id}
      // in progress
      onClick={() => history.push(`/`)}
    >
      Finish
    </button>)

    return (<div className="card my-3" style={{ width: "40rem" }}>
    <div className="card-body">
      <h5 className="card-title"> Table Name: {table_name}  </h5>
      <p className="card-text">Capacity {capacity}</p>
      <p className="card-text" data-table-id-status={table.table_id}>Status: {reservation_id ? "Occupied" : "Free"}</p>
      {table.reservation_id ? finishButton : null}
    </div>
  </div>)

}

export default TableCard