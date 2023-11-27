import axios from "axios";

const API_URL = "/api/jobs/";
const API_ID = "/api/jobs";
const ALL_API_URL = "/api/jobs/all";

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
// Create new job
const SAcreateJob = async (formData, token) => {
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
const getAllJobsTwo = async () => {
  try {
    const response = await axios.get(ALL_API_URL);
    return response.data;
  } catch (err) {
    throw err;
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
// Fetch My Jobs #PRIVATE
const SAgetMyJobs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Update job
export const updateJob = async (jobId, UpdatedFormData, token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data", // if you're sending form data
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}${jobId}`,
    UpdatedFormData,
    config
  );
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
// Delete my Job #PRIVATE
const SAdeleteJob = async (jobId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + jobId, config);

  return response.data;
};

//
//
// Apply to a job
const applyToJob = async (jobId, studentId) => {
  const requestData = { jobId, studentId };
  const response = await axios.post(`${API_URL}apply`, requestData);
  return response.data;
};

// Update application status
const updateApplicationStatus = async (jobId, studentId, newStatus) => {
  const requestData = { jobId, studentId, newStatus };
  const response = await axios.put(
    `${API_URL}updateApplicationStatus/${jobId}/${studentId}`,
    requestData
  );
  return response.data;
};
//

//
const jobService = {
  createJob,
  SAcreateJob,
  getJobById,
  getMyJobs,
  SAgetMyJobs,
  getAllJobs,
  updateJob,
  deleteJob,
  SAdeleteJob,
  applyToJob,
  updateApplicationStatus,
  getAllJobsTwo,
};

export default jobService;
