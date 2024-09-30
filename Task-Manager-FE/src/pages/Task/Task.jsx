import React, { useState, useEffect } from 'react'
import AxiosService from '../../components/utils/ApiService'
import CreateTask from './CreateTask'
import TaskList from './TaskList'
const Task = () => {

    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
          const response = await AxiosService.get(
            "http://localhost:4000/task/tasks"
          );
          setTasks(response.data.tasks);
        } catch (error) {
          console.error("Error fetching tasks:", error.message);
        }
      };
    
      useEffect(() => {
        fetchTasks();
      }, []);
    

      const refreshTasks = () => {
        fetchTasks();
      };

  return (
    <div className="container ">
    <div className="row">
      <div className="col-md-12">
      {/* <CreateTask refreshTasks={refreshTasks} /> */}

        <TaskList tasks={tasks} />
      </div>
    </div>
  </div>
  )
}

export default Task