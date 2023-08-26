import React, { useState } from 'react';
import "./subscribtion.css";
function Subscribtion() {

    // const [isSelected, setIsSelected] = useState(false); // State to track selection

    // const toggleSelection = () => {
    //   setIsSelected(!isSelected); // Toggle the selected state
    // };
  
    // const divStyle = {
    //   backgroundColor: isSelected ? 'blue' : 'green', // Change background color based on selection
    //   padding: '10px',
    //   color: 'white',
    //   cursor: 'pointer',
    // };

  return (
    <div className="SubscrbtionPlan">
      <div className="top">
        <h2>Choose the right plan for you</h2>
        {/* <div className="radio">
          <p className="off">Annually</p>
          <input type="checkbox" name="price" id="price" />
          <p className="on">Monthly</p>
        </div>
        <br />
        <br /> */}
      </div>
      <div className="container">
      <div className="card2 planName">
        <div className="planhead planName2">
            <p id="monthly">Monthly</p>
            <p id="yearly">Yearly</p>
        </div>
        <div className='trianglegap'></div>
          <ul>
            <li>Monthly Price</li>
            <li>video quality</li>
            <li>Resolution</li>
            <li className="deviceplan">Devices you can use to watch</li>
          </ul>
        </div>
        <div className={`card ${isSelected ? 'selected' : ''}`} onClick={toggleSelection}>
        <div className="planhead">
            Mobile
        </div>
        <div className='triangleclipath'></div>
          <ul>
           <li>₹ 1000</li>
            <li>Better</li>
            <li>1080p</li>
            </ul>
            <ul>
            <li className="deviceplan">Phone</li>
            <li className="deviceplan">Tablet</li>
          </ul>
        </div>
        <div className={`card ${isSelected ? 'selected' : ''}`} onClick={toggleSelection}>
        <div className="planhead">
            Basic
        </div>
        <div className='triangleclipath'></div>
          <ul>
            <li>₹ 2000</li>
            <li>Best</li>
            <li>4k+HDR</li>
            </ul>
            <ul>
            <li className="deviceplan">Phone</li>
            <li className="deviceplan">Tablet</li>
            <li className="deviceplan">Computer</li>
            <li className="deviceplan">TV</li>
          </ul>
        </div>
        <div className={`card ${isSelected ? 'selected' : ''}`} onClick={toggleSelection}>
        <div className="planhead">
            Standard
        </div>
        <div className='triangleclipath'></div>
          <ul>
            <li>₹ 5000</li>
            <li>Better</li>
            <li>1080p</li>
            </ul>
            <ul>
            <li className="deviceplan">Phone</li>
            <li className="deviceplan">Tablet</li>
            <li className="deviceplan">Computer</li>
            <li className="deviceplan"> TV</li>
          </ul>
        </div>
        <div className={`card ${isSelected ? 'selected' : ''}`} onClick={toggleSelection}>
        <div className="planhead">
            Premium
        </div>
        <div className='triangleclipath'></div>
          <ul>
            <li>₹ 7000</li>
            <li>Best</li>
            <li>4k+HDR</li>
            </ul>
            <ul>
            <li className="deviceplan">Phone</li>
            <li className="deviceplan">Tablet</li>
            <li className="deviceplan">Computer</li>
            <li className="deviceplan">TV</li>
          </ul>
        </div>
      </div>
      <div className="NextSubmit">Next</div>
    </div>
  );
}

export default Subscribtion;
