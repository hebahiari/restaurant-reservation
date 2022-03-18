import { createReservation } from "../../utils/api";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../ErrorAlert";


function CreateReservation() {
  const emptyReservation = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };
  const [newReservation, setNewReservation] = useState(emptyReservation);
  const [newReservationsError, setNewReservationsError] = useState(null);
  const history = useHistory();

  const handleChange = (event) => {
    setNewReservation({ ...newReservation, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createNewReservation(newReservation)
  };

  
  function createNewReservation(newReservation) {
    const abortController = new AbortController();
    setNewReservationsError(null);
    createReservation(newReservation, abortController.signal)
      .then(() => setNewReservation(emptyReservation))
      .catch(setNewReservationsError);
    return () => abortController.abort();
  }

  return (
    <div>
      <h1>Create New Reservation</h1>
      <ReservationForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newReservation={newReservation}
        history={history}
      />
       <ErrorAlert error={newReservationsError} />
    </div>
  );
}

export default CreateReservation;
