import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../../../features/jobs/jobSlice";
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";
import "../../../assets/quill.snow.css"; // Import the CSS for the editor
import { MdClose } from "react-icons/md";
import countriesList from "../../../assets/countries-data.json";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentForm from "../../Stripe/PaymentForm";
import { toast } from "react-toastify";
let jobPlaceholder =
  "As a Network Engineer, you will play a crucial role in designing, implementing, and maintaining our organization's network infrastructure. Your responsibilities will include analyzing network requirements, configuring routers and switches, ensuring network security, and troubleshooting connectivity issues. Collaborating with cross-functional teams, you will contribute to the planning and execution of network projects, while staying abreast of industry trends and emerging technologies. The ideal candidate possesses strong problem-solving skills, in-depth knowledge of networking protocols, and a passion for optimizing network performance to support the organization's seamless operations.";

function JobForm() {
  const [position, setPosition] = useState("");

  const [careerPage, setCareerPage] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  const [skills, setSkills] = useState([]);
  const [countries] = useState(countriesList);
  const [city, setCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  //File
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  //CheckBoxes
  const [remote, setRemote] = useState(false);
  const [contract, setContract] = useState(false);
  const [fulltime, setFulltime] = useState(false);
  const [parttime, setParttime] = useState(false);
  const [internship, setInternship] = useState(false);
  const [hybrid, setHybrid] = useState(false);
  const [onsite, setOnsite] = useState(false);
  const [showFormError, setShowFormError] = useState(true);

  //Form Error
  const [formError, setFormError] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  //Payment Var.
  const [paymentStarted, setPaymentStarted] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Track payment success

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const locationState = useLocation().state;

  const { user } = useSelector((state) => state.auth);
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

  useEffect(() => {
    const storedPaymentSuccess = sessionStorage.getItem("paymentSuccess");
    if (storedPaymentSuccess === "true") {
      setPaymentSuccess(true);
      setIsHidden(false);
    } else if (locationState?.paymentSuccess) {
      setPaymentSuccess(true);
      setIsHidden(false);
    } else {
      console.error("Payment Not Successful");
    }
  }, [locationState]);

  const onSubmit = (e) => {
    e.preventDefault();
    // Clear the successful payment signal from sessionStorage
    // sessionStorage.removeItem("paymentSuccess");
    const location = `${city}, ${selectedCountry}`;
    // Input validation
    const requiredFields = [
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
    }

    // Sanitization
    const sanitizedPosition = sanitizeInput(position);
    const sanitizedCity = sanitizeInput(city);
    const sanitizedCountry = sanitizeInput(selectedCountry);
    const sanitizedLocation = sanitizeInput(location);
    const sanitizedCareerPage = sanitizeInput(careerPage);
    const sanitizedCompany = sanitizeInput(company);
    const sanitizedWebsite = sanitizeInput(website);
    /*     const sanitizedDescription = sanitizeInput(description); */
    const sanitizedSkills = skills.map((skill) => sanitizeInput(skill));

    const formData = new FormData();

    formData.append("position", sanitizedPosition);
    formData.append("location", sanitizedLocation);
    formData.append("city", sanitizedCity);
    formData.append("country", sanitizedCountry);
    formData.append("careerPage", sanitizedCareerPage);
    formData.append("company", sanitizedCompany);
    formData.append("website", sanitizedWebsite);
    formData.append("logo", fileName);
    // type
    formData.append("fulltime", fulltime);
    formData.append("parttime", parttime);
    formData.append("internship", internship);
    formData.append("contract", contract);
    // setting
    formData.append("remote", remote);
    formData.append("hybrid", hybrid);
    formData.append("onsite", onsite);
    // desc
    formData.append("description", description);
    // skills
    sanitizedSkills.forEach((skill) => {
      formData.append("skills[]", skill);
    });

    dispatch(createJob(formData));
    // Clear the successful payment signal from sessionStorage
    sessionStorage.removeItem("paymentSuccess");
    setPosition("");

    setCity("");
    setSelectedCountry("");
    setCareerPage("");
    setCompany("");
    setWebsite("");
    setRemote(false);
    setFileName("");
    setDescription("");
    setFulltime(false);
    setParttime(false);
    setInternship(false);
    setContract(false);
    setHybrid(false);
    setRemote(false);
    setOnsite(false);
    setSkills([]);
    setTimeout(() => {
      navigate("/dash");
    }, 2000);
  };

  const startPayment = () => {
    setPaymentStarted(true);
    //saveFormDataToStorage();
    // Use navigate to programmatically navigate to the payment page.
    navigate("/payment");
    // Replace "/payment" with the actual route path for your PaymentForm component.
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
        <p className="custom-toast-text text-lg font-Poppins">
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

  return (
    <section className="py-14">
      {paymentStarted ? (
        <PaymentForm />
      ) : (
        <>
          <form
            onSubmit={onSubmit}
            className="max-w-7xl mx-auto"
            method="post"
            encType="multipart/form-data"
          >
            {isHidden ? null : (
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
                        Example: “Senior Designer”. Titles must describe one
                        position.
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
                  {/* Location */}
                  <div className="w-full font-Poppins">
                    <label className="block text-2xl font-semibold mb-2 mt-4 text-black">
                      Location
                    </label>
                    <span className="flex flex-row w-full justify-between space-x-8">
                      <input
                        type="text"
                        className="form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 placeholder:font-light"
                        placeholder="City"
                        id="city"
                        name="city"
                        value={city}
                        onChange={handleCityChange}
                      />
                      <select
                        id="dropdown"
                        name="dropdown"
                        value={selectedCountry}
                        defaultValue={"placeholder"}
                        onChange={handleCountryChange}
                        className="form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] text-black/40 font-medium focus:ring-0 focus:border-black/40"
                      >
                        <option
                          selected
                          hidden
                          className="text-[15px] bg-white "
                          id="defaultCountry"
                        >
                          Select A Country
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
                    </span>
                  </div>

                  <div className="typeWork  sm:grid sm:grid-cols-2  text-black/75 font-Poppins my-2 p-2">
                    {/* Type */}
                    <div className="grid grid-cols-2 gap-2">
                      {/* Full-Time */}
                      <div className="type space-x-3 flex items-center sm:justify-normal justify-stretch">
                        <input
                          type="checkbox"
                          value="Full-Time"
                          checked={fulltime}
                          onChange={(e) => setFulltime(e.target.checked)}
                          className="checkbox checkbox-bordered focus:ring-0 shadow-[0.5px_1px_1px_rgb(0,0,0,0.2)] "
                        />
                        <span className=" text-xl">Full-Time</span>
                      </div>
                      {/* Part-Time */}
                      <div className="type space-x-3 flex items-center sm:justify-normal justify-stretch ">
                        <input
                          type="checkbox"
                          value="Part-Time"
                          checked={parttime}
                          onChange={(e) => setParttime(e.target.checked)}
                          className="checkbox checkbox-bordered focus:ring-0 shadow-[0.5px_1px_1px_rgb(0,0,0,0.2)] "
                        />
                        <span className=" h-full text-xl">Part-Time</span>
                      </div>
                      {/* Internship */}
                      <div className="type space-x-3 flex items-center sm:justify-normal justify-stretch">
                        <input
                          type="checkbox"
                          value="Internship"
                          checked={internship}
                          onChange={(e) => setInternship(e.target.checked)}
                          className="checkbox checkbox-bordered focus:ring-0 shadow-[0.5px_1px_1px_rgb(0,0,0,0.2)]"
                        />
                        <span className=" text-xl">Internship</span>
                      </div>
                      {/* Contract */}
                      <div className="type space-x-3 flex items-center sm:justify-normal justify-stretch">
                        <input
                          type="checkbox"
                          value="Contract"
                          checked={contract}
                          onChange={(e) => setContract(e.target.checked)}
                          className="checkbox checkbox-bordered focus:ring-0 shadow-[0.5px_1px_1px_rgb(0,0,0,0.2)] "
                        />
                        <span className=" text-xl">Contract</span>
                      </div>
                    </div>
                    {/* Job Setting */}
                    <div className="flex flex-wrap sm:justify-between justify-between   sm:mt-0 mt-2">
                      {/* Remote */}
                      <div className="remoteWork space-x-2 sm:space-x-3 flex items-center text-start">
                        <input
                          type="checkbox"
                          value="Remote"
                          checked={remote}
                          onChange={(e) => setRemote(e.target.checked)}
                          className="checkbox checkbox-bordered focus:ring-0 shadow-[0.5px_1px_1px_rgb(0,0,0,0.2)] "
                        />
                        <span className="text-xl">Remote</span>
                      </div>
                      {/* Hybrid */}
                      <div className="hybridWork space-x-2 sm:space-x-3 flex items-center justify-center ">
                        <input
                          type="checkbox"
                          value="Hybrid"
                          checked={hybrid}
                          onChange={(e) => setHybrid(e.target.checked)}
                          className="checkbox checkbox-bordered focus:ring-0 shadow-[0.5px_1px_1px_rgb(0,0,0,0.2)] "
                        />
                        <span className=" text-xl">Hybrid</span>
                      </div>
                      {/* On-site */}
                      <div className="onsite  space-x-2 sm:space-x-3 flex items-center justify-end">
                        <input
                          type="checkbox"
                          value="On-site"
                          checked={onsite}
                          onChange={(e) => setOnsite(e.target.checked)}
                          className="checkbox checkbox-bordered focus:ring-0 shadow-[0.5px_1px_1px_rgb(0,0,0,0.2)] "
                        />
                        <span className=" text-xl">On-Site</span>
                      </div>
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

                  {/* Skills */}
                  <div className="w-full flex flex-row justify-between bg-transparent font-Poppins gap-8">
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
                      <input
                        type="text"
                        name="skills"
                        id="skills"
                        className="form-control w-full border border-black/20 rounded-[2px] p-[0.65em] text-[17px] font-medium focus:ring-0 focus:border-black/40 placeholder:text-black/40"
                        placeholder="Category"
                        onKeyUp={handleSkillChange}
                        onKeyDown={falseFlagsubmit}
                      />
                    </div>
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
            )}
            <div className="relative top-56 space-y-8">
              {isHidden ? (
                <p className="text-xl pt-2 pb-4 text-black/70 font-semibold text-center">
                  Enhance Your Job Listing Make a payment via Stripe
                </p>
              ) : (
                <></>
              )}
              {/* PAY BUTTON */}
              <div className="form-group flex justify-center items-center bg-transparent  w-full ">
                {paymentSuccess ? (
                  <></>
                ) : (
                  <button
                    onClick={() => {
                      if (!paymentStarted) {
                        startPayment();
                      }
                    }}
                    className="text-lg font-Poppins tracking-wide bg-black text-white py-3 rounded-[3px] w-[340px]"
                    type="button"
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
            {/* POST JOB */}
            <div className="text-center pt-6">
              {paymentSuccess ? (
                <button
                  className="text-lg font-Poppins tracking-wide bg-black text-white py-3 rounded-[3px] w-[340px] "
                  type="submit"
                >
                  Post Job
                </button>
              ) : (
                <></>
              )}
            </div>
          </form>
        </>
      )}
    </section>
  );
}

export default JobForm;
