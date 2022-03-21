const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

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
            message: "table name needs to be longer than one character",
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
    const { reservation_id } = req.body.data
    const { tableId } = req.params;
    const data = await service.update(tableId, reservation_id);
    res.status(201).json({ data });

}

//in progress
async function tableHasEnoughSeats(req, res, next) {
    const { tableId } = req.params;
    console.log({ tableId })
    const data = await service.getCapacity(tableId)
    const tableCapacity = data.capacity
    next();
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [
        hasRequiredProperties,
        hasProperName,
        asyncErrorBoundary(create, 400),
    ],
    update: [asyncErrorBoundary(tableHasEnoughSeats), asyncErrorBoundary(update, 400)]
};