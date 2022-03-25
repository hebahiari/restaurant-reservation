## Links
* Deployed App: [Periodic Tables](https://restaurant-reservations-sys.herokuapp.com/)

## Installation
1. Go to the project root
2. Run `npm install` to install dependencies
3. Start project on development server with `npm run start:dev`
4. Start tests with `npm run test`
5. Start frontend/backend tests with `npm run test:frontend or npm run test:backend`
6. Start individual tests for each user stories with `npm run test:1:frontend` replace 1 with the desired user story or replace frontend with backend

## Summary
Built a full-stack web app for use as an internal tool to manage restaurant reservations.

Has the following features:
* users can create, edit, or cancel a reservation
* users can create a table
* users can seat reservations to a table
* users can finish a table
* users can search for reservations by phone numbers 

## Stack
* React
* Bootstrap
* Node
* Express
* PostgreSQL
* Knex.js

## Dashboard
![dashboard](/images/Dashboard.PNG)

## New Reservation
![new-reservation](/images/NewReservation.PNG)

## Search By Phone Number
![search-phone](/images/SearchPhone.PNG)

## New Table
![new-table](/images/NewTable.PNG)

## Seat Reservation
![seat-reservation](/images/SeatReservation.PNG)


## Documentation for API 
| Route                                | Description                                        | Methods |
| ------------------------------------ | -------------------------------------------------- | ------- |
| /reservations	                       | returns a list of reservations for current date    | GET     | 
| /reservations                        | creates a new reservation                          | POST    |  
| /reservations?date=YYYY-MM-DD        | returns a list of reservations for a given date    | GET     |
| /reservations/:reservation_id	       | returns a reservation matching a given id          | GET     |
| /reservations/:reservation_id	       | updates a reservation matching a given id          | PUT     |
| /reservations/:reservation_id/status | updates the status of a reservation for a given id | PUT     |
| /tables	                           | returns a list of tables                           | GET     |
| /tables	                           | creates a new table                                | POST    |
| /tables/:table_id/seat	           | moves reservation to a table for a given id        | PUT     |
| /tables/:table_id/seat	           | remove a reservation from a table for a given id   | DELETE  |


## Reservation Example
```
{
    data: {
        reservation_id: 5,
        first_name: "Anthony",
        last_name: "Charboneau",
        mobile_number: "620-646-8897",
        reservation_date: "2026-12-30",
        reservation_time: "18:00:00",
        people: 2,
        status: "booked",
        created_at: "2020-12-10T08:31:32.326Z",
        updated_at: "2020-12-10T08:31:32.326Z"
    }
}
```

## Table Example
```
{
    table_id: 3,
    table_name: "#1",
    capacity: 6,
    reservation_id: 11
}
```
