const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
// const { today } = require("../utils/date-time");


const hasRequiredProperties = hasProperties("first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people");

function hasEnoughPeople(req, res, next) {
    let data = req.body.data;
    if (req.body.data.people >= 1) {
        next();
    } else {
        next({
            message: "people has to be a number above zero",
            status: 400
        })
    }
}

function hasFutureWorkingDate(req, res, next) {
    console.log("hello!!")
    const date = req.body.data.reservation_date
    const dateObject = new Date(date)
    const today = new Date();
    const day = dateObject.getDay();
    console.log({ dateObject })
    console.log({ today })
    console.log("?", dateObject >= today)
    console.log({ day })
    if (dateObject <= today) {
        next({
            message: "Date needs to be in the future",
            status: 400
        })
    }
    if (day == 3) {
        next({
            message: "Restaurant is closed on tuesdays",
            status: 400
        })
    }

    next();
}

async function hasEligibleTime(req, res, next) {
    const time = req.body.data.reservation_time
    next();

}

async function list(req, res) {
    const { date } = req.query
    const allReservations = await service.list(date);
    res.status(200).json({ data: allReservations });
}

async function create(req, res) {
    console.log(">> req.body.data", req.body.data)
    const created = await service.create(req.body.data)
    res.status(201).json({ created })
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [hasRequiredProperties, hasFutureWorkingDate, hasEligibleTime, hasEnoughPeople, asyncErrorBoundary(create, 400)],
};