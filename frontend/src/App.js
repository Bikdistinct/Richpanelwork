import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PlanDetail from "./components/PlanDetail";
import Subs from "./components/Subscribtion/subs";
// import SubscribtionPlan from "./components/Subscribtion/subscribtion";
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/" element={<Subs />} />
        <Route path="/currentplan" element={<PlanDetail/>} />
      </Routes>
      </Router>
      {/* <Login/> */}
      {/* <PlanDetail/> */}
      {/* <SubscribtionPlan/> */}
      {/* <Subs /> */}
    </div>
  );
}

export default App;

// import React from 'react';

// const contacts = [
//   {
//     name: "Beyonce",
//     imgURL: "https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg",
//     phone: "+123 456 789",
//     email: "b@beyonce.com",
//     device: ["mobile", "tv"]
//   },
//   {
//     name: "Jack Bauer",
//     imgURL: "https://pbs.twimg.com/profile_images/625247595825246208/X3XLea04_400x400.jpg",
//     phone: "+987 654 321",
//     email: "jack@nowhere.com"
//   },
//   {
//     name: "Chuck Norris",
//     imgURL: "https://i.pinimg.com/originals/e3/94/47/e39447de921955826b1e498ccf9a39af.png",
//     phone: "+918 372 574",
//     email: "gmail@chucknorris.com"
//   }
// ];

// const App = () => {
//   return (
//     <div className="contact-list">
//       {contacts.map((contact, index) => (
//         <div key={index} className="contact-card">
//           <img src={contact.imgURL} alt={contact.name} />
//           <h2>{contact.name}</h2>
//           <p>Phone: {contact.phone}</p>
//           <p>Email: {contact.email}</p>
//           {contact.device && (
//             <ul>
//               Device: {contact.device.map((device, deviceIndex) => (
//                 <li key={deviceIndex} className="device-tag">
//                   {device}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default App;
