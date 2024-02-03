import React, { useState, useEffect } from "react";
import { db } from "../Firebase/config";
import {
  doc,
  getDoc,
  Timestamp,
  setDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import "./css/StockInForm.css";

function StockInForm() {
  const [formData, setFormData] = useState({
    date: "",
    clientName: "",
    productId: "",
    quantity: 0,
  });
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState(null);

  const productRef = doc(db, "product", "productDetails");
  var productDoc = null;
  useEffect(() => {
    const fetchData = async () => {
      productDoc = await getDoc(productRef);
      setData(productDoc.data());
    };

    fetchData();
  }, []);

  const getProduct = async (productId) => {

    // Iterate over data
    for (const key in data) {
      if (key == productId) {
        return data[key];
      }
    }
    return null;
  };
  const convertToTimestamp = (dateString) => {
    const [year, month, day] = dateString.split("-");
    let yy = year.toString().substr(-2);
    //remove starting zero from month
    const monthTrimmed = month[0] === "0" ? month[1] : month;
    return (`${day}-${monthTrimmed}-${yy}`);
  };

  const insertData = async (e) => {
    e.preventDefault();
    const productArray = [];
    for (const product_row of tableData) {
      productDoc = await getDoc(productRef);
      const currentData = productDoc.data();
      console.log(currentData);
      // code to create an array of objects with productName, quantity, and price
      
      for (const key in currentData) {
        if (key == product_row.productId) {
          const product = currentData[key];
          const { productName, quantity, price } = product;
          productArray.push({ productName, quantity, price });
        }
      }
      console.log(productArray);
    }

    const tId = Math.floor(Math.random() * 10000000 + 1);
    const transactionData = {
      [tId]: {
        clientName: formData.clientName,
        totalPrice: 1000,
        date: Timestamp.fromDate(new Date()),
        products: productArray,
        inWarehouse: true,
      },
    };

    try {
      const trimmed_date = convertToTimestamp(formData.date);
      const docRef = doc(db, "transaction", trimmed_date);
      const options = { merge: true };

      await setDoc(docRef, transactionData, options);
      // increment the count of each product according to quantity mentioned in form


      for (const product_row of tableData) {
        productDoc = await getDoc(productRef);
        const currentData = productDoc.data();
        const newQuantity = Number(product_row.quantity) + currentData[product_row.productId].quantity;
        const newProductData = {
          ...currentData,
          [product_row.productId]: { ...currentData[product_row.productId], quantity: newQuantity },
        };
        await setDoc(productRef, newProductData);
      }

      // Fetch the updated data
      productDoc = await getDoc(productRef);
      setData(productDoc.data());
      //   // Reset the form after submission
      setFormData({
        date: formData.date,
        clientName: formData.clientName || "", // Keep the client name if already set
        productId: 0,
        quantity: 0,
      });
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = await getProduct(formData.productId);
    if (product == null) {
      alert("Invalid productId!");
      return
    }
    // Add the current form data to the tableData array
    setTableData([...tableData, { 'productId': formData.productId, 'price': 100, 'quantity': formData.quantity }]);
    setFormData({
      date: formData.date,
      clientName: formData.clientName || "", // Keep the client name if already set
      productId: formData.productId,
      quantity: 0,
    });
  };

  return (
    <div className="form-main-container">
      <div className="form-content">
        <h1>Stock-In Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="clientName">
            <label>Client Name: </label>
            <input
              type="text"
              name="clientName"
              placeholder="Enter client name"
              value={formData.clientName}
              onChange={handleInputChange}
            // disabled={formData.clientName !== ""} // Disable if client name is set
            />
          </div>
          <div className="dateValue">
            <label>Date: </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="transId">
            <label>ProductId: </label>
            <input
              type="text"
              name="productId"
              placeholder="Enter ProductId"
              value={formData.productId}
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="Quantity">
            <label>Quantity Total: </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div className="submit-btn">
            <button type="submit">Add to Table</button>
          </div>
        </form>
      </div>


      <div className="table-container">
        <h2>Table Data</h2>
        <table>
          <thead>
            <tr>
              <th>ProductId</th>
              <th>Price</th>
              <th>Quantity Total</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td>{data.productId}</td>
                <td>{data.price}</td>
                <td>{data.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={insertData}>
          <div className="submit-btn">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StockInForm;
