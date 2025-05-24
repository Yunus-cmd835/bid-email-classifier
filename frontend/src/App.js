import React, { useState } from "react";
import BidsList from "./BidsList";
import BidForm from "./BidForm";

function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refreshBids = () => {
    setRefreshFlag(!refreshFlag);
  };

  return (
    <div className="App">
      <h1>Bid Email Classifier</h1>
      <BidForm onBidCreated={refreshBids} />
      <BidsList key={refreshFlag} />
    </div>
  );
}

export default App;
