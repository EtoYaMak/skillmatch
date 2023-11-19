import axios from "axios";

/* const API_URL = "http://18.169.159.127/api/jobs/";
const API_ID = "http://18.169.159.127/api/jobs";
const ALL_API_URL = "http://18.169.159.127/api/jobs/all"; */
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

// Update job #PRIVATE
const updateJob = async (jobId, formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // Do not set Content-Type for multipart/form-data; it will be automatically set
    },
  };

  // Create a new FormData object and append each form field to it
  const formDataObj = new FormData();
  formDataObj.append("position", formData.position);
  formDataObj.append("city", formData.city);
  formDataObj.append("country", formData.country);
  formDataObj.append("location", formData.location);
  formDataObj.append("careerPage", formData.careerPage);
  formDataObj.append("company", formData.company);
  formDataObj.append("website", formData.website);
  formDataObj.append("description", formData.description);
  formDataObj.append("skills", formData.skills.join(",")); // If skills is an array, join them with commas
  formDataObj.append("fulltime", formData.fulltime);
  formDataObj.append("parttime", formData.parttime);
  formDataObj.append("internship", formData.internship);
  formDataObj.append("contract", formData.contract);
  formDataObj.append("remote", formData.remote);
  formDataObj.append("hybrid", formData.hybrid);
  formDataObj.append("onsite", formData.onsite);

  // Append the logo file if available
  if (formData.logo) {
    formDataObj.append("logo", formData.logo);
  }

  const response = await axios.put(`${API_URL}${jobId}`, formDataObj, config);
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
