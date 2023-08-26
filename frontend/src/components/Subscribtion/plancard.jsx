import React, { useState } from 'react';
import "./subscribtion.css";
function Plancard(props) {
    // const [isSelected, setIsSelected] = useState(false); // State to track selection

    // const toggleSelection = () => {
    //   setIsSelected(!isSelected); // Toggle the selected state
    // };
  return (
    <div className={`card ${props.isSelected ? 'selected' : ''}`} onClick={props.onClick}>
    <div className="planhead">
        {props.name}
    </div>
    <div className={`${props.isSelected ? 'triangleclipath' : 'trianglegap'}`}></div>
      <ul>
       <li>₹ {props.Price}</li>
        <li>{props.VideoQuality}</li>
        <li>{props.Resolution}</li>
        </ul>
        <ul>
            {props.Devices.map((device, index) => (
              <li className="deviceplan" key={index}>{device}</li>
            ))}
          </ul>
    </div>
  )
}

export default Plancard;