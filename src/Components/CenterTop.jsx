import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import { doc, getDoc, Timestamp, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../Firebase/config";
import './css/Center.css';

function CenterTop() {
  const [inData, setInData] = useState([0,0,0,0,0,0,0])
  const [outData, setOutData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    var tempDates = []
    // get the date of the last 7 days
    for (var i = 0; i < 7; i++) {
      // code to get the date of previous days
      var date = new Date();
      date.setDate(date.getDate() - i);
      var dd = date.getDate();
      var mm = date.getMonth() + 1;
      var yy = date.getFullYear();
      //remove the first 2 digits of the year
      yy = yy.toString().substr(-2);
      var dateString = dd + "-" + mm + "-" + yy;
      tempDates.push(dateString);
    }
    setDates(tempDates);
    fetchTransactionDetails(tempDates);
  }, []);

  const fetchTransactionDetails = async (dates) => {
    let tempInData = [...inData];
    let tempOutData = [...outData];
    for (let i = 0; i < dates.length; i++) {
      const documentRef = doc(db, "transaction", dates[i]);
      const docSnap = await getDoc(documentRef);
      const data = docSnap.data();
  
      if (data != undefined) {
        Object.entries(data).forEach(([key, value]) => {
          if (value.inWarehouse) {
            tempInData[i]++;
          } else {    
            tempOutData[i]++;
          }
        });
      }
    }
    setInData(tempInData);
    setOutData(tempOutData);
  };

  const state = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: dates
      }
    },
    series: [
      {
        name: "Goods In",
        data: inData
      },
      {
        name: "Goods Out",
        data: outData
      }
    ]
  }

  return (
    <div className="graph-main-cont">
      <h1>Graph</h1>
      <div className="graph-sub-cont">
        <Chart className="chartdiag"
          options={state.options}
          series={state.series}
          type="bar"
          // width="500"
        />
      </div>
    </div>
  );
}

export default CenterTop;