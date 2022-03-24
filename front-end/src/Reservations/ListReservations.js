import React from "react";
import ReservationCard from "./ReservationCard";

function ListReservations({ reservations }) {
  
  let reservationsList = reservations.map((reservation, index) => (
    <ReservationCard reservation={reservation} key={index} />
  ));

  return <div>{reservationsList}</div>;
}

export default ListReservations;
