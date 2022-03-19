import React from "react";
import { useHistory } from "react-router";

function ReservationCard({reservation}) {

    let history = useHistory()

    return (<div className="card my-3" style={{ width: "40rem" }}>
    <div className="card-body">
      <h5 className="card-title"> ID: {reservation.reservation_id}  </h5>
      <p className="card-text">Name: {reservation.first_name} {reservation.last_name}</p>
      <p className="card-text">Number Of People: {reservation.people} </p>
      <button
        type="button"
        className="btn btn-secondary m-1"
        onClick={() => history.push(`/reservations/${reservation.reservation_id}/seat`)}
      >
        Seat
      </button>
    </div>
  </div>)

}

export default ReservationCard