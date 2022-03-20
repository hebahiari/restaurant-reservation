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

async function create(req, res) {
    console.log(">> req.body.data", req.body.data);
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
}


//in progress
async function update(req, res) {
    const { reservation_id } = req.body.data
    console.log("params", req.params)
    const { tableId } = req.params;
    console.log({ reservation_id, tableId })

    const data = await service.update(tableId, reservation_id);
    res.status(201).json({ data });

}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [
        hasRequiredProperties,
        asyncErrorBoundary(create, 400),
    ],
    update: asyncErrorBoundary(update)
};