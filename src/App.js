import { Routes, Route } from "react-router-dom";

import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import About from "./Components/About";
import Service from "./Components/Service";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Newclinic from "./Doctor/Newclinic";
import Allclinics from "./Doctor/Allclinics";
import Apointments from "./Doctor/Apointments";
import { useSelector } from "react-redux";
import Update from "./Doctor/Update";
import NewApointments from "./Reception/NewApointments";
import AllApointments from "./Reception/AllApointments";
import UpdateApointments from "./Reception/UpdateApointments";

function App() {
  const user = useSelector((state) => state.authInfo.value);

  return (
    <>
      <Nav />

      <Routes>
        {user.isLogin ? (
          <>
            {user.type == "doctor" ? (
              <>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/" element={<Home />}></Route>

                <Route path="/newClinic" element={<Newclinic />}></Route>
                <Route path="/allClinics" element={<Allclinics />}></Route>
                <Route path="/apointmens" element={<Apointments />}></Route>
                <Route path="/update" element={<Update />}></Route>
              </>
            ) : (
              <></>
            )}
            {user.type == "reception" ? (
              <>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/" element={<Home />}></Route>

                <Route
                  path="/newapointmens"
                  element={<NewApointments />}
                ></Route>
                <Route
                  path="/allapointmens"
                  element={<AllApointments />}
                ></Route>
                <Route
                  path="/updateapointments"
                  element={<UpdateApointments />}
                ></Route>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/service" element={<Service />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </>
        )}
      </Routes>

      <Footer />
    </>
  );
}

export default App;
