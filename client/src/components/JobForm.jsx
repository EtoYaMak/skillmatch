import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../features/jobs/jobSlice";
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";
import "../assets/quill.snow.css"; // Import the CSS for the editor
import { MdClose } from "react-icons/md";
import countriesList from "../assets/countries-data.json";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentPromptModal from "./PaymentPromptModal";
import PaymentForm from "./PaymentForm";
import { toast, ToastContainer } from "react-toastify";
function JobForm() {
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [careerPage, setCareerPage] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [countries, setCountries] = useState(countriesList);
  const [city, setCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  //File
  const [fileName, setFileName] = useState("");

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
    setLocation("");
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

  return (
    <section>
      {paymentStarted ? (
        <PaymentForm />
      ) : (
        <form
          onSubmit={onSubmit}
          className="max-w-7xl mx-auto mb-20"
          method="post"
          encType="multipart/form-data"
        >
          <section className="text-center tracking-wider font-Inter">
            <h1 className="flex-wrap max-[520px]:text-3xl text-4xl font-extrabold text-[#d4d7d7] w-full">
              Welcome
              <span className="text-[#d0333c]/80 w-full"> {user.name}</span>
            </h1>
            {isHidden ? (
              <p className="text-xl pt-2 pb-4 uppercase text-[#aba6a6]/80 font-semibold">
                Enhance Your Job Listing: Secure Your Job Post with Payment
              </p>
            ) : (
              <p className="text-xl pt-2 pb-4 uppercase text-white font-semibold">
                You can now{" "}
                <span className="px-1 text-xl text-[#d0333c]/80 underline decoration-white underline-offset-4 font-bold ">
                  post
                </span>
                a job. Use the{" "}
                <span className="px-1 text-xl text-[#d0333c]/80 underline decoration-white underline-offset-4 font-bold ">
                  form
                </span>{" "}
                below.
              </p>
            )}
          </section>
          {isHidden ? null : (
            <>
              <div className="mb-8">
                {showFormError && formError && (
                  <div className="flex flex-col min-[390px]:flex-row items-center justify-center bg-black/60 shadow-sm shadow-red-500 rounded-lg w-fit p-2 mx-auto">
                    <p
                      className="flex flex-col text-md text-[#d4d7d7] tracking-wide leading-normal font-bold p-2 items-center"
                      onClick={handleFormErrorClose}
                    >
                      <span className="font-Inter align-baseline text-[#d0333c] text-xl cursor-pointer">
                        Missing Fields!
                      </span>
                      <span className="font-Inter align-baseline text-white text-xl cursor-pointer">
                        {formError}
                      </span>
                    </p>
                    <button
                      id="close-button"
                      className=" flex items-center justify-center font-semibold rounded-full p-1 min-h-fit min-w-fit bg-[#d0333c] hover:bg-[#fff]"
                      onClick={handleFormErrorClose}
                    >
                      <MdClose
                        size={20}
                        className="bg-transparent text-[#d4d7d7] hover:text-[#000]"
                      />
                    </button>
                  </div>
                )}
                <div className="flex flex-col">
                  {/* Job Title */}
                  <div className="w-full ">
                    <div>
                      <label className="block text-2xl font-semibold px-2 mb-2 mt-6 text-white">
                        Job Title
                      </label>
                      <input
                        type="text"
                        name="position"
                        id="position"
                        className="form-control w-full input input-bordered transition-colors duration-300 ease-in-out bg-black/25 
                text-white/80 placeholder:text-white/40 text-xl "
                        placeholder="Example: Front-End Developer "
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        onKeyDown={falseFlagsubmit}
                      />
                    </div>
                  </div>
                  {/* Location */}
                  <div className="w-full ">
                    <div>
                      <label className="block text-2xl font-semibold px-2 mb-2 mt-6 text-white">
                        Location
                      </label>
                      <span className="flex flex-row w-full justify-between space-x-4">
                        <input
                          type="text"
                          className="input input-bordered text-xl bg-black/25 w-full text-white/90"
                          id="city"
                          name="city"
                          value={city}
                          onChange={handleCityChange}
                        />
                        <select
                          id="dropdown"
                          name="dropdown"
                          value={selectedCountry}
                          onChange={handleCountryChange}
                          className="select select-bordered bg-black/90 backdrop-blur-md text-white/90 w-full font-Inter flex flex-wrap text-xl"
                        >
                          <option
                            defaultValue={" "}
                            className="text-xl text-center text-white/70"
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
                </div>
                <div className="typeWork  sm:grid sm:grid-cols-2  text-white/75 font-Inter my-2 p-2">
                  {/* Type */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Full-Time */}
                    <div className="type space-x-3 flex items-center sm:justify-normal justify-stretch">
                      <input
                        type="checkbox"
                        value="Full-Time"
                        checked={fulltime}
                        onChange={(e) => setFulltime(e.target.checked)}
                        className="checkbox checkbox-bordered focus:ring-0 "
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
                        className="checkbox checkbox-bordered focus:ring-0"
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
                        className="checkbox checkbox-bordered focus:ring-0"
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
                        className="checkbox checkbox-bordered focus:ring-0"
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
                        className="checkbox checkbox-bordered focus:ring-0"
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
                        className="checkbox checkbox-bordered focus:ring-0"
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
                        className="checkbox checkbox-bordered"
                      />
                      <span className=" text-xl">On-Site</span>
                    </div>
                  </div>
                </div>
                {/* Description */}
                <div className="mt-4 text-white tracking-wider text-lg">
                  <ReactQuill
                    placeholder="Job Description"
                    className="textarea textarea-bordered textarea-lg w-full max-w-full transition-colors duration-300 ease-in-out bg-black/25 
            text-white/80 placeholder:text-white/60 text-xl placeholder:text-2xl placeholder:tracking-widest"
                    onChange={handleDescriptionChange}
                    value={description}
                  />
                </div>
                {/* Skills */}
                <div className="w-full bg-transparent">
                  <div className="bg-transparent">
                    <label className="block text-2xl font-semibold px-2 mb-2 mt-6 text-white">
                      Skills
                    </label>
                    {/* SKILLS.MAP */}
                    <div className="flex flex-wrap mb-1">
                      {skills.map((skill, index) => (
                        <div
                          key={index}
                          className="bg-[#d0333c]/80 text-[#d4d7d7] px-3 py-1 text-lg font-bold tracking-wide rounded-md m-1  "
                        >
                          {skill}
                          <button
                            type="button"
                            className="ml-2 font-semibold"
                            onClick={() => removeSkill(skill)}
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
                      className="w-full input input-bordered transition-colors duration-300 ease-in-out bg-black/25 
              text-white/80 placeholder:text-white/40 text-xl placeholder:tracking-wide"
                      placeholder="<spacebar> or <comma> to split Skills."
                      onKeyUp={handleSkillChange}
                      onKeyDown={falseFlagsubmit}
                    />
                  </div>
                </div>
                <div className="sm:flex sm:space-x-8 bg-transparent">
                  {/* Company Name */}
                  <div className="w-full sm:w-1/2 bg-transparent">
                    <div className="bg-transparent">
                      <label className="block text-2xl font-semibold px-2 mb-2 mt-6 text-white">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        className="w-full input input-bordered transition-colors duration-300 ease-in-out bg-black/25 
                text-white/80 placeholder:text-white/40 text-xl "
                        placeholder="ABC Co."
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        onKeyDown={falseFlagsubmit}
                      />
                    </div>
                  </div>
                  {/* Career Page URL */}
                  <div className="w-full sm:w-1/2 bg-transparent">
                    <div className="bg-transparent">
                      <label className="block text-2xl font-semibold px-2 mb-2 mt-6 text-white">
                        Career Page URL
                      </label>
                      <input
                        type="text"
                        name="careerPage"
                        id="careerPage"
                        className="w-full input input-bordered  transition-colors duration-300 ease-in-out bg-black/25 
                text-white/80 placeholder:text-white/40 text-xl "
                        placeholder="https://www.careers.example.com/jobID?JobName"
                        value={careerPage}
                        onChange={(e) => setCareerPage(e.target.value)}
                        onKeyDown={falseFlagsubmit}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:flex sm:space-x-8 bg-transparent">
                  {/* Logo */}
                  <div className="w-full sm:w-1/2 bg-transparent">
                    <div className="form-group bg-transparent">
                      <label className="block text-2xl font-semibold px-2 mb-2 mt-6 text-white">
                        Logo
                      </label>
                      <input
                        type="file"
                        name="logo"
                        accept="image/*"
                        className="form-control-file file-input w-full bg-black/25 text-white/40 text-lg"
                        onChange={(e) => setFileName(e.target.files[0])}
                        //onChange={(e) => setFileName(e.target.files[0]?.name || "")}
                      />
                    </div>
                  </div>
                  {/* Company URL */}
                  <div className="w-full sm:w-1/2 bg-transparent">
                    <div className="bg-transparent">
                      <label className="block text-2xl font-semibold px-2 mb-2 mt-6 text-white">
                        Company URL
                      </label>
                      <input
                        type="text"
                        name="website"
                        id="website"
                        className="w-full input input-bordered transition-colors duration-300 ease-in-out bg-black/25 
                text-white/80 placeholder:text-white/40 text-xl "
                        placeholder="https://www.companyname.com"
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

          {/* SUBMIT */}
          <div className="form-group flex justify-center items-center bg-transparent backdrop-blur-sm">
            {paymentSuccess ? (
              <button
                className="btn btn-lg bg-[#1c1f21] hover:bg-[#d0333c] text-zinc-200 text-lg hover:border-white font-semibold hover:text-white w-fit h-fit rounded-lg uppercase transition-colors duration-300 ease-in-out"
                type="submit"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={() => {
                  if (!paymentStarted) {
                    startPayment();
                  }
                }}
                className="btn btn-lg bg-[#1c1f21] hover:bg-[#d0333c] text-zinc-200 text-lg hover:border-white font-semibold hover:text-white w-fit h-fit rounded-lg uppercase transition-colors duration-300 ease-in-out"
                type="button"
              >
                Pay Now
              </button>
            )}
          </div>
        </form>
      )}
    </section>
  );
}

export default JobForm;
