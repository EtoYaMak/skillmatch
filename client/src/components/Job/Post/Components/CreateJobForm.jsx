import { useState, useContext, useEffect, useRef } from "react";
import { JobFormContext } from "../JobPost";
import { useDispatch } from "react-redux";
import { SAcreateJob } from "../../../../features/jobs/jobSlice";
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";
import { MdOutlineFileUpload } from "react-icons/md";

import "../../../../assets/quill.snow.css"; // Import the CSS for the editor
import countriesList from "../../../../assets/countries-data.json";
import departmentData from "../../../../assets/Departments.json";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

let jobPlaceholder =
  "As a Network Engineer, you will play a crucial role in designing, implementing, and maintaining our organization's network infrastructure. Your responsibilities will include analyzing network requirements, configuring routers and switches, ensuring network security, and troubleshooting connectivity issues. Collaborating with cross-functional teams, you will contribute to the planning and execution of network projects, while staying abreast of industry trends and emerging technologies. The ideal candidate possesses strong problem-solving skills, in-depth knowledge of networking protocols, and a passion for optimizing network performance to support the organization's seamless operations.";

function CreateJobForm() {
  const { formData, updateFormData, isFormValid, setIsFormValid } =
    useContext(JobFormContext);

  const [position, setPosition] = useState(formData.position || "");
  const [careerPage, setCareerPage] = useState(formData.careerPage || "");
  const [company, setCompany] = useState(formData.company || "");
  const [website, setWebsite] = useState(formData.website || "");
  const [description, setDescription] = useState(formData.description || "");

  const [skills, setSkills] = useState(formData.skills || []);
  //location
  const [city, setCity] = useState(formData.city || "");
  const [country, setCountry] = useState(formData.country || "");
  const [selectedCountry, setSelectedCountry] = useState(
    formData.selectedCountry || ""
  );
  const [countries] = useState(countriesList); //Data
  // Department
  const [category, setCategory] = useState(formData.category || "");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCustomDepartment, setSelectedCustomDepartment] = useState("");

  //Salary
  const [salary, setSalary] = useState(formData.salary || ""); //Chosen
  //File
  const [fileName, setFileName] = useState(formData.fileName || "");
  const [previewUrl, setPreviewUrl] = useState(formData.previewUrl || "");

  // Checkboxes - make sure formData has these fields as booleans
  const [remote, setRemote] = useState(formData.remote || false);
  const [contract, setContract] = useState(formData.contract || false);
  const [fulltime, setFulltime] = useState(formData.fulltime || false);
  const [internship, setInternship] = useState(formData.internship || false);
  const [hybrid, setHybrid] = useState(formData.hybrid || false);
  const [onsite, setOnsite] = useState(formData.onsite || false);

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Check if the file size is within the limit
      const maxFileSizeMB = 2.5; // Maximum allowed file size in megabytes

      if (selectedFile.size <= maxFileSizeMB * 1024 * 1024) {
        setFileName(e.target.files[0]);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        // File size exceeds the limit
        alert(`File size must be less than ${maxFileSizeMB} MB`);
        // Clear the input field
        e.target.value = null;
      }
    }
  };

  //Handle Changes
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    // setSelectedCountry(e.target.value);
  };

  const falseFlagsubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // Function to show a toast error message
  const showToastError = () => {
    toast.error(
      <div className="custom-toast">
        <p className="custom-toast-text text-lg font-Inter">
          Fill all required Fields
        </p>
      </div>,
      {
        theme: "light",
        autoClose: 4000, // Auto close after 4 seconds (adjust as needed)
        // No need to set custom toast styles here; use the CSS class
        toastClassName: "custom-toast-container", // Add custom class for styling
      }
    );
    // Reset the form validity after showing the toast
    setIsFormValid(true);
  };

  const handleDescriptionChange = (value) => {
    const sanitizedValue = DOMPurify.sanitize(value);
    setDescription(sanitizedValue);
  };

  const handleSkillChange = (e) => {
    const value = e.target.value.trim();
    if (value && (e.key === "," || e.key === " ")) {
      e.preventDefault();
      // const trimmedValue = value.replace(/-,+$/, ""); // Remove trailing commas
      //const sanitizedValue = value.replace(/[^a-zA-Z0-9\-+\s#.]|(?<=\.)$/g, ""); // Remove special characters except "-", ".", "+", and whitespace
      const sanitizedValue = value
        .replace(/\.+$/, "")
        .replace(/[^a-zA-Z0-9\-+/\s#.&]/g, "");

      setSkills([...skills, sanitizedValue]);
      e.target.value = "";
    }
  };

  const removeSkill = (skill) => {
    const skillIndex = skills.indexOf(skill);
    if (skillIndex !== -1) {
      const updatedSkills = [...skills];
      updatedSkills.splice(skillIndex, 1);
      setSkills(updatedSkills);
    }
  };

  // Helper function to sanitize input
  const sanitizeInput = (input) => {
    // Use DOMPurify to sanitize the input
    const sanitizedInput = DOMPurify.sanitize(input);

    return sanitizedInput;
  };

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
  // Whenever any piece of state changes, update the context's formData.
  useEffect(() => {
    const sanitizedFormData = {
      position: sanitizeInput(position),
      careerPage: sanitizeInput(careerPage, {
        ALLOWED_URI_REGEXP: /^https?:\/\//i,
      }),
      company: sanitizeInput(company),
      website: sanitizeInput(website, { ALLOWED_URI_REGEXP: /^https?:\/\//i }),
      description: sanitizeInput(description),
      skills: skills.map(sanitizeInput),
      city: sanitizeInput(city),
      country: sanitizeInput(country),
      category: sanitizeInput(category),
      salary: sanitizeInput(salary),
      remote,
      contract,
      fulltime,
      internship,
      hybrid,
      onsite,
      fileName: fileName,
      previewUrl,
    };
    updateFormData(sanitizedFormData);
  }, [
    position,
    careerPage,
    company,
    website,
    description,
    skills,
    city,
    country,
    selectedCountry,
    category,
    salary,
    remote,
    contract,
    fulltime,
    internship,
    hybrid,
    onsite,
    fileName,
    previewUrl,
  ]);

  // Inside your CreateJobForm component
  useEffect(() => {
    if (!isFormValid) {
      showToastError();
    }
    // This will ensure the toast is shown only when `isFormValid` changes to false
  }, [isFormValid]);

  return (
    <form
      className="w-full max-w-[1100px] mx-auto pt-10"
      method="post"
      encType="multipart/form-data"
    >
      <>
        {/* Display an error message if the form is not valid */}
        {!isFormValid && (
          <>
            <div className="text-red-500 mb-4">
              Please fill out all required fields.
            </div>
          </>
        )}
        <div className="flex flex-col  p-8 w-full  bg-white shadow-[0_3px_5px_rgb(0,0,0,0.15)]">
          <h1 className="font-bold text-[28px] text-gray-600">
            Tell us about the position
          </h1>
          {/* Job Title */}
          <div className="w-full font-Poppins ">
            <div>
              <label className="block text-2xl font-semibold mb-2 mt-8 text-black">
                Job Title
              </label>
              <p className="text-black/50 text-[14px]">
                Example: “Senior Designer”. Titles must describe one position.
              </p>
              <input
                type="text"
                name="position"
                id="position"
                className={`form-control w-full border rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 ${
                  !position
                    ? "ring-2 ring-red-500 border-transparent"
                    : "border-black/20 focus:border-black/40"
                }`}
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                onKeyDown={falseFlagsubmit}
              />
            </div>
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-between bg-transparent font-Poppins sm:gap-8">
            {/* Location */}
            <div className="w-full font-Poppins">
              <label className="block text-2xl font-semibold mb-2 mt-8 text-black">
                Location
              </label>

              <input
                type="text"
                className={`form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 placeholder:font-light ${
                  !city
                    ? "ring-2 ring-red-500 border-transparent"
                    : "border-black/20 focus:border-black/40"
                }`}
                placeholder="City"
                id="city"
                name="city"
                value={city}
                onChange={handleCityChange}
              />
            </div>
            {/* Country */}
            <div className="Country flex flex-col justify-start w-full">
              <label className="block text-2xl font-semibold mb-2 mt-8 text-black">
                Country
              </label>
              <select
                value={country}
                onChange={handleCountryChange}
                className={`form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 ${
                  !country
                    ? "ring-2 ring-red-500 border-transparent"
                    : "border-black/20 focus:border-black/40"
                }`}
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
          {/* Skills */}
          <div className="w-full flex flex-col sm:flex-row justify-between bg-transparent font-Poppins sm:gap-8">
            {/* SKILL */}
            <div className="bg-transparent w-full">
              <label className="block text-2xl font-semibold mb-2 mt-8 text-black">
                Skills
              </label>

              <input
                type="text"
                name="skills"
                id="skills"
                className={`form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 placeholder:text-black/40 ${
                  skills <= 0
                    ? "ring-2 ring-red-500 border-transparent"
                    : "border-black/20 focus:border-black/40"
                }`}
                placeholder="<spacebar> or <comma> to split Skills."
                onKeyUp={handleSkillChange}
                onKeyDown={falseFlagsubmit}
              />
              {/* SKILLS.MAP */}
              <div className="flex flex-wrap mb-1 gap-1">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className=" bg-white pl-3 py-[2px] mt-1 text-[13px] font-Poppins font-medium border border-black/40 rounded-[2px]"
                  >
                    {skill}
                    <button
                      type="button"
                      className="font-medium w-6 hover:text-red-500"
                      onClick={() => removeSkill(skill)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Category */}
            <div className="category flex flex-col justify-start w-full">
              <label className="block text-2xl font-semibold mb-2 mt-8 text-black">
                Department
              </label>
              <select
                id="department"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                className={`form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 ${
                  !selectedDepartment
                    ? "ring-2 ring-red-500 border-transparent"
                    : "border-black/20 focus:border-black/40"
                }`}
              >
                <option value="" disabled>
                  Select a department
                </option>
                {Object.keys(departmentData).map((key) => (
                  <option key={key} value={key}>
                    {departmentData[key]}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>

              {selectedDepartment === "other" && (
                <div>
                  <input
                    type="text"
                    id="customDepartment"
                    onChange={(e) => {
                      setSelectedCustomDepartment(e.target.value);
                      setCategory(e.target.value); // Update category with custom input
                    }}
                    className="form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 mt-2"
                    placeholder="Enter Custom Department"
                  />
                </div>
              )}
            </div>
          </div>
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
                    value="Full-Time"
                    checked={fulltime}
                    onChange={(e) => setFulltime(e.target.checked)}
                    className="mb-1 checkbox checkbox-warning border-none ring-[1px] ring-[#777] hover:ring-[#000] focus:ring-0 shadow-[0.5px_1px_1px_rgb(0,0,0,0.2)] "
                  />
                  <span className=" text-lg">Full-Time</span>
                </div>
                {/* Internship */}
                <div className="Internship  w-1/3 flex items-center justify-start gap-1">
                  <input
                    type="checkbox"
                    value="Internship"
                    checked={internship}
                    onChange={(e) => setInternship(e.target.checked)}
                    className="mb-1 checkbox checkbox-warning
border-none ring-[1px] ring-[#777] hover:ring-[#000] focus:ring-0 shadow-[0.5px_1px_1px_rgb(0,0,0,0.2)]"
                  />
                  <span className=" text-lg">Internship</span>
                </div>
                {/* Contract */}
                <div className="Contract  w-1/3 flex items-center justify-start gap-1">
                  <input
                    type="checkbox"
                    value="Contract"
                    checked={contract}
                    onChange={(e) => setContract(e.target.checked)}
                    className="mb-1 checkbox checkbox-warning
border-none ring-[1px] ring-[#777] hover:ring-[#000] focus:ring-0 shadow-[0.5px_1px_1px_rgb(0,0,0,0.2)] "
                  />
                  <span className=" text-lg">Contract</span>
                </div>
              </div>
              {/* Job Setting */}
              <div className="flex flex-row w-full justify-between">
                {/* Remote */}
                <div className="remoteWork  w-1/3 flex items-center justify-start gap-1">
                  <input
                    type="checkbox"
                    value="Remote"
                    checked={remote}
                    onChange={(e) => setRemote(e.target.checked)}
                    className="mb-1 checkbox checkbox-success
border-none ring-[1px] ring-[#777] hover:ring-[#000] focus:ring-0 shadow-[0.5px_1px_1px_rgb(0,0,0,0.2)] "
                  />
                  <span className="text-lg">Remote</span>
                </div>
                {/* Hybrid */}
                <div className="hybridWork  w-1/3 flex items-center justify-start gap-1">
                  <input
                    type="checkbox"
                    value="Hybrid"
                    checked={hybrid}
                    onChange={(e) => setHybrid(e.target.checked)}
                    className="mb-1 checkbox checkbox-success
border-none ring-[1px] ring-[#777] hover:ring-[#000] focus:ring-0 shadow-[0.5px_1px_1px_rgb(0,0,0,0.2)] "
                  />
                  <span className=" text-lg">Hybrid</span>
                </div>
                {/* On-site */}
                <div className="onsite w-1/3 flex items-center justify-start gap-1">
                  <input
                    type="checkbox"
                    value="On-site"
                    checked={onsite}
                    onChange={(e) => setOnsite(e.target.checked)}
                    className="mb-1 checkbox checkbox-success ring-[1px] ring-[#777] border-none hover:ring-[#000] focus:ring-0 shadow-[0.5px_1px_1px_rgb(0,0,0,0.2)] "
                  />
                  <span className=" text-lg">On-Site</span>
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
                className={`form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 ${
                  !salary
                    ? " border-red-500 border-2"
                    : "border-black/20 focus:border-black/40"
                }`}
              >
                <option value="" disabled hidden>
                  Salary Range
                </option>
                <option value="£10,000 - £15,000">£10,000 - £15,000 GBP</option>
                <option value="£15,000 - £25,000">£15,000 - £25,000 GBP</option>
                <option value="£25,000 - £35,000">£25,000 - £35,000 GBP</option>
                <option value="£35,000 - £45,000">£35,000 - £45,000 GBP</option>
                <option value="£45,000 - £60,000">£45,000 - £60,000 GBP</option>
                <option value="£60,000 - £80,000">£60,000 - £80,000 GBP</option>
                <option value="80plus">£80,000+ GBP</option>
              </select>
            </div>
          </div>
          {/* Description */}
          <div className="mt-14 text-black overflow-hidden ">
            <label className="block text-2xl font-semibold mb-2 text-black">
              Description
            </label>
            <ReactQuill
              placeholder={jobPlaceholder}
              className={`border-transparent`}
              onChange={handleDescriptionChange}
              value={description}
              modules={modules}
            />
          </div>

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
                  className={`form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 ${
                    !company
                      ? " border-red-500 border-2"
                      : "border-black/20 focus:border-black/40"
                  }`}
                  placeholder="ABC Co."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
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
                  className={`form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 ${
                    !careerPage
                      ? " border-red-500 border-2"
                      : "border-black/20 focus:border-black/40"
                  }`}
                  placeholder="www.careers.abc.com/job"
                  value={careerPage}
                  onChange={(e) => setCareerPage(e.target.value)}
                  onKeyDown={falseFlagsubmit}
                />
              </div>
            </div>
          </div>

          <div className="sm:flex sm:space-x-8 bg-transparent ">
            {/* Logo */}
            <div className="w-full sm:w-1/2 bg-transparent">
              <div className="form-group bg-transparent">
                <label className=" block text-2xl font-semibold mb-2 mt-8 text-black">
                  <p className="h-8">
                    Logo <span className="text-[10px]">MAX 2MB</span>{" "}
                  </p>
                  {/* {fileName && <p className="absolute">Preview</p>} */}
                </label>

                <div className="flex flex-row justify-between items-center relative  bg-[#a4a4a4]/20 rounded-md">
                  <span
                    className={`w-full h-36 group flex flex-col-reverse sm:flex-row-reverse justify-between items-center relative  rounded-xl z-[2] hover:shadow-sm`}
                  >
                    {previewUrl && previewUrl !== null ? (
                      <img
                        src={previewUrl}
                        alt=""
                        className="dp cursor-pointer pointer-events-none w-28 h-28  bg-transparent flex justify-center items-center rounded-full z-10 absolute  max-[640px]:top-1 sm:right-5"
                      />
                    ) : null}
                    <label
                      htmlFor="profileImage"
                      className={`dp absolute flex-row cursor-pointer w-full h-full   flex justify-center items-center   text-black`}
                    >
                      {/*    <MdOutlineFileUpload size={45} /> */}
                      <h1
                        className={`font-Poppins font-bold text-lg sm:text-3xl  text-black/40 group-hover:text-black/60 absolute ${
                          !fileName ? "" : "max-[640px]:bottom-0"
                        } sm:flex`}
                      >
                        Upload
                      </h1>
                    </label>
                    <input
                      type="file"
                      name="profileImage"
                      id="profileImage"
                      className="sr-only w-full h-full"
                      onChange={handleFileChange}
                    />
                  </span>
                </div>
                <h1 className="font-Poppins font-medium text-center text-sm  p-1 ">
                  Click inside the box to select a file
                </h1>
              </div>
            </div>
            {/* Company URL */}
            <div className="w-full sm:w-1/2 bg-transparent font-Poppins">
              <div className="bg-transparent ">
                <label className="block text-2xl font-semibold mb-10 mt-8 text-black">
                  Company URL
                </label>
                <input
                  type="text"
                  name="website"
                  id="website"
                  className={`form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 ${
                    !website
                      ? " border-red-500 border-2"
                      : "border-black/20 focus:border-black/40"
                  } z-20`}
                  placeholder="www.abc.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  onKeyDown={falseFlagsubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    </form>
  );
}

export default CreateJobForm;
