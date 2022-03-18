import React from "react";

function ReservationForm({handleChange, handleSubmit, newReservation, history}){

return(
<form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            First Name
          </label>
          <textarea
            className="form-control"
            id="first_name"
            name="first_name"
            required
            onChange={handleChange}
            value={newReservation.first_name}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Last Name
          </label>
          <textarea
            className="form-control"
            id="last_name"
            name="last_name"
            required
            onChange={handleChange}
            value={newReservation.last_name}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mobile_number" className="form-label">
            Mobile number
          </label>
          <textarea
            className="form-control"
            id="mobile_number"
            name="mobile_number"
            required
            onChange={handleChange}
            value={newReservation.mobile_number}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="reservation_date" className="form-label">
          Reservation date
          </label>
          <textarea
            className="form-control"
            id="reservation_date"
            name="reservation_date"
            required
            onChange={handleChange}
            value={newReservation.reservation_date}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="reservation_time" className="form-label">
            Reservation time
          </label>
          <textarea
            className="form-control"
            id="reservation_time"
            name="reservation_time"
            required
            onChange={handleChange}
            value={newReservation.reservation_time}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="people" className="form-label">
            Number of people
          </label>
          <textarea
            className="form-control"
            id="people"
            name="people"
            required
            onChange={handleChange}
            value={newReservation.people}
          />
        </div>



      <button className="btn btn-secondary m-1" onClick={() => history.go("/")}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary m-1">
          Submit
        </button>
      </form>
)
}

export default ReservationForm;