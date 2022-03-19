const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const hasRequiredProperties = hasProperties(
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people"
);

function hasEnoughPeople(req, res, next) {
    let { people } = req.body.data;
    if (typeof(people) !== "number" || people < 1) {
        next({
            message: "people has to be a number above zero",
            status: 400,
        });
    }
    next();
}

function hasFutureWorkingDate(req, res, next) {
    const { reservation_date, reservation_time } = req.body.data;
    const reservationDate = new Date(
        `${reservation_date}T${reservation_time}Z`
    );
    const today = new Date();

    if (reservationDate.getUTCDay() == 2) {
        next({
            message: "Restaurant is closed on tuesdays",
            status: 400,
        });
    }

    if (reservationDate < today) {
        next({
            message: "Reservation needs to be in the future",
            status: 400,
        });
    }
    next();
}

async function hasEligibleTime(req, res, next) {
    let time = req.body.data.reservation_time;
    let hours = parseInt(time.slice(0, 2));
    let minutes = parseInt(time.slice(2, 2));
    if (
        hours < 10 ||
        (hours == 10 && minutes < 30) ||
        hours > 21 ||
        (hours == 21 && minutes > 30)
    ) {
        next({
            message: "Please select a time between 10:30 and 21:30",
            status: 400,
        });
    }
    next();
}

async function list(req, res) {
    const { date } = req.query;
    const allReservations = await service.list(date);
    res.status(200).json({ data: allReservations });
}

async function create(req, res) {
    console.log(">> req.body.data", req.body.data);
    const created = await service.create(req.body.data);
    res.status(201).json({ created });
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [
        hasRequiredProperties,
        hasFutureWorkingDate,
        hasEligibleTime,
        hasEnoughPeople,
        asyncErrorBoundary(create, 400),
    ],
};