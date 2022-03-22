import React, { useState } from "react"
// import { useHistory } from "react-router";
import ListReservations from "../Reservations/ListReservations";
import { search } from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert";

function Search() {

    let [number, setNumber] = useState();
    let [found, setFound] = useState();
    let [displayResult, setDisplayResult] = useState(false);
    const [searchError, setSearchError] = useState(null);
    // const history = useHistory();

    const handleChange = (event) => {
        setNumber(event.target.value)
        setDisplayResult(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        search(number)
        .then(setFound)
        .then(() => setDisplayResult(true))
        .catch(setSearchError)
    }

    const noReservationsFound = (
        <p>No reservations found for this number: {number}</p>
    )

    return ( <div><form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="first_name" className="form-label">
        Search
      </label>
      <input
        className="form-control"
        id="mobile_number"
        name="mobile_number"
        required
        onChange={handleChange}
        value={number}
        placeholder="Insert phone number"
      />
    </div>

    <button type="submit" className="btn btn-primary m-1">
      Search
    </button>
  </form>
  <ErrorAlert error={searchError} />
  {displayResult ? (found.length ? <ListReservations reservations={found}/> : noReservationsFound) : null}
  </div>
);
    }


    export default Search