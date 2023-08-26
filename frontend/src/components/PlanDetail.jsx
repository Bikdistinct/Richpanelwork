import React, { useState } from 'react'
import { Link } from "react-router-dom";
import './PlanDetails.css';
function PlanDetail() {
  const [planState,setplanState]=useState("Active");
  
  const statestyle={
    backgroundColor:planState=="Active"?"":"#fbefef",
    color:planState=="Active"?"":"#e47773"
  }
  return (
    <div className='plans'>
        <div className='plancard'>
            <div className='planState'>
                <div className='planState2'>
                    <span>Current Plan Details</span>
                    <span className='stateDetail' style={statestyle}>{planState}</span>
                </div>
                <div  onClick={()=>setplanState("Cancelled")}><p>{planState=="Active"?'Cancel':""}</p></div>
            </div>
            <div className='plan'>Basic</div>
            <div className='planDevice'>Mobile</div>
            <div className='planBudget'>₹ 2000/yr</div>
           <Link to="/"><div className='planChange'>Change plan</div></Link>
            <div className='planStatement'>Your Subscribtion has started on Aug 25,2023 and will auto renew on aug 25 ,2024</div>
        </div>
    </div>
  )
}

export default PlanDetail