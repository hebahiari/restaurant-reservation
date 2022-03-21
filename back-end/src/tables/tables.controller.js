const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const { up } = require("../db/migrations/20220318125002_createTablesTable");

const hasRequiredProperties = hasProperties(
    "table_name",
    "capacity",
);


async function list(req, res) {
    const { date } = req.query;
    const allTables = await service.list(date);
    res.status(200).json({ data: allTables });
}

async function hasProperName(req, res, next) {
    const { table_name } = req.body.data;
    if (table_name.length < 2) {
        next({
            message: "table_name needs to be longer than one character",
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
async function update(req, res) {

    const { tableId } = req.params;
    const data = await service.update(tableId, req.body.data.reservation_id ? req.body.data.reservation_id : null);
    res.status(201).json({ data });

}

async function requestHasBody(req, res, next) {
    const { reservation_id } = req.body.data

    if (!req.body.data || !reservation_id) {
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
    const { reservation_id } = req.body.data

    const tableCapacity = await service.getCapacity(tableId)
    const capacity = tableCapacity.capacity;
    const numberOfPeople = await service.numberOfPeople(reservation_id)
    const people = numberOfPeople.people
    console.log({ capacity, numberOfPeople })
    if (people > capacity) {
        next({
            message: "table capacity is not enough",
            status: 400,
        });
    }
    next();
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [
        hasRequiredProperties,
        hasProperName,
        asyncErrorBoundary(create, 400),
    ],
    update: [requestHasBody, asyncErrorBoundary(tableHasEnoughSeats), asyncErrorBoundary(update, 400)],
    delete: asyncErrorBoundary(update, 400)
};