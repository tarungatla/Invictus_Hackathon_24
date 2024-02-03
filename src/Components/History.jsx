import React, { useEffect, useState } from "react";
import { db } from "../Firebase/config";
import {
  doc,
  getDoc,
  Timestamp,
  setDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import "./css/History.css";

const History = () => {
  const [keys, setKeys] = useState([]);
  const [transactions, setTransactions] = useState({});
  useEffect(() => {
    fetchTransactionDetails();
  }, []);
  const fetchTransactionDetails = async () => {
    const querySnapshot = await getDocs(collection(db, "transaction"));
    const data = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
    for (let i = 0; i < data.length; i++){
      for (const key in data[i]) {
        setKeys((keys) => [...keys, key]);
      }
    }
    console.log(keys);
    // console.log(data);
    for (let i = 0; i < data.length; i++){
      for (const key in data[i]) {
        setTransactions((transactions) => ({ ...transactions, [key]: data[i][key] }));
      }
    }
    console.log(transactions);



    // const documentRef = doc(db, "transaction", "23-01-24");
    // console.log(documentRef)
    // const docSnap = await getDoc(documentRef);
    // const data = docSnap.data();

    // console.log(data);

    // const documentRef = doc(db, "transaction", "23-01-24");
    // console.log(documentRef)
    // const docSnap = await getDoc(documentRef);
    // const data = docSnap.data();

    // console.log(data);

    // Object.entries(data).forEach(([key, value]) => {
    //     console.log(`Key: ${key}, Value: ${value}`);
    // });
  };

  return (
    <div className="TransTable">
      <h1>Transaction History</h1>
      <table className="tablediv">
        <thead>
          <tr>
            <th>Transaction Id</th>
            <th>Client Name</th>
            <th>Product Info</th>
            <th>Total price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(transactions).length > 0 ? (
            Object.keys(transactions).map((key,index) => (
              <tr key={index}>
                <td>{key}</td>
                <td>{transactions[key].clientName}</td>
                <td>
                  <td>
                    {transactions[key].products.map((product, index) => (
                      <div key={index}>
                        Product name: {product.productName}, Quantity: {product.quantity}, Price: {product.price}
                      </div>
                    ))}
                  </td>
                </td>
                <td>
                  {transactions[key].inWarehouse ? "+" : "-"}{" "}
                  {transactions[key].totalPrice}
                </td>
                <td>{transactions[key].date.toDate().toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <button
        onClick={() => {
          insertData();
        }}
      >
        Click Here
      </button> */}
    </div>
  );
};

export default History;
