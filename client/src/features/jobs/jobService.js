import axios from "axios";

const API_URL = "http://13.53.103.94/api/jobs/";
const API_ID = "http://13.53.103.94/api/jobs";
const ALL_API_URL = "http://13.53.103.94/api/jobs/all";

// Create new job
const createJob = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.post(API_URL, formData, config);
  return response.data;
};

// Fetch job by ID #PUBLIC
const getJobById = async (jobId) => {
  try {
    const response = await axios.get(`${API_ID}/${jobId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch ALL JOBS #PUBLIC
const getAllJobs = async () => {
  try {
    const response = await axios.get(ALL_API_URL);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Fetch My Jobs #PRIVATE
const getMyJobs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};
// Update job #PRIVATE
const updateJob = async (jobId, jobData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + jobId, jobData, config);

  return response.data;
};
// Delete my Job #PRIVATE
const deleteJob = async (jobId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + jobId, config);

  return response.data;
};

const jobService = {
  createJob,
  getJobById,
  getMyJobs,
  getAllJobs,
  updateJob,
  deleteJob,
};

export default jobService;
