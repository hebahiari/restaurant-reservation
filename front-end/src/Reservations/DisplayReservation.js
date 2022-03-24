import React, { useEffect, useState } from "react";
import ReservationCard from "./ReservationCard";
import { useParams } from "react-router";
import { getReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function DisplayReservation() {

const { reservationId } = useParams();
const [ reservation, setReservation] = useState(null)
const [ getReservationError, setGetReservationError ] = useState(null);

//retrieving the reservation from the database
useEffect(() => {
    getReservation(reservationId)
    .then(setReservation)
    .catch(setGetReservationError)
}, [reservationId])
    
  return (
      <div>
      {reservation ? <ReservationCard reservation={reservation} /> : null }
      <ErrorAlert error={getReservationError} />
</div>  
);
}

export default DisplayReservation;
