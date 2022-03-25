import React from "react";
import { useHistory } from "react-router";
import { changeStatus } from "../utils/api";

function ReservationCard({ reservation }) {
  let history = useHistory();

  // destructuring the input
  const {
    first_name,
    last_name,
    people,
    reservation_id,
    reservation_time,
    reservation_date,
    status,
    mobile_number,
  } = reservation;

  const seatButton = (
    <button
      type="button"
      className="btn btn-light m-1"
      href={`/reservations/${reservation.reservation_id}/seat`}
      onClick={() =>
        history.push(`/reservations/${reservation.reservation_id}/seat`)
      }
    >
      Seat
    </button>
  );

  const editButton = (
    <button
      type="button"
      className="btn btn-success m-1"
      href={`/reservations/${reservation.reservation_id}/edit`}
      onClick={() =>
        history.push(`/reservations/${reservation.reservation_id}/edit`)
      }
    >
      Edit
    </button>
  );

  function handleCancelButton() {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      changeStatus(reservation_id, "cancelled").then(() => history.push("/"));
    }
  }

  const cancelButton = (
    <button
      type="button"
      className="btn btn-secondary m-1"
      data-reservation-id-cancel={reservation.reservation_id}
      onClick={handleCancelButton}
    >
      Cancel
    </button>
  );

  return (
    <div className="card text-white m-3 row-md-2 border-0 ">
      <h5 className="card-header"> Reservation ID: {reservation_id} </h5>
      <div className="card-body">
        <p className="card-text">
          Name: {first_name} {last_name}
        </p>
        <p className="card-text">People: {people} </p>
        <p className="card-text">Mobile number: {mobile_number} </p>
        <p className="card-text">
          Date/Time: {reservation_date.slice(0,10)} / 
          {reservation_time.slice(0,5)}
        </p>
        <p
          className="card-text"
          data-reservation-id-status={reservation.reservation_id}
        >
          Status: {status}
        </p>
        {status === "booked" ? seatButton : null}
        {status === "booked" ? editButton : null}
        {status === "booked" ? cancelButton : null}
      </div>
    </div>
  );
}

export default ReservationCard;
