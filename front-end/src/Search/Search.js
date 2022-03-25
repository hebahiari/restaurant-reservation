import React, { useState } from "react";
// import { useHistory } from "react-router";
import ListReservations from "../Reservations/ListReservations";
import { search } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Search() {
  let [number, setNumber] = useState();
  let [found, setFound] = useState();
  let [displayResult, setDisplayResult] = useState(false);
  const [searchError, setSearchError] = useState(null);
  // const history = useHistory();

  const handleChange = (event) => {
    setNumber(event.target.value);
    setDisplayResult(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    search(number)
      .then(setFound)
      .then(() => setDisplayResult(true))
      .catch(setSearchError);
  };

  const noReservationsFound = (
    <p>No reservations found for this number: {number}</p>
  );

  return (
    <>
    <div className="card-main col-md-8 p-4 mb-3">
      <form  className="mx-3" onSubmit={handleSubmit}>
        <h2 className="mb-3">Search</h2>
        <div className="mb-3">
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
  
      
    </div>
      {displayResult ? (
        found.length ? (<div className="card-main col-md-8 p-4 mb-3">
          <ListReservations reservations={found} />
          </div>
        ) : (
          noReservationsFound
        )
      ) : null}
      </>
  );
}

export default Search;
