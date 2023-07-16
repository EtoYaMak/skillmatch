import { useState } from "react";
import { useDispatch } from "react-redux";
import { createJob } from "../features/jobs/jobSlice";
import TextEditor from "../components/TextEditor";
import DOMPurify from "dompurify";

function JobForm() {
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [careerPage, setCareerPage] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [remote, setRemote] = useState(false);
  const [contract, setContract] = useState(false);
  const [fulltime, setFulltime] = useState(false);
  const [parttime, setParttime] = useState(false);
  const [internship, setInternship] = useState(false);
  const [hybrid, setHybrid] = useState(false);
  const [onsite, setOnsite] = useState(false);
  const [formError, setFormError] = useState("");
  const [skills, setSkills] = useState([]);
  const dispatch = useDispatch();

  const handleSkillChange = (e) => {
    const value = e.target.value.trim();
    if (value && (e.key === "," || e.key === "Enter")) {
      e.preventDefault();
      const trimmedValue = value.replace(/,+$/, ""); // Remove trailing commas
      const sanitizedValue = trimmedValue.replace(/[^a-zA-Z0-9-.\s]/g, ""); // Remove special characters except "-" and "."
      setSkills([...skills, sanitizedValue]);
      e.target.value = "";
    }
  };

  const removeSkill = (skill) => {
    const updatedSkills = skills.filter((s) => s !== skill);
    setSkills(updatedSkills);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Input validation
    const requiredFields = [
      { name: "Job Title", value: position },
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
      setFormError(
        "Oh! Looks like you missed some fields:\n" +
          missingFields.join(", ") +
          "."
      );
      return;
    }

    // Sanitization
    const sanitizedPosition = sanitizeInput(position);
    const sanitizedLocation = sanitizeInput(location);
    const sanitizedCareerPage = sanitizeInput(careerPage);
    const sanitizedCompany = sanitizeInput(company);
    const sanitizedWebsite = sanitizeInput(website);
    const sanitizedDescription = sanitizeInput(description);
    const sanitizedSkills = skills.map((skill) => sanitizeInput(skill));

    const formData = new FormData();
    formData.append("position", sanitizedPosition);
    formData.append("location", sanitizedLocation);
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
    formData.append("description", sanitizedDescription);
    // skills
    sanitizedSkills.forEach((skill) => {
      formData.append("skills[]", skill);
    });

    dispatch(createJob(formData));

    setPosition("");
    setLocation("");
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
    setOnsite(false);
    setSkills([]);
  };

  // Helper function to sanitize input
  const sanitizeInput = (input) => {
    // Use DOMPurify to sanitize the input
    const sanitizedInput = DOMPurify.sanitize(input);

    return sanitizedInput;
  };

  return (
    <section>
      <form
        onSubmit={onSubmit}
        className="max-w-3xl mx-auto mb-20"
        method="post"
        encType="multipart/form-data"
      >
        <div className="my-2">
          {formError && (
            <p className="text-lg text-red-700 mb-4">{formError}</p>
          )}
          <div className="sm:flex sm:space-x-8">
            <div className="w-full sm:w-1/2">
              <div>
                <label className="block text-2xl font-semibold mb-2 mt-6">
                  Job Title
                </label>
                <input
                  type="text"
                  name="position"
                  id="position"
                  className="form-control w-full border-gray-300 hover:border-blue-500 transition-colors duration-300 ease-in-out outline-none"
                  placeholder="Example: Front-End Developer"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <div>
                <label className="block text-2xl font-semibold mb-2 mt-6">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  className="form-control w-full border-gray-300 hover:border-blue-500 transition-colors duration-300 ease-in-out outline-none"
                  placeholder="Example: New York, USA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="typeWork grid grid-cols-2 my-5 ">
            {/* Type */}
            <div className="col-start-1 sm:w-1/2">
              <div className="type">
                <input
                  type="checkbox"
                  value="Full-Time"
                  checked={fulltime}
                  onChange={(e) => setFulltime(e.target.checked)}
                  className="checkbox border-gray-300 hover:border-gray-600 "
                />
                <span className="ml-2 font-medium">Full-Time</span>
              </div>
              <div className="type">
                <input
                  type="checkbox"
                  value="Part-Time"
                  checked={parttime}
                  onChange={(e) => setParttime(e.target.checked)}
                  className="checkbox border-gray-300 hover:border-gray-600"
                />
                <span className="ml-2 font-medium">Part-Time</span>
              </div>
              <div className="type">
                <input
                  type="checkbox"
                  value="Internship"
                  checked={internship}
                  onChange={(e) => setInternship(e.target.checked)}
                  className="checkbox border-gray-300 hover:border-gray-600"
                />
                <span className="ml-2 font-medium">Internship</span>
              </div>
              <div className="type">
                <input
                  type="checkbox"
                  value="Contract"
                  checked={contract}
                  onChange={(e) => setContract(e.target.checked)}
                  className="checkbox border-gray-300 hover:border-gray-600"
                />
                <span className="ml-2 font-medium">Contract</span>
              </div>
            </div>
            {/* Job Setting */}
            <div className=" col-start-2 sm:w-1/2 sm:ml-4">
              <div className="remoteWork">
                <input
                  type="checkbox"
                  value="Remote"
                  checked={remote}
                  onChange={(e) => setRemote(e.target.checked)}
                  className="checkbox border-gray-300 hover:border-gray-600"
                />
                <span className="ml-2 font-medium">Remote</span>
              </div>
              <div className="hybridWork">
                <input
                  type="checkbox"
                  value="Hybrid"
                  checked={hybrid}
                  onChange={(e) => setHybrid(e.target.checked)}
                  className="checkbox border-gray-300 hover:border-gray-600"
                />
                <span className="ml-2 font-medium">Hybrid</span>
              </div>
              <div className="onsite">
                <input
                  type="checkbox"
                  value="On-site"
                  checked={onsite}
                  onChange={(e) => setOnsite(e.target.checked)}
                  className="checkbox border-gray-300 hover:border-gray-600"
                />
                <span className="ml-2 font-medium">On-Site</span>
              </div>
            </div>
          </div>
          <div className="mt-6 ">
            <TextEditor setDescription={setDescription} />
          </div>
          {/* Skills */}
          <div className="w-full sm:w-1/2">
            <div>
              <label className="block text-2xl font-semibold mb-2 mt-6">
                Skills
              </label>
              <div className="flex flex-wrap">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-blue-500 text-white py-1 px-2 rounded-md m-1  "
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
              <input
                type="text"
                name="skills"
                id="skills"
                className="w-full border-gray-300 hover:border-blue-500 my-2 transition-colors duration-200 ease-in-out "
                placeholder="Enter skill and type comma or hit Enter eg Python,"
                onKeyUp={handleSkillChange}
              />
            </div>
          </div>
          <div className="sm:flex sm:space-x-8">
            <div className="w-full sm:w-1/2">
              <div>
                <label className="block text-2xl font-semibold mb-2 mt-6">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  className="w-full border-gray-300 hover:border-blue-500 transition-colors duration-200 ease-in-out"
                  placeholder="ABC Co."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <div>
                <label className="block text-2xl font-semibold mb-2 mt-6">
                  Career Page Link
                </label>
                <input
                  type="text"
                  name="careerPage"
                  id="careerPage"
                  className="w-full border-gray-300 hover:border-blue-500 transition-colors duration-200 ease-in-out"
                  placeholder="https://www.careers.example.com/jobID?JobName"
                  value={careerPage}
                  onChange={(e) => setCareerPage(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="sm:flex sm:space-x-8">
            <div className="w-full sm:w-1/2">
              <div className="form-group">
                <label className="block text-2xl font-semibold mb-2 mt-6">
                  Company Logo
                </label>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  className="form-control-file w-full"
                  onChange={(e) => setFileName(e.target.files[0])}
                />
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <div>
                <label className="block text-2xl font-semibold mb-2 mt-6">
                  Company Website
                </label>
                <input
                  type="text"
                  name="website"
                  id="website"
                  className="w-full border-gray-300 hover:border-blue-500 transition-colors duration-200 ease-in-out"
                  placeholder="https://www.companyname.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-group flex justify-center ">
          <button
            className="btn button bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-lg hover:border-white font-semibold hover:text-white w-fit h-fit px-4 py-2 rounded-lg uppercase transition-colors duration-300 ease-in-out"
            type="submit"
          >
            post job
          </button>
        </div>
      </form>
    </section>
  );
}

export default JobForm;
