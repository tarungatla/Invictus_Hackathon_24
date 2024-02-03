import React, { useEffect } from "react";
import "./css/Receipt.css";
import { useLocation,useNavigate } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

function Receipt() {
  const navigate=useNavigate();
  const location = useLocation();
  // const history = createBrowserHistory();
  const formData = location.state?.formData || {};
  const { clientName, dateValue, quantity, price, product, transId } = formData;

  useEffect(() => {
    // Trigger the print function after the component has been rendered
    window.print();

    // Set up an event listener for the afterprint event
    const handleAfterPrint = () => {
      // Remove the event listener to avoid multiple executions
      window.removeEventListener('afterprint', handleAfterPrint);

      navigate('/Stockout')
      // Navigate back to the previous page
      // history.goBack();
    };

    window.addEventListener('afterprint', handleAfterPrint);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [history]);


 
  return (
    <div className="Receipt">
      <style>
        {`
          @media print {
            body {
              font-size: 12px;
            }
            .Receipt {
              padding: 10px;
              border: 1px solid #ddd;
              width: 100%;
            }
          }
        `}
      </style>

      <header>
        <h1>INVOICE </h1>
        <div id="company" className="clearfix">
          <div>WareHouse Solution Innovators</div>
          <div>
            455 Foggy Heights,
            <br /> AZ 85004, Mumbai
          </div>
          <div>(+91) 519-0450</div>
          <div>
            <a href="mailto:darshan.teamv2v@gmail.com">darshan.teamv2v@gmail.com</a>
          </div>
        </div>
        <div id="project">
          <div>
            <span>CLIENT</span> {clientName}
          </div>
          <div>
            <span>EMAIL</span>{" "}
            <a href="mailto:john@example.com">john@example.com</a>
          </div>
          <div>
            <span>DATE</span> {dateValue}
          </div>
        </div>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th className="service">Product</th>
              <th className="desc">Product info</th>
              <th>PRICE</th>
              <th>QTY</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="service">{product}</td>
              <td className="desc">
                dfkjb fdsiu ibuef biufs biuefn bfew befw
              </td>
              <td className="unit">Rs{price}</td>
              <td className="qty">{quantity}</td>
              <td className="total">Rs{transId}</td>
            </tr>
            <tr>
              <td className="service">rolls royce</td>
              <td className="desc">
                Dfj fewbiu biufew biuw buw wb buo vdsni dsnewdfs knoew fd
              </td>
              <td className="unit">Rs40.00</td>
              <td className="qty">80</td>
              <td className="total">Rs3,200.00</td>
            </tr>
            <tr>
              <td className="service">bmw</td>
              <td className="desc">dfsk jnewnefwf fibuwef ibuew wbuiefw ewb efwo</td>
              <td className="unit">Rs40.00</td>
              <td className="qty">20</td>
              <td className="total">Rs800.00</td>
            </tr>
            <tr>
              <td className="service">ferrari</td>
              <td className="desc">
                fewig biuefw nb9uew njefwbu9efwefwbiuefwefbuefwkj ef n kn 
              </td>
              <td className="unit">Rs40.00</td>
              <td className="qty">4</td>
              <td className="total">Rs160.00</td>
            </tr>
            <tr>
              <td colSpan="4">SUBTOTAL</td>
              <td className="total">Rs5,200.00</td>
            </tr>
            <tr>
              <td colSpan="4">TAX 25%</td>
              <td className="total">Rs1,300.00</td>
            </tr>
            <tr>
              <td colSpan="4" className="grand total">
                GRAND TOTAL
              </td>
              <td className="grand total">Rs6,500.00</td>
            </tr>
          </tbody>
        </table>
        <div id="notices">
          <div>NOTICE:</div>
          <div className="notice">
            A finance charge of 1.5% will be made on unpaid balances after 30
            days.
          </div>
        </div>
      </main>
    </div>
  );
}

export default Receipt;
