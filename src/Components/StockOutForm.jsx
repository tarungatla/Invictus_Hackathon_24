import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/StockOutForm.css";

function StockInForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    transId: "",
    dateValue: "",
    clientName: "",
    product: "",
    price: "",
    quantity: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any input is empty before proceeding
    // if (Object.values(formData).some((value) => value === "")) {
    //   alert("Please fill in all the fields before submitting.");
    //   return;
    // }

    // Add further logic for submitting the data or printing the invoice
    const response = await fetch("/receipt", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/Receipt", { state: { formData } });
  };

  return (
    <div className="form-main-container">
      <div className="form-content">
        <h1>Stock-Out Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Client Name:</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              placeholder="Enter your name"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="dateValue"
              value={formData.dateValue}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Product-id:</label>
            <input
              type="text"
              name="transId"
              value={formData.transId}
              placeholder="Enter Product-id"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              placeholder="price"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Quantity Total:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              placeholder="quantity"
              onChange={handleInputChange}
            />
          </div>
          <div className="submit-btn">
            <button type="submit">Print Invoice</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StockInForm;
