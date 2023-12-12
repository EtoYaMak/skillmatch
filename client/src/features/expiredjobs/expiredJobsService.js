import axios from "axios";

const API_URL = "/api/expiredJobs/";

const getExpiredJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const expiredJobsService = {
  getExpiredJobs,
  // other services like deleteExpiredJob, restoreExpiredJob, etc.
};

export default expiredJobsService;
