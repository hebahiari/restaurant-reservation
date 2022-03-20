import React from "react";
import ReservationCard from "./ReservationCard";

function ListReservations({reservations}) {
    let mapped = reservations.map((reservation) => <ReservationCard reservation={reservation} />)

    return(
        <div>
        {mapped}
        </div>
    )
}





export default ListReservations;