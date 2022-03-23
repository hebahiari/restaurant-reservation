import { createReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

function CreateReservation() {
  const emptyReservation = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [reservation, setReservation] = useState(emptyReservation);
  const [newReservationsError, setNewReservationsError] = useState(null);
  const history = useHistory();

  const handleChange = (event) => {
    setReservation({
      ...reservation,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createNewReservation(reservation);
  };

  function createNewReservation(reservation) {
    const abortController = new AbortController();
    setNewReservationsError(null);
    createReservation(reservation, abortController.signal)
      .then(() =>
        history.push(`/reservations?date=${reservation.reservation_date}`)
      )
      .then(() => setReservation(emptyReservation))
      .catch(setNewReservationsError);
    return () => abortController.abort();
  }

  return (
    <div>
      <h1>Create New Reservation</h1>
      <ReservationForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        reservation={reservation}
        history={history}
      />
      <ErrorAlert error={newReservationsError} />
    </div>
  );
}

export default CreateReservation;
