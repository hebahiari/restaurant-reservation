## Links
* Deployed App: [Periodic Tables](https://restaurant-reservations-sys.herokuapp.com/)

## Summary
Periodic Tables is a restaurant reservation system desgined to be used by a restaurant manager/owner. The application allows the user to control all aspects of reservations and tables within the restaurant. This allows the user to have a clear view of the current status of the restaurant and quickly manage reservations as needed.
 * Reservations
    * View all reservations for a specified date
    * Create new Reservations
    * Cancel existing Reservations
    * Search for a reservation via the customer's phone number
    * Edit/update existing reservation details and status 
    * Seat a reservation at a table
* Tables
    * View all tables and whether they are occupied or open
    * Create new tables
    * Clear tables (When a reservation is finished and the table is ready for the next guest)
        * Changes an occupied table's status from "Occupied" to "Free"
* Built-in validation
    * Application ensures reservations can only be created/updated within a valid date/time-window
        * Cannot create reservations for past dates, reservations can only be created between 9:30 am and 10:30 pm
        * Reservations cannot be created for Tuesdays (Restaurant closed)
        * Validates all inputs for proper formatting
    * When the user attempts to seat a reservation at a table, the application will make sure that the selected table has proper capacity for the reservation
    * Unoccupied tables cannot be cleared
***

## Installation
1. Go to the project root
2. Run `npm install` to install dependencies
3. Start project on development server with `npm run start:dev`
4. Start tests with `npm run test`
5. Start frontend/backend tests with `npm run test:frontend or npm run test:backend`
6. Start individual tests for each user stories with `npm run test:1:frontend` replace 1 with the desired user story or replace frontend with backend
***

## Technology
### <u>Client</u>
* Built with create-react-app.
* Uses [react-router](https://reactrouter.com/) for front-end routing
* Styled with [Bootstrap](https://getbootstrap.com/)
### <u>Server</u>
* Node and Express
* Utilizes [Knex](https://knexjs.org/) for PostgreSQL query building
### <u>Database</u>
* Hosted by ElphantSQL
***

# Screenshots

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
***

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
