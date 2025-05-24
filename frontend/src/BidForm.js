import React, { useState } from "react";

function BidForm({ onBidCreated }) {
  const [projectName, setProjectName] = useState("");
  const [contractor, setContractor] = useState("");
  const [bidType, setBidType] = useState("");
  const [valueRange, setValueRange] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bidData = {
      project_name: projectName,
      contractor: contractor,
      bid_type: bidType,
      value_range: valueRange,
      status: status,
      emails: [] // for now, empty list
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/bids/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bidData),
      });
      if (!response.ok) {
        throw new Error("Failed to create bid");
      }
      const newBid = await response.json();
      alert(`Bid created successfully! ID: ${newBid.id}`);

      // Clear form
      setProjectName("");
      setContractor("");
      setBidType("");
      setValueRange("");
      setStatus("");

      // Notify parent (App) to refresh the list
      if (onBidCreated) onBidCreated();

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Bid</h2>
      <div>
        <label>Project Name:</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contractor:</label>
        <input
          type="text"
          value={contractor}
          onChange={(e) => setContractor(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Bid Type:</label>
        <input
          type="text"
          value={bidType}
          onChange={(e) => setBidType(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Value Range:</label>
        <input
          type="text"
          value={valueRange}
          onChange={(e) => setValueRange(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Bid</button>
    </form>
  );
}

export default BidForm;
