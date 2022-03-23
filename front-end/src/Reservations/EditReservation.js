import { getReservation, updateReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import { useParams } from "react-router";

function EditReservation() {
  const { reservationId } = useParams();
  const history = useHistory();

  const defaultReservation = {
    first_name: "hi",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
    reservation_id: reservationId,
  };

  const [reservation, setReservation] =
    useState(defaultReservation);

  const [updateError, setUpdateError] = useState();

  //loading the current reservations' data
  useEffect(() => {
    const abortController = new AbortController();
    setUpdateError(null);
    getReservation(reservationId, abortController.signal)
    .then(setReservation)
    .catch(setUpdateError);
    return () => abortController.abort();
  }, [reservationId]);

  const handleChange = (event) => {
    setReservation({
      ...reservation,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateReservation(reservationId, reservation)
      .then(() => history.push(`/reservations/${reservationId}`))
      .catch(setUpdateError);
  };

  return (
    <div>
      <h1>Edit Reservation</h1>
      <ReservationForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        reservation={reservation}
        history={history}
      />
      {/* <ErrorAlert error={updateError} /> */}
    </div>
  );
}

export default EditReservation;
