const knex = require("../db/connection");
const { today } = require("../utils/date-time");

function list(date = today()) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date })
        .whereNot("status", "finished")
        .orderBy("reservation_time");
}

function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdReservations) => createdReservations[0]);
}

function read(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservation_id })
        .first();
}

function changeStatus(reservation_id, status) {
    return knex("reservations")
        .select("*")
        .where({ "reservation_id": reservation_id })
        .update({ "status": status });
}

module.exports = {
    list,
    create,
    read,
    changeStatus,
};