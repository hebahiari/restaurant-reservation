import React from "react";
import ReservationCard from "./ReservationCard";

function ListReservations({ reservations }) {
  let mapped = reservations.map((reservation, index) => (
    <ReservationCard reservation={reservation} key={index} />
  ));

  return <div>{mapped}</div>;
}

export default ListReservations;
