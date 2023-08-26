import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import "./subscribtion.css";
// import Plan from "../../plan";
import Card from "./plancard";
import { useNavigate } from "react-router-dom";
function Subscribtion() {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({});
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(null);
  const [selectedPlanPrice,setSelectedPlanPrice]=useState(null);
  const [selectedPlanId,setSelectedPlanId]=useState("");
  const handleCardClick = (index,price,planId) => {
    setSelectedPlanIndex(index);
    setSelectedPlanPrice(price);
    setSelectedPlanId(planId);
  };
  const [plans, setPlans] = useState([]);
  const [selectedSection, setSelectedSection] = useState('monthly'); // Default to monthly

  useEffect(() => {
    // Fetch plans from your backend API based on the selected section
    axios.get(`http://localhost:5000/api/plan/${selectedSection}`)
      .then(response => {
        setPlans(response.data);
      })
      .catch(error => {
        console.error('Error fetching plans:', error);
      });
  }, [selectedSection]); // Re-fetch plans when selectedSection changes

  //get user login data
  let id = JSON.parse(localStorage.getItem("userInfo"));
  // const fetchdata = async () => {
  //   let id = JSON.parse(localStorage.getItem("userInfo"));
  //   const ress = await axios.get(
  //     `http://localhost:3000/api/user/getuser/${id._id}`
  //   );
  //   // const ress=await axios.get(`/api/user/getuser/${id}`);
  //   const d = ress.data;
  //   setUserdata(d.data);
  // };

  const checkout = (plan) => {
    if (selectedPlanPrice > 0) {
      fetch(
        "http://localhost:5000/api/v1/create-subscription-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({ plan: selectedPlanPrice, customerId: id._id }),
        }
      )
        .then((res) => {
          if (res.ok) return res.json();
          console.log(res);
          return res.json().then((json) => Promise.reject(json));
        })
        .then(({ session }) => {
          window.location = session.url;
        })
        .catch((e) => {
          console.log(e.error);
        });
    }
  }

 
    const createSession = async (priceId) => {
      if (!id) {
        // User is not logged in, navigate to login page
        navigate('/login'); // Replace '/login' with your actual login route
        return;
      }
        const { data: response } = await axios.post(
            "http://localhost:5000/api/subs/session",
            {
                priceId,
            }
        );

        window.location.href = response.url;
    }
  
  return (
    <div className="SubscrbtionPlan">
      <div className="top">
        <h2>Choose the right plan for you</h2>
      </div>
      <div className="container">
      <div className="card2 planName">
        <div className="planhead planName2">
            <p id={selectedSection=='monthly' ? 'planSubs' : ''} onClick={() => setSelectedSection('monthly')}>Monthly</p>
            <p id={selectedSection=='yearly' ? 'planSubs' : ''} onClick={() => setSelectedSection('yearly')}>Yearly</p>
        </div>
        <div className='trianglegap'></div>
          <ul>
            <li>Monthly Price</li>
            <li>video quality</li>
            <li>Resolution</li>
            <li className="deviceplan">Devices you can use to watch</li>
          </ul>
        </div>
        {plans.map((plans,index)=>(
            <Card
            key={index}
            // index={index}
            isSelected={selectedPlanIndex === index}
            onClick={() => handleCardClick(index,plans.Price,plans.planId)}
            name={plans.name}
            Price={plans.Price}
            VideoQuality={plans.VideoQuality}
            Resolution={plans.Resolution}
            Devices={plans.Devices}
            />
        ))}

      </div>
      <div className="NextSubmit"  onClick={() => createSession(selectedPlanId)}>Next</div>
    </div>
  );
}

export default Subscribtion;
