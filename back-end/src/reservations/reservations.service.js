const knex = require("../db/connection");
const { today } = require("../utils/date-time")

function list(date = today()) {
    console.log("list request", { date })
    return knex("reservations")
        .select("*")
        .where({ "reservation_date": date })
        .orderBy("reservation_time")
}

function create(reservation) {
    console.log("create request", { reservation })
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdReservations) => createdReservations[0])
}

module.exports = {
    list,
    create,
}