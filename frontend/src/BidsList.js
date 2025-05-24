import React, { useEffect, useState } from "react";

function BidsList() {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/bids/")  // Your backend API URL
      .then((res) => res.json())
      .then((data) => setBids(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Bids List</h2>
      {bids.length === 0 ? (
        <p>No bids yet</p>
      ) : (
        <ul>
          {bids.map((bid) => (
            <li key={bid.id}>
              {bid.project_name} - {bid.contractor} - {bid.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BidsList;
