import { getReservation, updateReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import { useParams } from "react-router";

function EditReservation() {
  const { reservation_id } = useParams();
  const history = useHistory();

  const defaultReservation = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
    status: "",
    reservation_id: reservation_id,
  };

  const [updatedReservation, setUpdatedReservation] =
    useState(defaultReservation);

  const [updateError, setUpdateError] = useState();

  useEffect(() => {
    getReservation(reservation_id)
      .then(setUpdatedReservation)
      .then(() => console.log({updateReservation}))
      .catch(setUpdateError);
  }, [reservation_id]);

  const handleChange = (event) => {
    setUpdatedReservation({
      ...updatedReservation,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updatedReservation(updatedReservation)
    .then(() =>
      history.push(`/reservations/${reservation_id}`)
    )
    .catch(setUpdateError)
  };

  return (
    <div>
      <h1>Edit Reservation</h1>
      <ReservationForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        reservation={updatedReservation}
        history={history}
      /> 
      <ErrorAlert error={updateError} />
    </div>
  );
}

export default EditReservation;
