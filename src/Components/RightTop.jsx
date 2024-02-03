import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/config";
import "./css/RightTop.css";

function RightTop() {
  const [todayIn, setTodayIn] = useState(0);
  const [todayOut, setTodayOut] = useState(0);
  var date = new Date();
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yy = date.getFullYear();
  yy = yy.toString().substr(-2);

  var dateString = dd + "-" + mm + "-" + yy;

  const fetchTransactionDetails = async () => {
    const documentRef = doc(db, "transaction", dateString);
    const docSnap = await getDoc(documentRef);
    const data = docSnap.data();

    let totalIn = 0;
    let totalOut = 0;

    if (data != undefined) {
      Object.entries(data).forEach(([key, value]) => {
        if (value.inWarehouse) {
          totalIn += value.products.quantity;
        } else {
          totalOut += value.products.quantity;
        }
      });
    }

    setTodayIn(totalIn);
    setTodayOut(totalOut);
  };

  useEffect(() => {
    fetchTransactionDetails();
  }, []);

  return (
    <div className="Right-Top">
      <h3>Stats</h3>
      <div className="RT-Box">
        <ul>
          <li>
            <h4>Space: </h4> 50
          </li>
          <li>
            <h4>Today in: </h4> {todayIn}
          </li>
          <li>
            <h4>Today out: </h4>{todayOut}
          </li>
          <li>
            <h4>Revenue: </h4> 423
          </li>
          <li>
            <h4>Pending: </h4> 32
          </li>
        </ul>
      </div>
    </div>
  );
}

export default RightTop;