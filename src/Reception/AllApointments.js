import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import APIService, { ApiUrls } from "../API Service/APIService";
import {
  deletePatientcReducer,
  listPatientReducer,
  updatePatientReducer,
} from "../Redux/Patientslice";
import { useNavigate } from "react-router-dom";

export default function AllApointments() {
  const user = useSelector((state) => state.authInfo.value);
  const patient = useSelector((state) => state.patientInfo.value);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patientList = async () => {
    try {
      setLoading(true);
      const response = await APIService.GetApiwithCall(
        ApiUrls.PATIENT_LIST,
        user.token
      );
      console.log("User List response", response);
      if (response.data.status) {
        setMsg(response.data.data.msg);
        dispatch(listPatientReducer(response.data.data));
      } else {
        setStatus(false);
        setMsg(response.data.msg);
      }
    } catch (error) {
      setStatus(false);
      setMsg("Network Issue");
    } finally {
      setLoading(false);
    }
  };
  const Deletepatient = async (id) => {
    const confirmation = window.confirm(
      "Are you sure want to remove this Clinic?"
    );
    if (confirmation) {
      try {
        const URL = ApiUrls.PATIENT_DELETE + id;
        const response = await APIService.DelApiCall(URL, user.token);
        console.log(response);
        if (response.data.status) {
          setMsg(response.data.msg);
          const nlist = clinics.filter(
            (obj) => obj.id !== response.data.data.id
          );
          dispatch(deletePatientcReducer(nlist));
        } else {
          setMsg(response.data.msg);
        }
      } catch (error) {
        setMsg("Some Network Issue" + error);
      }
    } else {
      setMsg("Data can't be deleted");
    }
  };
  const Updatepatient = (obj) => {
    dispatch(updatePatientReducer(obj));
    navigate("/updateapointments");
  };
  //Search box
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchButtonClick = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filteredPatients = patient.filter((obj) =>
      obj.name.toLowerCase().includes(lowercasedSearchTerm)
    );
    console.log(filteredPatients);
    setFilteredPatients(filteredPatients);
  };

  useEffect(() => {
    patientList();
  }, []);

  return (
    <>
      <section className="contact-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="contact-title">Appointment Details</h2>
            </div>
            <div className="col lg-12">
              <input
                type="text"
                placeholder="Search by patient name or phone number"
                value={searchTerm}
                onChange={handleSearch}
              />{" "}
              &nbsp;&nbsp;
              <button
                onClick={handleSearchButtonClick}
                style={{
                  backgroundColor: "green",
                  height: "30px",
                  widows: "30px",
                }}
              >
                Search
              </button>
              <div className="col lg-12">
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border">
                      <span className="visually-hidden">
                        <h3>Loading...</h3>
                      </span>
                    </div>
                  </div>
                ) : (
                  <table className="table   table-hover table-responsive table-responsive-lg table-striped ">
                    <thead>
                      <th>S.No</th>
                      <th>Patient Name</th>
                      <th>Phone Number</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Diagnosis</th>
                      <th>Apointment Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Action</th>
                    </thead>
                    <tbody>
                      {filteredPatients?.map((obj, index) => (
                        <tr style={{ fontSize: "14px" }}>
                          <td>{index + 1}</td>
                          <td>{obj.name}</td>
                          <td>{obj.phoneNumber}</td>
                          <td>{obj.age}</td>
                          <td>{obj.sex}</td>
                          <td>{obj.daignosis}</td>
                          <td>{obj.appointmentdate}</td>
                          <td>{obj.time}</td>
                          <td>{obj.activeStatus ? "Active" : "DeActive"}</td>
                          <td>
                            <button
                              className="btn btn-sucess"
                              onClick={() => Updatepatient(obj)}
                              style={{
                                backgroundColor: "green",
                                height: "50px",
                                widows: "50px",
                              }}
                            >
                              Update
                            </button>
                            &nbsp;&nbsp;
                            <button
                              className="btn btn-danger"
                              onClick={() => Deletepatient(obj.id)}
                              style={{
                                backgroundColor: "red",
                                height: "50px",
                                widows: "50px",
                              }}
                            >
                              Delete
                            </button>
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
