import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PlanDetails.css";
import { useNavigate } from "react-router-dom";
function PlanDetail() {
  const navigate = useNavigate();
  const [planState, setplanState] = useState("Active");
  const [userdata, setUserdata] = useState({});
  const [currPlan, setcurrPlan] = useState({});

  const statestyle = {
    backgroundColor: planState == "Active" ? "" : "#fbefef",
    color: planState == "Active" ? "" : "#e47773",
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = JSON.parse(localStorage.getItem("userInfo"))._id;
        const response = await fetch(
          `http://localhost:5000/api/user/getuser/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserdata(data.data);
          fetchCurrPlan(); // Fetch currPlan after successfully fetching userdata
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    const fetchCurrPlan = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/currplan/subscription/${userdata.planId}`
        );
        if (response.ok) {
          const data = await response.json();
          setcurrPlan(data);
        } else {
          // Handle error (e.g., show error message)
        }
      } catch (error) {
        console.error(error);
        // Handle error (e.g., show error message)
      }
    };

    if (!localStorage.getItem("userInfo")) {
      navigate("/login");
    } else {
      fetchUser();
    }
  }, [navigate, userdata.planId]);

  return (
    <div className="plans">
      <div className="plancard">
        <div className="planState">
          <div className="planState2">
            <span>Current Plan Details</span>
            <span className="stateDetail" style={statestyle}>
              {planState}
            </span>
          </div>
          <div className="cancelbtn" onClick={() => setplanState("Cancelled")}>
            <p>{planState == "Active" ? "Cancel" : ""}</p>
          </div>
        </div>
        <div className="plan">{currPlan.subscriptionName}</div>
        <div className="planDevice">{currPlan.subscriptionDevices}</div>
        <div className="planBudget">{`₹${currPlan.subscriptionPrice}/${currPlan.subscriptionType}`}</div>
        <Link to="/">
          <div className="planChange">Change plan</div>
        </Link>
        <div className="planStatement">
          Your Subscribtion has started on Aug 25,2023 and will auto renew on
          aug 25 ,2024
        </div>
      </div>
    </div>
  );
}

export default PlanDetail;
