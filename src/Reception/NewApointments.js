import { useRef, useState } from "react";
import APIService, { ApiUrls } from "../API Service/APIService";
import { useSelector } from "react-redux";

export default function NewApointments() {
  const user = useSelector((state) => state.authInfo.value);
  // const patient = useSelector((state) => state.patientInfo.value);
  const [loading, setLoading] = useState(false);
  const [msg, setmsg] = useState("");
  const [status, setstatus] = useState(false);

  const nm = useRef();
  const sex = useRef();
  const phon = useRef();
  const age = useRef();
  const date = useRef();
  const time = useRef();
  const Diagnosis = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ob = {
      name: nm.current.value,
      sex: sex.current.value,
      age: age.current.value,
      phoneNumber: phon.current.value,
      appointmentdate: date.current.value,
      time: time.current.value,
      Diagnosis: Diagnosis.current.value,
    };
    console.log(ob);
    try {
      setLoading(true);
      const response = await APIService.PostApiwithCall(
        ApiUrls.SAVE_APOINTMENT,
        ob,
        user.token
      );
      console.log(response);
      if (response.data.status) {
        setstatus(true);
        setmsg(response.data.msg);
        event.target.reset();
      } else {
        setstatus(false);
        setmsg(response.data.msg);
      }
    } catch (error) {
      setstatus(false);
      console.log("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="contact-section">
        <div className="container">
          <div className="d-none d-sm-block mb-5 pb-4">
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDpfS1oRGreGSBU5HHjMmQ3o5NLw7VdJ6I&amp;callback=initMap"></script>
          </div>
          <div className="row">
            <div className="col-12">
              <h2 className="contact-title">Add New Apointmen</h2>
            </div>
            <div className="col-lg-10">
              <form
                onFocus={() => setmsg("")}
                className="form-contact contact_form"
                onSubmit={handleSubmit}
                id="contactForm"
                noValidate="novalidate"
              >
                <div className="row">
                  <div className="col-12"></div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        className="form-control valid"
                        ref={nm}
                        name="name"
                        id="name"
                        type="text"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Enter your name'"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Select Gender:</label>
                    <select className="form-control " ref={sex} id="gender">
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="phon">Age</label>
                      <input
                        className="form-control"
                        ref={age}
                        name="number"
                        id="age"
                        type="number"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Enter Your Age'"
                        placeholder="Enter Your Age"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="name">Diagnosis</label>
                      <input
                        className="form-control valid"
                        ref={Diagnosis}
                        name="Diagnosis"
                        id="Diagnosis"
                        type="text"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Enter your Diagnosis'"
                        placeholder="Enter your Diagnosis"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="phon">Phon Number</label>
                      <input
                        className="form-control"
                        ref={phon}
                        name="number"
                        id="phon"
                        type="text"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Enter phon number'"
                        placeholder="Enter phon number"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="email">Apointment Date</label>
                      <input
                        className="form-control valid"
                        ref={date}
                        name="date"
                        id="date"
                        type="date"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Enter date'"
                        placeholder="Date"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="email">Time</label>
                      <input
                        className="form-control valid"
                        ref={time}
                        name="time"
                        id="time"
                        type="time"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <button
                    type="submit"
                    className="button button-contactForm boxed-btn"
                  >
                    {loading ? "Saving" : "Saved"}
                  </button>
                </div>
                <h1>{msg}</h1>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
