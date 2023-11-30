import { useState } from "react";
import { useDispatch } from "react-redux";
import { SAcreateJob } from "../../../features/jobs/jobSlice";
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";
import "../../../assets/quill.snow.css"; // Import the CSS for the editor
import countriesList from "../../../assets/countries-data.json";
import departmentData from "../../../assets/Departments.json";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
let jobPlaceholder =
  "As a Network Engineer, you will play a crucial role in designing, implementing, and maintaining our organization's network infrastructure. Your responsibilities will include analyzing network requirements, configuring routers and switches, ensuring network security, and troubleshooting connectivity issues. Collaborating with cross-functional teams, you will contribute to the planning and execution of network projects, while staying abreast of industry trends and emerging technologies. The ideal candidate possesses strong problem-solving skills, in-depth knowledge of networking protocols, and a passion for optimizing network performance to support the organization's seamless operations.";

function JobFormAdmin() {
  const [position, setPosition] = useState("");
  const [careerPage, setCareerPage] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  const [skills, setSkills] = useState([]);
  //location
  const [city, setCity] = useState("");
  //
  const [selectedCountry, setSelectedCountry] = useState(""); //Chosen
  const [searchCountry, setSearchCountry] = useState(""); //Input Search
  const [countries] = useState(countriesList); //Data
  //category
  const [category, setCategory] = useState(""); //Chosen
  const [customCategory, setCustomCategory] = useState(""); //Other
  const [searchTerm, setSearchTerm] = useState(""); //Input Search
  const categories = departmentData; //Data
  //Salary
  const [salary, setSalary] = useState(""); //Chosen
  //File
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  //CheckBoxes
  const [remote, setRemote] = useState(false);
  const [contract, setContract] = useState(false);
  const [fulltime, setFulltime] = useState(false);
  const [internship, setInternship] = useState(false);
  const [hybrid, setHybrid] = useState(false);
  const [onsite, setOnsite] = useState(false);
  const [showFormError, setShowFormError] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const onSubmit = (e) => {
    e.preventDefault();

    const location = `${city}, ${selectedCountry}`;
    // Input validation
    /*     const requiredFields = [
      { name: "Job Title", value: position },
      { name: "City", value: city },
      { name: "Country", value: selectedCountry },
      { name: "Location", value: location },
      { name: "Company Name", value: company },
      { name: "Company Website", value: website },
      { name: "Job link", value: careerPage },
      { name: "Description", value: description },
      { name: "Logo", value: fileName },
      { name: "Skills", value: skills.length > 0 },
    ];

    const missingFields = requiredFields
      .filter((field) => !field.value)
      .map((field) => field.name);
    if (missingFields.length > 0) {
      setFormError(`${missingFields.join(", ")}`);
      setShowFormError(true);
      showToastError();
      return;
    } */

    // Sanitization
    const sanitizedPosition = sanitizeInput(position); //jobtitle
    const sanitizedCity = sanitizeInput(city); //jobcity
    const sanitizedCountry = sanitizeInput(selectedCountry); //jobcountry
    const sanitizedDepartment = sanitizeInput(category); //jobdepartment
    const sanitizedSalary = sanitizeInput(salary); //jobsalary
    const sanitizedCareerPage = sanitizeInput(careerPage); //jobcareerpage careerpageLink
    const sanitizedCompany = sanitizeInput(company); //jobcompany
    const sanitizedWebsite = sanitizeInput(website); //jobwebsite companywebsite
    const sanitizedDescription = sanitizeInput(description); //jobdescription
    const sanitizedSkills = skills.map((skill) => sanitizeInput(skill)); //jobskillsarray

    const formData = new FormData();

    formData.append("position", sanitizedPosition); //jobtitle
    formData.append("city", sanitizedCity); //jobcity
    formData.append("country", sanitizedCountry); //jobcountry
    formData.append("department", sanitizedDepartment); //jobdepartment
    formData.append("salary", sanitizedSalary); //jobsalary
    formData.append("careerPage", sanitizedCareerPage); //jobcareerpage careerpageLink
    formData.append("company", sanitizedCompany); //jobcompany
    formData.append("website", sanitizedWebsite); //jobwebsite companywebsite
    formData.append("logo", fileName); //joblogo
    formData.append("fulltime", fulltime); //jobfulltime
    formData.append("internship", internship); //jobinternship
    formData.append("contract", contract); //jobcontract
    formData.append("remote", remote); //jobremote
    formData.append("hybrid", hybrid); //jobhybrid
    formData.append("onsite", onsite); //jobonsite
    formData.append("description", sanitizedDescription); //jobdescription
    sanitizedSkills.forEach((skill) => {
      formData.append("skills[]", skill);
    }); //jobskillsarray
    dispatch(SAcreateJob(formData));
    setPosition(""); //jobtitle
    setCity(""); //jobcity
    setSelectedCountry(""); //jobcountry
    setCategory(""); //jobdepartment
    setSalary(""); //jobsalary
    setCareerPage(""); //jobcareerpage careerpageLink
    setCompany(""); //jobcompany
    setWebsite(""); //jobwebsite companywebsite
    setFileName(""); //joblogo
    setDescription(""); //jobdescription
    setFulltime(false); //jobfulltime
    setInternship(false); //jobinternship
    setContract(false); //jobcontract
    setRemote(false); //jobremote
    setHybrid(false); //jobhybrid
    setOnsite(false); //jobonsite
    setSkills([]); //jobskillsarray
    //navigate("/adminDash");
  };

  //Handle Changes
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
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
        {" "}
        {/* Apply your custom styles here */}
        <p className="custom-toast-text text-lg font-Inter">
          Oh! Looks like you missed some fields!
        </p>
      </div>,
      {
        theme: "dark",
        autoClose: 8000, // Auto close after 5 seconds (adjust as needed)
        // No need to set custom toast styles here; use the CSS class
        toastClassName: "custom-toast-container", // Add custom class for styling
      }
    );
  };

  const handleFormErrorClose = () => {
    setShowFormError(false);
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
  const filteredCategories = Object.keys(categories).filter((key) =>
    categories[key].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    setSearchTerm("");

    // If "Other" is selected, clear customCategory
    if (selectedCategory !== "other") {
      setCustomCategory("");
    }
  };

  const handleCustomCategoryChange = (event) => {
    setCustomCategory(event.target.value);
    setCategory("other"); // Set category to 'other' when user starts typing a custom category
  };
  return (
    <section>
      <form
        onSubmit={onSubmit}
        className="max-w-7xl mx-auto py-4"
        method="post"
        encType="multipart/form-data"
      >
        <>
          <div className="flex flex-col  p-8 w-full  bg-black/5">
            <h1 className="font-bold text-[28px] text-black/50">
              Tell us about the position
            </h1>
            <div className="w-full font-Poppins ">
              <div>
                <label className="block text-2xl font-semibold mb-2 mt-4 text-black">
                  Job Title
                </label>
                <p className="text-black/50 text-[14px]">
                  Example: “Senior Designer”. Titles must describe one position.
                </p>
                <input
                  type="text"
                  name="position"
                  id="position"
                  className="form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  onKeyDown={falseFlagsubmit}
                />
              </div>
            </div>
            <div className="w-full flex flex-col sm:flex-row justify-between bg-transparent font-Poppins sm:gap-8">
              {/* Location */}
              <div className="w-full font-Poppins">
                <label className="block text-2xl font-semibold mb-2 mt-4 text-black">
                  Location
                </label>

                <input
                  type="text"
                  className="form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 placeholder:font-light"
                  placeholder="City"
                  id="city"
                  name="city"
                  value={city}
                  onChange={handleCityChange}
                />
              </div>
              {/* Country */}
              <div className="Country flex flex-col justify-start w-full">
                <label className="block text-2xl font-semibold mb-2 mt-4 text-black">
                  Country
                </label>
                <select
                  name="dropdown"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40"
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
              <div className="bg-transparent w-full">
                <label className="block text-2xl font-semibold mb-2 mt-4 text-black">
                  Skills
                </label>

                {/* SKILL INPUT */}
                <input
                  type="text"
                  name="skills"
                  id="skills"
                  className="form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 placeholder:text-black/40"
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
                <label className="block text-2xl font-semibold mb-2 mt-4 text-black">
                  Category
                </label>
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className="form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40"
                >
                  <option value="" disabled hidden>
                    Select a category
                  </option>
                  {filteredCategories.map((key) => (
                    <option key={key} value={key}>
                      {categories[key]}
                    </option>
                  ))}
                </select>
                {category === "other" && (
                  <input
                    type="text"
                    value={customCategory}
                    onChange={handleCustomCategoryChange}
                    className="form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 mt-2"
                    placeholder="Enter custom category"
                  />
                )}
              </div>
            </div>
            <div className="sm:flex sm:space-x-8 bg-transparent font-Poppins w-full ">
              {/* WORK SETTINGS */}
              <div className="flex flex-col sm:w-1/2 justify-center items-start font-Poppins gap-1 ">
                <label className="block text-2xl font-semibold  mt-4 text-black">
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
              <div className="sm:w-1/2">
                <label className="block text-2xl font-semibold mb-2 mt-4 text-black">
                  Salary
                </label>
                <select
                  name="dropdown"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40"
                >
                  <option value="" disabled hidden>
                    Salary Range
                  </option>
                  <option value="£10,000 - £15,000">
                    £10,000 - £15,000 GBP
                  </option>
                  <option value="£15,000 - £25,000">
                    £15,000 - £25,000 GBP
                  </option>
                  <option value="£25,000 - £35,000">
                    £25,000 - £35,000 GBP
                  </option>
                  <option value="£35,000 - £45,000">
                    £35,000 - £45,000 GBP
                  </option>
                  <option value="£45,000 - £60,000">
                    £45,000 - £60,000 GBP
                  </option>
                  <option value="£60,000 - £80,000">
                    £60,000 - £80,000 GBP
                  </option>
                  <option value="80plus">£80,000+ GBP</option>
                </select>
              </div>
            </div>
            {/* Description */}
            <div className="mt-4 text-black overflow-hidden ">
              <ReactQuill
                placeholder={jobPlaceholder}
                className="border-none"
                onChange={handleDescriptionChange}
                value={description}
                modules={modules}
              />
            </div>

            <div className="sm:flex sm:space-x-8 bg-transparent font-Poppins">
              {/* Company Name */}
              <div className="w-full sm:w-1/2 bg-transparent font-Poppins">
                <div className="bg-transparent">
                  <label className="block text-2xl font-semibold mb-2 mt-4 text-black">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40"
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
                  <label className="block text-2xl font-semibold mb-2 mt-4 text-black">
                    Career Page URL
                  </label>
                  <input
                    type="text"
                    name="careerPage"
                    id="careerPage"
                    className="form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40"
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
                  <label className=" block text-2xl font-semibold mb-2 mt-4 text-black">
                    <p className="h-8">
                      Logo <span className="text-[10px]">MAX 2MB</span>{" "}
                    </p>
                    {fileName && <p>Preview</p>}
                  </label>

                  <div className="flex flex-row justify-between items-start">
                    <input
                      type="file"
                      name="logo"
                      accept="image/*"
                      className="file-input-ghost file-input w-fit bg-white file:bg-black/10 file:text-[14px] font-Poppins text-[17px] border border-black/20 rounded-[2px] "
                      onChange={handleFileChange}
                      /* onChange={(e) => setFileName(e.target.files[0])} */
                    />

                    {!fileName && (
                      <div className="flex flex-col justify-center items-center min-w-[90px] w-[90px] h-[90px] ">
                        <img
                          src={"../assets/dp.jpg"}
                          alt="Preview"
                          className="object-cover mask mask-circle"
                          style={{
                            width: 160,
                            height: 160,
                            position: "center",
                          }}
                        />
                      </div>
                    )}

                    {fileName && (
                      <div className="flex flex-col justify-center items-center min-w-[90px] w-[90px] h-[90px] ">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="mask mask-circle shadow-[0px_3px_8px_rgb(0,0,0,0.3)]"
                          style={{
                            width: 160,
                            height: 160,
                            position: "center",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Company URL */}
              <div className="w-full sm:w-1/2 bg-transparent font-Poppins">
                <div className="bg-transparent ">
                  <label className="block text-2xl font-semibold mb-2 mt-4 text-black">
                    Company URL
                  </label>
                  <input
                    type="text"
                    name="website"
                    id="website"
                    className="form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 "
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

        {/* SUBMIT */}
        <div className="form-group flex justify-center items-center bg-transparent py-10 w-full ">
          <button
            className="btn btn-lg flex bg-[#1c1f21] hover:bg-[#d0333c] text-zinc-200 text-lg hover:border-white font-semibold minw-fit max-w-xs w-full hover:text-white h-fit rounded-3xl uppercase transition-colors duration-300 ease-in-out shadow-[0px_2px_8px_rgb(0,0,0,0.3)] "
            type="submit"
          >
            Post Job
          </button>
        </div>
      </form>
    </section>
  );
}

export default JobFormAdmin;
