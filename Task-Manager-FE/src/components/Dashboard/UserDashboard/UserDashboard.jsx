import React,{useState,useEffect} from 'react'
import AxiosService from "../../utils/ApiService";
import UserTaskDashboard from "./UserTaskDashboard";
// import UserDataChart from "./UserDataChart";
import Spinner from "../../Spiner/Spiner";

import styles from '../AdminDashboard/Dasboard.module.css'
const UserDashboard = () => {

    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch user data
            const userResponse = await AxiosService.get(
              "http://localhost:4000/use/getdata"
            );
            setUserData(userResponse.data);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
      if (loading) {
        return <Spinner />;
      }

  return (
    <div
      className={`container-fluid ${styles.dashboard}`}
      style={{ overflowY: "auto", maxHeight: "calc(100vh )" }}
    >
 {/* <div className="col-xl-6 ">
          <div className={`card mb-4 bg-transparent ${styles.Donuts}`}>
            <div className="card-header">
             
            </div>
            <div className={`card-body ${styles.Donuts}`}>
              <UserDataChart />
            </div>
          </div>
        </div> */}

 <div className="row">
        <div className="col-xl-6">
          <div
            className={`card mb-4 bg-transparent text-white ${styles.chartCard}`}
          >
            <div className="card-header">
              <i className="fas fa-chart-area me-1"></i>
              Task Progress Bar
            </div>
            <div className="card-body ">
              {/* Add your chart component here with the corresponding data */}
              <UserTaskDashboard/>
            </div>
          </div>
        </div>

    </div>
    </div>
  )
}

export default UserDashboard


