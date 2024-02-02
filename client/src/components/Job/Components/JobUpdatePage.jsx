import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobId, updateJob } from "../../../features/jobs/jobSlice";
import ReactQuill from "react-quill";
import "../../../assets/quill.snow.css"; // Import the CSS for the editor
import countriesList from "../../../assets/countries-data.json";
import departmentData from "../../../assets/Departments.json";
import DOMPurify from "dompurify";

//////////////////////////////////
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
      if (SAuser || adminID || userID) {
        return true; // Admins are authorized
      } else if (user && job && user._id === job.user) {
        return true; // Regular user is authorized if they own the job
      } else {
        return false; // Not authorized
      }
    };

    if (!isUserAuthorized()) {
      navigate("/401"); // Redirect to home page if not authorized
    }
  }, [SAuser, adminID, userID, user, job, navigate]);

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
  const handleDepartmentChange = (event) => {
    const departmentFirst = event.target.value;
    setSelectedDepartment(departmentFirst);

    if (departmentFirst !== "other") {
      const departmentName = departmentData[departmentFirst];
      setCategory(departmentName);
    } else {
      setCategory(selectedCustomDepartment);
    }
  };
  const [formData, setFormData] = useState({
    position: "",
    city: "",
    country: "",
    department: "",
    careerPage: "",
    company: "",
    website: "",
    description: "",
    skills: [],
    type: {
      fulltime: false,
      internship: false,
      contract: false,
    },
    setting: {
      remote: false,
      hybrid: false,
      onsite: false,
    },
    salary: "",
  });
  const [salary, setSalary] = useState(formData.salary || "");
  // Department
  const [category, setCategory] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCustomDepartment, setSelectedCustomDepartment] = useState("");
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
      setSelectedDepartment(job.department || "");
      setSelectedCustomDepartment("");
      setCategory(job.department || "");
      setSalary(job.salary || ""); // Initialize the salary state with the value from job
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
    UpdatedFormData.append("salary", salary);
    UpdatedFormData.append("department", category);
    // skills
    // Append skills (assuming formData.skills is an array)
    formData.skills.forEach((skill) => {
      UpdatedFormData.append("skills[]", skill);
    });
    // Append 'type' and 'setting' as JSON strings
    // type
    UpdatedFormData.append("fulltime", formData.fulltime);
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
    /*     // To inspect FormData (for debugging purposes)
    for (let [key, value] of UpdatedFormData.entries()) {
      console.log(key, value);
    } */

    dispatch(updateJob({ jobId: job._id, UpdatedFormData }));
    //console.log("dispatch Successful");
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

  /*   const handleSkillChange = (e) => {
    const value = e.target.value.trim();
    if (value && (e.key === "," || e.key === "Enter")) {
      e.preventDefault();
      const sanitizedValue = value
        .replace(/\.+$/, "")
        .replace(/[^a-zA-Z0-9\-+/\s#.&]/g, "");
      setFormData((prevFormData) => ({
        ...prevFormData,
        skills: [...prevFormData.skills, sanitizedValue],
      }));
      e.target.value = ""; // Reset the input field
    }
  }; */
  const handleSkillChange = (e) => {
    const value = e.target.value.trim();

    if (value) {
      const sanitizedValue = value
        .replace(/\.+$/, "")
        .replace(/[^a-zA-Z0-9\-+/\s#.&]/g, "");

      setFormData((prevFormData) => ({
        ...prevFormData,
        skills: [...prevFormData.skills, sanitizedValue],
      }));
      e.target.value = "";
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter" || e.keyCode === 13 || e.key === ",") {
      e.preventDefault();
      handleSkillChange(e);
    }
  };

  const handleAddSkillClick = () => {
    const inputElement = document.getElementById("skills");
    handleSkillChange({ target: inputElement });
  };
  const falseFlagsubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
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
    <div className="px-2">
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
                className={`form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 placeholder:font-light`}
                placeholder={formData.position}
                value={formData.position}
                onChange={handleChange}
                onKeyDown={falseFlagsubmit}
              />
            </div>
          </div>
          {/* Location (CITY && Country) */}
          <div className="w-full flex flex-col sm:flex-row justify-between bg-transparent font-Poppins sm:gap-8">
            {/* Location */}
            <div className="w-full font-Poppins">
              <label className="block text-2xl font-semibold mb-2 mt-8 text-black">
                Location
              </label>

              <input
                type="text"
                className={`form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 placeholder:font-light `}
                placeholder="City"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                onKeyDown={falseFlagsubmit}
              />
            </div>

            {/* Country */}
            <div className="Country flex flex-col justify-start w-full">
              <label className="block text-2xl font-semibold mb-2 mt-8 text-black">
                Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 `}
              >
                <option value="" className="" disabled hidden>
                  Select a Country
                </option>
                {countries.map((country) => (
                  <option
                    key={country.Code}
                    value={country.Name}
                    className="text-[15px] bg-white text-black"
                  >
                    {country.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Skills && Department */}
          <div className="w-full flex flex-col sm:flex-row justify-between bg-transparent font-Poppins sm:gap-8">
            {/* SKILL */}
            <div className="bg-transparent w-full relative">
              <label className="block text-2xl font-semibold mb-2 mt-8 text-black">
                Skills
              </label>
              <div className="flex items-center rounded-sm ">
                <input
                  type="text"
                  name="skills"
                  id="skills"
                  className={`form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 placeholder:text-black/40 `}
                  placeholder="Type a Skill and press <ENTER>"
                  //onKeyUp={handleSkillChange}
                  onKeyDown={falseFlagsubmit}
                  onKeyUp={handleKeyUp}
                />
                <button
                  className="p-[0.58em]  bg-black min-w-max text-[17px] font-medium text-white  rounded-r-[2px] font-Poppins absolute right-0"
                  onClick={handleAddSkillClick}
                  type="button"
                >
                  Add Skill
                </button>
              </div>
              {/* SKILLS.MAP */}
              <div className="flex flex-wrap mb-1 gap-1">
                {formData.skills &&
                  formData.skills.map((skill, index) => (
                    <div
                      key={index}
                      onClick={() => removeSkill(index)}
                      className="cursor-pointer duration-100 ease-in-out group hover:bg-[#1e1e1e] bg-[#e8e8e8] hover:text-white text-black pl-3 py-[2px] mt-1 text-[13px] font-Poppins font-medium border border-black/40 rounded-[2px]"
                    >
                      {skill}
                      <button
                        type="button"
                        className="font-medium w-6 group-hover:text-red-700"
                        onClick={() => removeSkill(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            {/* Department */}
            <div className="category flex flex-col justify-start w-full">
              <label className="block text-2xl font-semibold mb-2 mt-8 text-black">
                Department
              </label>
              <select
                id="department"
                name="department"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                className={`form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40`}
              >
                <option value={""} disabled>
                  {category}
                </option>
                {Object.keys(departmentData).map((key) => (
                  <option key={key}>{departmentData[key]}</option>
                ))}
                <option value="other">Other</option>
              </select>

              {selectedDepartment === "other" && (
                <div>
                  <input
                    type="text"
                    id="customDepartment"
                    value={selectedCustomDepartment}
                    onChange={(e) => {
                      setSelectedCustomDepartment(e.target.value);
                      setCategory(e.target.value);
                    }}
                    className="form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 mt-2"
                    placeholder="Enter Custom Department"
                  />
                </div>
              )}
            </div>
          </div>
          {/* SETTING && SALARY */}
          <div className="sm:flex sm:space-x-8 bg-transparent font-Poppins w-full ">
            {/* WORK SETTINGS */}
            <div className="flex flex-col sm:w-1/2 justify-center items-start font-Poppins gap-3 ">
              <label className="block text-2xl font-semibold  mt-8 text-black">
                Work Setting
              </label>
              {/* Type */}
              <div className="flex flex-row w-full justify-between">
                {/* Full-Time */}
                <div className="fulltime w-1/3 flex items-center justify-start gap-1">
                  <input
                    type="checkbox"
                    name="fulltime"
                    checked={formData.fulltime || false} // Default to false if undefined
                    onChange={handleChange}
                    className="mb-1 checkbox checkbox-warning
border-none ring-[1px] ring-[#777] hover:ring-[#000] focus:ring-0 shadow-[0.5px_1px_1px_rgb(0,0,0,0.2)]"
                  />
                  <span className=" text-xl">Full-Time</span>
                </div>
                {/* Internship */}
                <div className="Internship  w-1/3 flex items-center justify-start gap-1">
                  <input
                    type="checkbox"
                    name="internship"
                    checked={formData.internship || false}
                    onChange={handleChange}
                    className="mb-1 checkbox checkbox-warning
border-none ring-[1px] ring-[#777] hover:ring-[#000] focus:ring-0 shadow-[0.5px_1px_1px_rgb(0,0,0,0.2)]"
                  />
                  <span className=" text-xl">Internship</span>
                </div>
                {/* Contract */}
                <div className="Contract  w-1/3 flex items-center justify-start gap-1">
                  <input
                    type="checkbox"
                    name="contract"
                    checked={formData.contract || false}
                    onChange={handleChange}
                    className="mb-1 checkbox checkbox-warning
border-none ring-[1px] ring-[#777] hover:ring-[#000] focus:ring-0 shadow-[0.5px_1px_1px_rgb(0,0,0,0.2)] "
                  />
                  <span className=" text-xl">Contract</span>
                </div>
              </div>
              {/* Job Setting */}
              <div className="flex flex-row w-full justify-between">
                {/* Remote */}
                <div className="remoteWork  w-1/3 flex items-center justify-start gap-1">
                  <input
                    type="checkbox"
                    name="remote"
                    checked={formData.remote || false}
                    onChange={handleChange}
                    className="mb-1 checkbox checkbox-success
border-none ring-[1px] ring-[#777] hover:ring-[#000] focus:ring-0 shadow-[0.5px_1px_1px_rgb(0,0,0,0.2)] "
                  />
                  <span className="text-xl">Remote</span>
                </div>
                {/* Hybrid */}
                <div className="hybridWork  w-1/3 flex items-center justify-start gap-1">
                  <input
                    type="checkbox"
                    name="hybrid"
                    checked={formData.hybrid || false}
                    onChange={handleChange}
                    className="mb-1 checkbox checkbox-success
border-none ring-[1px] ring-[#777] hover:ring-[#000] focus:ring-0 shadow-[0.5px_1px_1px_rgb(0,0,0,0.2)] "
                  />
                  <span className=" text-xl">Hybrid</span>
                </div>
                {/* On-site */}
                <div className="onsite w-1/3 flex items-center justify-start gap-1">
                  <input
                    type="checkbox"
                    name="onsite"
                    checked={formData.onsite || false}
                    onChange={handleChange}
                    className="mb-1 checkbox checkbox-success ring-[1px] ring-[#777] border-none hover:ring-[#000] focus:ring-0 shadow-[0.5px_1px_1px_rgb(0,0,0,0.2)] "
                  />
                  <span className=" text-xl">On-Site</span>
                </div>
              </div>
            </div>
            {/* Salary */}
            <div className="sm:w-1/2">
              <label className="block text-2xl font-semibold mb-3 mt-8 text-black">
                Salary
              </label>
              <select
                name="dropdown"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className={`form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40`}
              >
                <option value={""} disabled hidden>
                  Select Salary
                </option>
                <option value="£10,000 - £15,000">£10,000 - £15,000 GBP</option>
                <option value="£15,000 - £25,000">£15,000 - £25,000 GBP</option>
                <option value="£25,000 - £35,000">£25,000 - £35,000 GBP</option>
                <option value="£35,000 - £45,000">£35,000 - £45,000 GBP</option>
                <option value="£45,000 - £60,000">£45,000 - £60,000 GBP</option>
                <option value="£60,000 - £80,000">£60,000 - £80,000 GBP</option>
                <option value="£80,000+">£80,000+ GBP</option>
              </select>
            </div>
          </div>
          {/* Description */}
          <div className="mt-14 text-black overflow-hidden ">
            <label className="block text-2xl font-semibold mb-2 text-black">
              Description
            </label>
            <ReactQuill
              placeholder={formData.description}
              className={`border-transparent`}
              onChange={(value) => handleChange(["description", value])}
              value={formData.description}
              modules={modules}
              onKeyDown={falseFlagsubmit}
            />
          </div>
          {/* Company (NAME && CareerPage) */}
          <div className="sm:flex sm:space-x-8 bg-transparent font-Poppins">
            {/* Company Name */}
            <div className="w-full sm:w-1/2 bg-transparent font-Poppins">
              <div className="bg-transparent">
                <label className="block text-2xl font-semibold mb-2 mt-8 text-black">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  className={`form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 `}
                  placeholder="ABC Co."
                  value={formData.company}
                  onChange={handleChange}
                  onKeyDown={falseFlagsubmit}
                />
              </div>
            </div>
            {/* Career Page URL */}
            <div className="w-full sm:w-1/2 bg-transparent font-Poppins">
              <div className="bg-transparent">
                <label className="block text-2xl font-semibold mb-2 mt-8 text-black">
                  Career Page URL
                </label>
                <input
                  type="text"
                  name="careerPage"
                  id="careerPage"
                  className={`form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40`}
                  placeholder="www.careers.abc.com/job"
                  value={formData.careerPagecareerPage}
                  onChange={handleChange}
                  onKeyDown={falseFlagsubmit}
                />
              </div>
            </div>
          </div>

          {/* Logo & Company Website */}
          <div className="sm:flex sm:space-x-8 bg-transparent">
            {/* Logo */}
            <div className="w-full sm:w-1/2 bg-transparent">
              <div className="form-group bg-transparent">
                <label className=" block text-2xl font-semibold mb-2 mt-8 text-black">
                  <p className="h-8">
                    Logo <span className="text-[10px]">MAX 2MB</span>{" "}
                  </p>
                </label>

                <div className="flex flex-row justify-between items-center relative  bg-[#a4a4a4]/20 rounded-md">
                  <span
                    className={`w-full h-40 group flex flex-col-reverse sm:flex-row-reverse justify-between items-center relative rounded-xl  hover:shadow-sm`}
                  >
                    {previewUrl && previewUrl !== null ? (
                      <img
                        src={previewUrl}
                        alt=""
                        className="dp cursor-pointer pointer-events-none w-28 h-28 z-10  bg-transparent flex justify-center items-center rounded-full absolute  max-[640px]:top-10 sm:right-5"
                      />
                    ) : null}
                    <label
                      htmlFor="profileImage"
                      className={`dp absolute flex-row cursor-pointer w-full h-full   flex justify-center items-center   text-black`}
                    >
                      {/*    <MdOutlineFileUpload size={45} /> */}
                      <h1
                        className={`font-Poppins font-bold text-lg sm:text-3xl  text-black/40 group-hover:text-black/60 absolute ${
                          !file ? "" : "hidden"
                        } sm:flex`}
                      >
                        Upload
                      </h1>
                    </label>
                    <input
                      type="file"
                      name="logo"
                      accept="image/*"
                      className="form-control-file file-input bg-transparent w-full h-full z-50"
                      onChange={handleFileChange}
                    />

                    {!previewUrl && formData.logo && (
                      <img
                        src={formData.logo}
                        alt="Current logo"
                        className="dp cursor-pointer pointer-events-none w-28 h-28  bg-transparent flex justify-center items-center rounded-full absolute  max-[640px]:top-10 sm:right-5"
                      />
                    )}
                  </span>
                </div>
                {/*                 <h1 className="font-Poppins font-medium text-center text-sm  p-1 ">
                  Click inside the box to select a file
                </h1> */}
              </div>
            </div>
            {/* Company URL */}
            <div className="w-full sm:w-1/2 bg-transparent font-Poppins">
              <div className="bg-transparent ">
                <label className="block text-2xl font-semibold mb-2 mt-8 text-black">
                  Company URL
                </label>
                <input
                  type="text"
                  name="website"
                  id="website"
                  className="form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 "
                  placeholder="www.abc.com"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/* BUTTON type submit */}
          <div className="form-group flex flex-col justify-end items-center bg-transparent gap-4 py-10 w-full ">
            <button
              className=" px-3 py-2 hover:bg-[#d0333c] bg-black  text-lg font-semibold  text-white  rounded-md uppercase transition-colors duration-200 ease-in-out shadow-[0px_2px_8px_rgb(0,0,0,0.3)] "
              type="submit"
            >
              Update Job
            </button>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="px-3 py-2  bg-[#000]/80 hover:bg-[#d0333c] text-lg hover:border-white font-semibold text-white hover:text-white  rounded-md uppercase transition-colors duration-200 ease-in-out shadow-[0px_2px_8px_rgb(0,0,0,0.3)] "
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default JobUpdatePage;
