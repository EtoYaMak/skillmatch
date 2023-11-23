import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobId, updateJob } from "../../../features/jobs/jobSlice";
import ReactQuill from "react-quill";
import "../../../assets/quill.snow.css"; // Import the CSS for the editor
import countriesList from "../../../assets/countries-data.json";

function JobUpdatePage() {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminID = useSelector((state) => state.SAuser.SAuser?._id);
  const userID = useSelector((state) => state.auth.user?._id);
  const { SAuser } = useSelector((state) => state.SAuser);
  const { user } = useSelector((state) => state.auth);
  const job = useSelector((state) =>
    state.jobs.jobs.find((j) => j._id === jobId)
  );

  useEffect(() => {
    const isUserAuthorized = () => {
      if (SAuser || adminID) {
        return true; // Admins are authorized
      } else if (user && job && user._id === job.user) {
        return true; // Regular user is authorized if they own the job
      } else {
        return false; // Not authorized
      }
    };

    if (!isUserAuthorized()) {
      navigate("/"); // Redirect to home page if not authorized
    }
  }, [SAuser, adminID, user, job, navigate]);

  console.log("job OWNER USER: ", job?.user);
  console.log("USER:", userID);
  console.log("ADMIN:", adminID);
  const [countries] = useState(countriesList);
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"], // Other toolbar options
        [{ header: [1, 2, 3, 4, 5, 6] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
      ],
    },
  };
  const [file, setFile] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const [formData, setFormData] = useState({
    position: "",
    city: "",
    country: "",
    careerPage: "",
    company: "",
    website: "",
    description: "",
    skills: [],
    type: {
      fulltime: false,
      parttime: false,
      internship: false,
      contract: false,
    },
    setting: {
      remote: false,
      hybrid: false,
      onsite: false,
    },
  });

  // Effect for fetching job data
  useEffect(() => {
    if (jobId) {
      dispatch(getJobId(jobId));
    }
  }, [jobId, dispatch]);

  // Effect for initializing form data
  useEffect(() => {
    if (job && !isInitialized) {
      const transformedType = job.type.reduce((acc, cur) => {
        acc[cur.name.toLowerCase().replace("-", "")] = cur.value;
        return acc;
      }, {});

      const transformedSetting = job.setting.reduce((acc, cur) => {
        acc[cur.name.toLowerCase().replace("-", "")] = cur.value;
        return acc;
      }, {});

      setFormData({
        ...job,
        ...transformedType,
        ...transformedSetting,
      });
      setIsInitialized(true); // Set isInitialized to true after setting form data
    }
  }, [job, isInitialized]);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  // Optional: To display the file preview
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleChange = (e) => {
    // Check if the function is called with an event object (standard input)
    if (e && e.target) {
      const { name, value, type, checked } = e.target;
      if (type === "checkbox") {
        // Update the state for type and setting checkboxes
        const key = name.toLowerCase().replace("-", "");
        setFormData((prev) => ({
          ...prev,
          [key]: checked,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      // If called with two arguments, it's from React Quill
      const [name, value] = e;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const UpdatedFormData = new FormData();

    UpdatedFormData.append("position", formData.position);
    UpdatedFormData.append("city", formData.city);
    UpdatedFormData.append("country", formData.country);
    UpdatedFormData.append("careerPage", formData.careerPage);
    UpdatedFormData.append("company", formData.company);
    UpdatedFormData.append("website", formData.website);
    UpdatedFormData.append("description", formData.description);
    // skills
    // Append skills (assuming formData.skills is an array)
    formData.skills.forEach((skill) => {
      UpdatedFormData.append("skills[]", skill);
    });
    // Append 'type' and 'setting' as JSON strings
    // type
    UpdatedFormData.append("fulltime", formData.fulltime);
    UpdatedFormData.append("parttime", formData.parttime);
    UpdatedFormData.append("internship", formData.internship);
    UpdatedFormData.append("contract", formData.contract);
    // setting
    UpdatedFormData.append("remote", formData.remote);
    UpdatedFormData.append("hybrid", formData.hybrid);
    UpdatedFormData.append("onsite", formData.onsite);

    // Append the file if it exists
    if (file) {
      UpdatedFormData.append("logo", file);
    }
    // To inspect FormData (for debugging purposes)
    for (let [key, value] of UpdatedFormData.entries()) {
      console.log(key, value);
    }

    dispatch(updateJob({ jobId: job._id, UpdatedFormData }));
    console.log("dispatch Successful");
    if (SAuser) {
      navigate("/adminDash");
    } else if (user) {
      navigate("/Dash");
    }
  };
  const removeSkill = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills: prevFormData.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSkillChange = (e) => {
    if (
      e.key === "Enter" ||
      e.key === "," ||
      (e.key === " " && e.target.value.trim())
    ) {
      e.preventDefault();
      const newSkill = e.target.value.trim();
      setFormData((prevFormData) => ({
        ...prevFormData,
        skills: [...prevFormData.skills, newSkill],
      }));
      e.target.value = ""; // Reset the input field
    }
  };

  if (!job) {
    // Show loading or 'job not found' based on additional state flags
    return (
      <div className="w-full flex-1 flex justify-center items-start h-screen">
        <span className="loading loading-spinner text-error w-14 mt-[10%]"></span>
      </div>
    ); // or an error message
  }
  return (
    <div>
      {job ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-[960px] mx-auto  font-Poppins "
        >
          <h1 className="w-full text-center font-Poppins text-3xl font-bold">
            UPDATE
          </h1>
          {/* Job Title */}
          <div className="w-full font-Poppins ">
            <div>
              <label className="block text-2xl font-semibold px-2 mb-2 mt-4 text-black">
                Job Title
              </label>
              <input
                type="text"
                name="position"
                id="position"
                className="form-control w-full input input-bordered transition-colors duration-300 ease-in-out bg-white font-semibold rounded-3xl
                        text-black placeholder:text-black/30 placeholder:font-medium text-xl shadow-[0px_2px_8px_rgb(0,0,0,0.3)] "
                placeholder={formData.position}
                value={formData.position}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Location */}
          <div className="w-full font-Poppins ">
            <div>
              <label className="block text-2xl font-semibold px-2 mb-2 mt-6 text-black">
                Location
              </label>
              <span className="flex flex-row w-full justify-between space-x-4">
                <input
                  type="text"
                  className="input input-bordered text-xl bg-white w-full font-semibold
                          text-black rounded-3xl placeholder:font-medium placeholder:text-black/30 shadow-[0px_2px_8px_rgb(0,0,0,0.3)] "
                  id="city"
                  name="city"
                  placeholder={formData.city}
                  value={formData.city}
                  onChange={handleChange}
                />
                <select
                  id="dropdown"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className=" select select-bordered rounded-3xl bg-white backdrop-blur-md text-black w-full font-Poppins flex flex-wrap text-xl shadow-[0px_2px_8px_rgb(0,0,0,0.3)] "
                >
                  <option
                    defaultValue={" "}
                    className="text-xl text-center text-black "
                    id="defaultCountry"
                  >
                    Select A Country
                  </option>
                  {countries.map((country) => (
                    <option
                      key={country.Code}
                      value={country.Name}
                      className="text-white bg-black/90 text-xl text-center"
                    >
                      {country.Name}
                    </option>
                  ))}
                </select>
              </span>
            </div>
          </div>

          <div className="typeWork  sm:grid sm:grid-cols-2  text-black/75 font-Poppins my-2 p-2">
            {/* Type */}
            <div className="grid grid-cols-2 gap-2">
              {/* Full-Time */}
              <div className="type space-x-3 flex items-center sm:justify-normal justify-stretch">
                <input
                  type="checkbox"
                  name="fulltime"
                  checked={formData.fulltime || false} // Default to false if undefined
                  onChange={handleChange}
                  className="checkbox checkbox-bordered focus:ring-0 shadow-[0px_2px_8px_rgb(0,0,0,0.3)]  "
                />
                <span className=" text-xl">Full-Time</span>
              </div>
              {/* Part-Time */}
              <div className="type space-x-3 flex items-center sm:justify-normal justify-stretch ">
                <input
                  type="checkbox"
                  name="parttime"
                  checked={formData.parttime || false}
                  onChange={handleChange}
                  className="checkbox checkbox-bordered focus:ring-0 shadow-[0px_2px_8px_rgb(0,0,0,0.3)] "
                />
                <span className=" h-full text-xl">Part-Time</span>
              </div>
              {/* Internship */}
              <div className="type space-x-3 flex items-center sm:justify-normal justify-stretch">
                <input
                  type="checkbox"
                  name="internship"
                  checked={formData.internship || false}
                  onChange={handleChange}
                  className="checkbox checkbox-bordered focus:ring-0 shadow-[0px_2px_8px_rgb(0,0,0,0.3)] "
                />
                <span className=" text-xl">Internship</span>
              </div>
              {/* Contract */}
              <div className="type space-x-3 flex items-center sm:justify-normal justify-stretch">
                <input
                  type="checkbox"
                  name="contract"
                  checked={formData.contract || false}
                  onChange={handleChange}
                  className="checkbox checkbox-bordered focus:ring-0 shadow-[0px_2px_8px_rgb(0,0,0,0.3)] "
                />
                <span className=" text-xl">Contract</span>
              </div>
            </div>
            {/* Job Setting */}
            <div className="setting flex flex-wrap sm:justify-between justify-between   sm:mt-0 mt-2">
              {/* Remote */}
              <div className="remoteWork space-x-2 sm:space-x-3 flex items-center text-start">
                <input
                  type="checkbox"
                  name="remote"
                  checked={formData.remote || false}
                  onChange={handleChange}
                  className="checkbox checkbox-bordered focus:ring-0 shadow-[0px_2px_8px_rgb(0,0,0,0.3)] "
                />
                <span className="text-xl">Remote</span>
              </div>
              {/* Hybrid */}
              <div className="setting hybridWork space-x-2 sm:space-x-3 flex items-center justify-center ">
                <input
                  type="checkbox"
                  name="hybrid"
                  checked={formData.hybrid || false}
                  onChange={handleChange}
                  className="checkbox checkbox-bordered focus:ring-0 shadow-[0px_2px_8px_rgb(0,0,0,0.3)] "
                />
                <span className=" text-xl">Hybrid</span>
              </div>
              {/* On-site */}
              <div className="setting onsite  space-x-2 sm:space-x-3 flex items-center justify-end">
                <input
                  type="checkbox"
                  name="onsite"
                  checked={formData.onsite || false}
                  onChange={handleChange}
                  className="checkbox checkbox-bordered focus:ring-0 shadow-[0px_2px_8px_rgb(0,0,0,0.3)] "
                />
                <span className=" text-xl">On-Site</span>
              </div>
            </div>
          </div>
          <div className="mt-4 text-black tracking-wider text-lg rounded-3xl overflow-hidden shadow-[0px_2px_8px_rgb(0,0,0,0.3)] ">
            <ReactQuill
              name="description"
              className="textarea textarea-bordered textarea-lg w-full max-w-full transition-colors duration-300 ease-in-out bg-black/5 
            text-white/80 placeholder:text-white/60 text-xl placeholder:text-2xl placeholder:tracking-widest"
              value={formData.description}
              onChange={(value) => handleChange(["description", value])}
              modules={modules}
            />
          </div>
          {/* Skills */}
          <div className="w-full bg-transparent font-Poppins">
            <div className="bg-transparent">
              <label className="block text-2xl font-semibold px-2 mb-2 mt-6 text-black">
                Skills
              </label>
              {/* SKILLS.MAP */}
              <div className="flex flex-wrap mb-1">
                {formData.skills &&
                  formData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-[#000]/80 text-white font-Poppins px-3 py-1 text-lg font-semibold tracking-wide rounded-3xl m-1  "
                    >
                      {skill}
                      <button
                        type="button"
                        className="ml-2 font-semibold text-red-500"
                        onClick={() => removeSkill(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
              </div>
              {/* SKILL INPUT */}
              <input
                type="text"
                name="skills"
                id="skills"
                className="w-full rounded-3xl input input-bordered transition-colors duration-300 ease-in-out bg-white font-semibold
                      text-black  placeholder:text-black/30 placeholder:font-medium text-xl placeholder:tracking-wide shadow-[0px_2px_8px_rgb(0,0,0,0.3)] "
                placeholder="Add a skill and press Enter"
                onKeyUp={handleSkillChange}
              />
            </div>
          </div>
          <div className="sm:flex sm:space-x-8 bg-transparent font-Poppins">
            {/* Company Name */}
            <div className="w-full sm:w-1/2 bg-transparent font-Poppins">
              <div className="bg-transparent">
                <label className="block text-2xl font-semibold px-2 mb-2 mt-6 text-black">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  className="w-full rounded-3xl input input-bordered transition-colors duration-300 ease-in-out bg-white font-semibold
                        text-black placeholder:text-black/30 placeholder:font-medium text-xl shadow-[0px_2px_8px_rgb(0,0,0,0.3)] "
                  placeholder="ABC Co."
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Career Page URL */}
            <div className="w-full sm:w-1/2 bg-transparent font-Poppins">
              <div className="bg-transparent">
                <label className="block text-2xl font-semibold px-2 mb-2 mt-6 text-black">
                  Career Page URL
                </label>
                <input
                  type="text"
                  name="careerPage"
                  id="careerPage"
                  className="w-full rounded-3xl input input-bordered  transition-colors duration-300 ease-in-out bg-white font-semibold
                        text-black placeholder:text-black/30 placeholder:font-medium text-xl shadow-[0px_2px_8px_rgb(0,0,0,0.3)] "
                  placeholder="www.careers.abc.com/job"
                  value={formData.careerPage}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="sm:flex sm:space-x-8 bg-transparent">
            {/* Logo */}
            <div className="w-full sm:w-1/2 bg-transparent">
              <div className="form-group bg-transparent">
                <label className=" text-2xl font-semibold px-2 mb-2 mt-6 text-black flex flex-row justify-between">
                  <p className="h-8">
                    Logo <span className="text-[10px]">MAX 2MB</span>{" "}
                  </p>
                </label>

                <div className="flex flex-row justify-between items-start">
                  <input
                    type="file"
                    name="logo"
                    accept="image/*"
                    className="rounded-3xl form-control-file file-input w-fit max-w-sm bg-white text-black/60 text-lg mr-2 shadow-[0px_2px_8px_rgb(0,0,0,0.3)] "
                    onChange={handleFileChange}
                    /* onChange={(e) => setFileName(e.target.files[0])} */
                  />

                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="mask mask-circle shadow-[0px_3px_8px_rgb(0,0,0,0.3)]"
                      style={{
                        width: 160,
                        height: 160,
                        position: "cover",
                      }}
                    />
                  )}
                  {!previewUrl && formData.logo && (
                    <img
                      src={formData.logo}
                      alt="Current logo"
                      className="mask mask-circle shadow-[0px_3px_8px_rgb(0,0,0,0.3)]"
                      style={{
                        width: 160,
                        height: 160,
                        position: "center",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* Company URL */}
            <div className="w-full sm:w-1/2 bg-transparent font-Poppins">
              <div className="bg-transparent">
                <label className="block text-2xl font-semibold px-2 mb-2 mt-6 text-black">
                  Company URL
                </label>
                <input
                  type="text"
                  name="website"
                  id="website"
                  className="rounded-3xl w-full input input-bordered transition-colors duration-300 ease-in-out bg-white font-semibold
                text-black placeholder:text-black/30 text-xl  placeholder:font-medium shadow-[0px_2px_8px_rgb(0,0,0,0.3)] "
                  placeholder="www.abc.com"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group flex justify-center items-center bg-transparent py-10 w-full ">
            <button
              className="btn btn-lg flex bg-[#1c1f21] hover:bg-[#d0333c] text-zinc-200 text-lg hover:border-white font-semibold minw-fit max-w-xs w-full hover:text-white h-fit rounded-3xl uppercase transition-colors duration-300 ease-in-out shadow-[0px_2px_8px_rgb(0,0,0,0.3)] "
              type="submit"
            >
              Update Job
            </button>
          </div>
        </form>
      ) : (
        <div>Loading... (ERROR retrieving JOB)</div>
      )}
    </div>
  );
}

export default JobUpdatePage;
