import { getReservation, updateReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import { useParams } from "react-router";

function EditReservation() {
  const { reservationId } = useParams();
  const history = useHistory();

  //reservation template
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

  const [updateError, setUpdateError] = useState(null);
  const [ getReservationError , setGetReservationError ] = useState(null)

  //loading the current reservations' data
  useEffect(() => {
    const abortController = new AbortController();
    setGetReservationError(null);
    getReservation(reservationId, abortController.signal)
    .then(setReservation)
    .catch(setGetReservationError);
    return () => abortController.abort();
  }, [reservationId]);

  //controlling the component
  const handleChange = (event) => {
    setReservation({
      ...reservation,
      [event.target.name]: event.target.value,
    });
  };

  //sending an API call to update the reservation 
  //when clicking submit
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
      <ErrorAlert error={updateError} />
      <ErrorAlert error={getReservationError} />
    </div>
  );
}

export default EditReservation;
