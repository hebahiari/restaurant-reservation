import React from "react";
import { useHistory } from "react-router";
import { changeStatus } from "../utils/api";

function ReservationCard({ reservation }) {
  let history = useHistory();
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
      className="btn btn-secondary m-1"
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
      className="btn btn-secondary m-1"
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
    <div className="card my-3" style={{ width: "40rem" }}>
      <div className="card-body">
        <h5 className="card-title"> ID: {reservation_id} </h5>
        <p className="card-text">
          Name: {first_name} {last_name}
        </p>
        <p className="card-text">Number Of People: {people} </p>
        <p className="card-text">Mobile number: {mobile_number} </p>
        <p className="card-text">
          Date/Time: {reservation_date}
          {reservation_time}{" "}
        </p>
        <p
          className="card-text"
          data-reservation-id-status={reservation.reservation_id}
        >
          Status: {status}{" "}
        </p>
        {status === "booked" ? seatButton : null}
        {status === "booked" ? editButton : null}
        {cancelButton}
      </div>
    </div>
  );
}

export default ReservationCard;
