import React from 'react'
import styles from './Dasboard.module.css'
// import Spiner from '../../Spiner/Spiner'

import CircleProgressBar from './CircleProgressBar';
import TaskDashboard from './TaskDashboard'
import { Link } from "react-router-dom";


function Dashboard() {
    // const [loading, setLoading] = useState(true);
    // if (loading) {
    //     return <Spiner />;
    //   }
    
  return  (
    
    <div
      className={`container-fluid ${styles.dashboard}`}
      style={{ overflowY: "auto", maxHeight: "calc(100vh )" }}
    >
      {/* Charts */}
      <div className="row">
        <div style={{margin:"150px"}} className="col-xl-6">
          <div className={`card mb-4  ${styles.chartCard}`}>
            <div className="card-header">
              <i className="fas fa-chart-area me-1"></i>
              Task Progress Bar
            </div>
            <div className="card-body ">
              {/* Add your chart component here with the corresponding data */}
              <TaskDashboard />
            </div>
          </div>
        </div>
      </div>
     
      

      

    </div>
 
  );
}

export default Dashboard
