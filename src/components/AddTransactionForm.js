import React, { useState } from "react";

function AddTransactionForm({ addTransaction }) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  function handleChange(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    addTransaction(formData);

    setFormData({
      date: "",
      description: "",
      category: "",
      amount: "",
    });
  }

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleFormSubmit}>
        <div className="inline fields">
          <input
            type="date"
            value={formData.date}
            onChange={handleChange}
            name="date"
          />
          <input
            type="text"
            value={formData.description}
            onChange={handleChange}
            name="description"
            placeholder="Description"
          />
          <input
            type="text"
            value={formData.category}
            onChange={handleChange}
            name="category"
            placeholder="Category"
          />
          <input
            type="number"
            value={formData.amount}
            onChange={handleChange}
            name="amount"
            placeholder="Amount"
            step="0.01"
          />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
