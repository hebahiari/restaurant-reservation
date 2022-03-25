import React, { useState } from "react";
import { search } from "../utils/api";
import ListReservations from "../Reservations/ListReservations";
import ErrorAlert from "../layout/ErrorAlert";

function Search() {
  let [number, setNumber] = useState();
  let [found, setFound] = useState();
  let [displayResult, setDisplayResult] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [loading, setLoading] = useState(false);
  // const history = useHistory();

  const handleChange = (event) => {
    setNumber(event.target.value);
    setDisplayResult(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    search(number)
      .then(setFound)
      .then(() => setDisplayResult(true))
      .then(() => setLoading(false))
      .catch(setSearchError);
  };

  const noReservationsFound = (
    <p>No reservations found for this number: {number}</p>
  );

  const loadingSpinner = (
    <div className="row  justify-content-center ">
    <div className="card-main col-6 p-4 mb-3 justify-content-center">
    <div className="d-flex justify-content-center p-5 m-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
    </div>
    </div>
  );

  return (
    <>
    <div className="container">
      <div className="row justify-content-center">
      <div className="card-main col-6 pb-4 mb-3">
        <form className="mx-3" onSubmit={handleSubmit}>
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
      </div>
      {loading? loadingSpinner : null}
      {displayResult ? (
        found.length ? (
          <div className="row  justify-content-center ">
          <div className="card-main col-6 p-4 mb-3">
            <ListReservations reservations={found} />
          </div>
          </div>
        ) : (
          noReservationsFound
        )
      ) : null}
      </div>
    </>
  );
}

export default Search;
