import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import APIService, { ApiUrls } from "../API Service/APIService";
import { listPatientReducer } from "../Redux/Patientslice";
import { useNavigate } from "react-router-dom";

export default function Apointments() {
  const user = useSelector((state) => state.authInfo.value);
  const patient = useSelector((state) => state.patientInfo.value);
  const filterePatient = patient.filter((o) => o.doctor_name == user.id);
  console.log(user.id);
  const [msg, setmsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setstatus] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const patientList = async () => {
    try {
      setLoading(true);
      const response = await APIService.GetApiwithCall(
        ApiUrls.APOINTMENT,
        user.token
      );
      console.log("User List response", response);
      if (response.data.status) {
        setmsg(response.data.data.msg);
        dispatch(listPatientReducer(response.data.data));
      }
    } catch (error) {
      setstatus(false);
      setmsg("Network Issue");
    } finally {
      setLoading(false);
    }
  };

  const Pending = async (id) => {
    try {
      setLoading(true);
      const URL = ApiUrls.PENDING + id;
      const response = await APIService.UpApiCall(URL, null, user.token);

      if (response.data.status) {
        setstatus(true);
        setmsg(response.data.msg);
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

  const Complete = async (id) => {
    try {
      setLoading(true);
      const URL = ApiUrls.COMPLETE + id;
      const response = await APIService.UpApiCall(URL, null, user.token);

      if (response.data.status) {
        setstatus(true);
        setmsg(response.data.msg);
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
  // SearchBox
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredPatients = patient.filter(
      (o) =>
        o.doctor_name === user.id && o.name.toLowerCase().includes(searchTerm)
    );
    console.log("Filtered Patients:", filteredPatients);
    setFilteredPatients(filteredPatients);
  };
  useEffect(() => {
    patientList();
    setFilteredPatients(filteredPatients);
  }, [user.id]);

  return (
    <>
      <section className="contact-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="contact-title">Appointments Details</h2>
            </div>
            <div className="col lg-12 col md-12">
              <div className="col lg-12 col md-12">
                <input
                  type="text"
                  placeholder="Search by patient name or phone number"
                  value={searchTerm}
                  onChange={handleSearch}
                  style={{ float: "right", paddingRight: "50px" }}
                />
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border">
                      <span className="visually-hidden">
                        <h3>Loading...</h3>
                      </span>
                    </div>
                  </div>
                ) : (
                  <table className="table  table-hover table-responsive table-responsive-lg table-striped">
                    <thead>
                      <th>S.No</th>
                      <th>recp. Address</th>
                      <th>recp.no. </th>
                      <th>Patient </th>
                      <th>Phone no.</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Diagnosis</th>
                      <th>Apt Date</th>
                      <th>Time</th>
                      <th>Medication</th>
                    </thead>
                    <tbody>
                      {filteredPatients?.map((obj, index) => (
                        <tr style={{ fontSize: "14px" }}>
                          <td>{index + 1}</td>
                          <td>
                            {obj.address.name}, &nbsp; {obj.address?.raddress}
                          </td>
                          <td>{obj.address?.phoneNumber}</td>
                          <td>{obj.name}</td>
                          <td>{obj.phoneNumber}</td>
                          <td>{obj.age}</td>
                          <td>{obj.sex}</td>
                          <td>{obj.daignosis}</td>
                          <td>{obj.appointmentdate}</td>
                          <td>{obj.time}</td>
                          <td>
                            {obj.activeStatus ? (
                              <button
                                className="btn btn-danger btn-sm"
                                style={{
                                  backgroundColor: "red",
                                  width: "130px",
                                }}
                                onClick={() => Pending(obj.id)}
                              >
                                Pending
                              </button>
                            ) : (
                              <button
                                className="btn btn-danger btn-sm"
                                style={{
                                  backgroundColor: "green",
                                  width: "130px",
                                }}
                                onClick={() => Complete(obj.id)}
                              >
                                Complete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
