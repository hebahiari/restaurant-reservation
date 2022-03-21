const knex = require("../db/connection");
// const { today } = require("../utils/date-time")

function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name")
}

function create(table) {
    return knex("tables")
        .insert(table)
        .returning("*")
        .then((createdTables) => createdTables[0])
}

/// in progress
function update(tableId, reservation_id) {
    return knex("tables")
        .select("*")
        .where({ "table_id": tableId })
        .update({ reservation_id: reservation_id })
}

function read(tableId) {
    return knex("tables")
        .select("capacity")
        .where({ table_id: tableId })
        .first()
}
module.exports = {
    list,
    create,
    update,
    read,
}