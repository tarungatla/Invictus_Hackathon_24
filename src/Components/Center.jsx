import React, { useEffect, useState } from "react";
import CenterTop from "./CenterTop.jsx";
import "./css/Center.css";
import Right from "./Right.jsx";
import OrderCard from "./CenterBottom.jsx";
import order from "./OrderData.js";
import "./css/Center.css";
import settings from "../data.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/config";

function Center() {
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

    console.log(data);
    let totalIn = 0;
    let totalOut = 0;

    if (data != undefined) {
      Object.entries(data).forEach(([key, value]) => {
        if (value.inWarehouse) {
          console.log(value.products);
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
  //     const [trig,settrig]=useState(false);
  //   useEffect(() => {

  //     rerender();
  //   }, [trigger]);
  // function rerender(){
  //     if(settings.trans=true){
  //     settrig(true)}
  // }
  return (
    <div className="main-Center-cont">
      <div className="graph-container">
        <CenterTop />
        {/* <Right /> */}
      </div>
      <div className="dashboardContainer">
        <div className="Right-Top">
          <h3>Dashboard</h3>
          <div className="RT-Box">
            <ul>
              <li>
                <h4>Today in: </h4>27
              </li>
              <li>
                <h4>Today out: </h4>16
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
      </div>
      {/* <History /> */}
    </div>
  );
}

export default Center;
