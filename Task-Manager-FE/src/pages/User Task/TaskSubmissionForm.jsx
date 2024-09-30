import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AxiosService from '../../components/utils/ApiService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinners from '../../components/utils/Spinners';

const TaskSubmissionForm = () => {
  const navigate = useNavigate();
  let { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [work, setWork] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [workError, setWorkError] = useState('');
  const [productUrlError, setProductUrlError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const fetchTask = async () => {
    try {
      const response = await AxiosService.get(
        `http://localhost:4000/task/taskID/${taskId}`
      );
      setTask(response.data);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!work) {
      setWorkError('Work is required');
      isValid = false;
    } else {
      setWorkError('');
    }

    if (!productUrl) {
      setProductUrlError('Product URL is required');
      isValid = false;
    } else {
      setProductUrlError('');
    }

    return isValid;
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      setLoading(true);
      setTimer(0); // Reset the timer

      const response = await AxiosService.put(
        `http://localhost:4000/task/submit/${taskId}`,
        {
          work,
          productUrl,
        }
      );

      if (response && response.data) {
        toast.success(response.data.message);
        navigate('/userTask');
        fetchTask();
        console.log('Task submitted successfully');
      } else {
        console.error('Invalid response:', response);
        toast.error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error submitting task:', error);

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();

    // Start the timer when the component mounts
    const timerId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timerId);
  }, [taskId]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-sm-6">
          <div className="bg-light p-4 rounded">
            <h1 className="mb-5 text-center">Submit Task</h1>
            <div className="mb-5">
              <strong>Task Title: {task.title}</strong>
            </div>
            <div className="mb-5">
              <strong>Description: {task.description}</strong>
            </div>
            {/* Task Submission Form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="needs-validation"
            >
              <div className="mb-5">
  <label htmlFor="work" className="form-label">
    Work
  </label>
  <textarea
    className={`form-control ${workError ? 'is-invalid' : ''}`}
    id="work"
    value={work}
    onChange={(e) => setWork(e.target.value)}
    required
  />
  {workError && <div className="invalid-feedback">{workError}</div>}
</div>

              <div className="mb-5">
                <label htmlFor="productdUrl" className="form-label">
                  Product URL
                </label>
                <input
                  type="text"
                  className={`form-control ${productUrlError ? 'is-invalid' : ''}`}
                  id="backendUrl"
                  value={productUrl}
                  onChange={(e) => setProductUrl(e.target.value)}
                  required
                />
                {productUrlError && (
                  <div className="invalid-feedback">{productUrlError}</div>
                )}
              </div>

              <div className="container mt-4">
                {/* ... (rest of your code) */}
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? <Spinners /> : 'Submit Task'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSubmissionForm;
