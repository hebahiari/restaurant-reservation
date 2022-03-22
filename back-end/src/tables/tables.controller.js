const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const { up } = require("../db/migrations/20220318125002_createTablesTable");

const hasRequiredProperties = hasProperties("table_name", "capacity");

async function list(req, res) {
    const { date } = req.query;
    const allTables = await service.list(date);
    res.status(200).json({ data: allTables });
}

async function hasProperNameAndCapacity(req, res, next) {
    const { table_name, capacity } = req.body.data;
    if (table_name.length < 2) {
        next({
            message: "table_name needs to be longer than one character",
            status: 400,
        });
    }
    if (typeof capacity !== "number") {
        next({
            message: "capacity needs to be a number",
            status: 400,
        });
    }
    next();
}

async function create(req, res) {
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
}

//in progress
async function update(req, res, next) {
    const { tableId } = req.params;
    res.locals.tableId = tableId;
    const data = await service.update(
        tableId,
        req.body.data ? req.body.data.reservation_id : null
    );

    console.log("update returns:", data);
    next();
}

async function requestHasBody(req, res, next) {
    if (!req.body || !req.body.data || !req.body.data.reservation_id) {
        next({
            message: "request needs a body that has reservation_id",
            status: 400,
        });
    }

    next();
}

//in progress
async function tableHasEnoughSeats(req, res, next) {
    const { tableId } = req.params;
    const { reservation_id } = req.body.data;

    const table = await service.getTable(tableId);
    res.locals.table = table;
    const capacity = table.capacity;
    const numberOfPeople = await service.getReservation(reservation_id);
    const people = numberOfPeople.people;
    if (people > capacity) {
        next({
            message: "table capacity is not enough",
            status: 400,
        });
    }
    next();
}

async function reservationExists(req, res, next) {
    const { reservation_id } = req.body.data;
    const reservation = await service.getReservation(reservation_id);
    if (!reservation) {
        next({
            message: `this reservation_id (${reservation_id}) does not exist`,
            status: 404,
        });
    }
    next();
}

async function tableIsAvailable(req, res, next) {
    let table = res.locals.table;
    if (table.reservation_id) {
        next({
            message: "this table is occupied",
            status: 400,
        });
    }
    next();
}

async function tableExists(req, res, next) {
    const { tableId } = req.params;
    const table = await service.getTable(tableId);
    res.locals.table = table;
    if (!table) {
        next({
            message: `this table (${tableId}) does not exist`,
            status: 404,
        });
    }
    next();
}

async function tableIsOccupied(req, res, next) {
    let table = res.locals.table;
    if (!table.reservation_id) {
        next({
            message: "this table is not occupied",
            status: 400,
        });
    }
    next();
}

async function changeStatus(req, res, next) {
    let table = res.locals.table;
    let newStatus = "";
    if (req.method == "DELETE") {
        console.log("--------------finishing")
        newStatus = "finished";
        const data = await service.changeStatus(table.table_id, newStatus);
        res.status(200);

        next();
    } else {
        console.log("---------------seating")
        newStatus = "seated";
    }
    const data = await service.changeStatus(table.table_id, newStatus);
    console.log("result", { data });
    res.status(200);
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [
        hasRequiredProperties,
        hasProperNameAndCapacity,
        asyncErrorBoundary(create, 400),
    ],
    update: [
        requestHasBody,
        reservationExists,
        asyncErrorBoundary(tableHasEnoughSeats),
        tableIsAvailable,
        asyncErrorBoundary(update, 400),
        asyncErrorBoundary(changeStatus),
    ],
    delete: [
        asyncErrorBoundary(tableExists),
        tableIsOccupied,
        asyncErrorBoundary(changeStatus),
        asyncErrorBoundary(update, 400),
    ],
};