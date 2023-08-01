import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobId, updateJob } from "../features/jobs/jobSlice";

function JobUpdatePage() {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const job = jobs.find((job) => job._id === jobId);

  // Create a separate state to store the form data
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Dispatch the getJobId action when the component mounts
    dispatch(getJobId(jobId));
  }, [dispatch, jobId]);

  // Update the form data when the job data changes
  useEffect(() => {
    if (job) {
      setFormData({ ...job });
    }
  }, [job]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the updateJob action with the updated form data
    console.log(jobId + "Before Dispatch updateJob");
    dispatch(updateJob(jobId, formData));
    console.log(jobId + " After Dispatch updateJob");
  };

  return (
    <div>
      {job ? (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="jobId" className="text-white">
            Current Job
          </label>
          <input type="text" name="jobId" value={jobId} disabled />
          <label htmlFor="position" className="text-white">
            Position
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
          />

          <label htmlFor="city" className="text-white">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />

          <label htmlFor="country" className="text-white">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          />

          <label htmlFor="location" className="text-white">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />

          <label htmlFor="careerPage" className="text-white">
            Career Page
          </label>
          <input
            type="text"
            name="careerPage"
            value={formData.careerPage}
            onChange={handleInputChange}
          />

          <label htmlFor="company" className="text-white">
            Company
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
          />

          <label htmlFor="website" className="text-white">
            Website
          </label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
          />

          <label htmlFor="description" className="text-white">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />

          <label htmlFor="skills" className="text-white">
            Skills
          </label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
          />

          <div className="text-white space-x-4">
            <label className="text-white">
              <input
                type="checkbox"
                name="fulltime"
                checked={formData.fulltime}
                onChange={handleInputChange}
              />
              Full-time
            </label>
            <label>
              <input
                type="checkbox"
                name="parttime"
                checked={formData.parttime}
                onChange={handleInputChange}
              />
              Part-time
            </label>
            <label>
              <input
                type="checkbox"
                name="internship"
                checked={formData.internship}
                onChange={handleInputChange}
              />
              Internship
            </label>
            <label>
              <input
                type="checkbox"
                name="contract"
                checked={formData.contract}
                onChange={handleInputChange}
              />
              Contract
            </label>
          </div>

          <div className="text-white space-x-4">
            <label>
              <input
                type="checkbox"
                name="remote"
                checked={formData.remote}
                onChange={handleInputChange}
              />
              Remote
            </label>
            <label>
              <input
                type="checkbox"
                name="hybrid"
                checked={formData.hybrid}
                onChange={handleInputChange}
              />
              Hybrid
            </label>
            <label>
              <input
                type="checkbox"
                name="onsite"
                checked={formData.onsite}
                onChange={handleInputChange}
              />
              On-site
            </label>
          </div>
          <button className="btn">Submit</button>
        </form>
      ) : (
        <div>Loading... (ERROR retrieving JOB)</div>
      )}
    </div>
  );
}

export default JobUpdatePage;
