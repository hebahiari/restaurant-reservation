import React from "react";
import { useHistory } from "react-router";

function ReservationCard({reservation}) {

    let history = useHistory()
    const { first_name, last_name, people, reservation_id, reservation_time, reservation_date } = reservation

    return (<div className="card my-3" style={{ width: "40rem" }}>
    <div className="card-body">
      <h5 className="card-title"> ID: {reservation_id}  </h5>
      <p className="card-text">Name: {first_name} {last_name}</p>
      <p className="card-text">Number Of People: {people, reservation_time}  </p>
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