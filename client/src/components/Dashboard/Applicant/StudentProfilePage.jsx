import React, { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaRegImage } from "react-icons/fa";

/* Form Fields */
/* 
HEADER:

bannerImage
profileImage

applicantFullName === Account Name
applicantHeadline
applicantLocation

ApplicantUnivesity (latest from Education)

*/
/* 
ABOUT:
aboutSection

EXPERIENCE:

roleTitle
roleCompany
roleDate
roleLocation
roleDuties
roleSkills

EDUCATION:

uniName
uniDegree
uniGrade
uniDate
uniLocation
uniSection
uniSkills


*/
function CreateProfilePage() {
  const [formData, setFormData] = useState({
    bannerImage: "",
    profileImage: "",
    applicantFullName: "",
    applicantHeadline: "",
    applicantLocation: "",

    aboutSection: "",

    roleTitle: "",
    roleCompany: "",
    roleDate: "",
    roleLocation: "",
    roleDuties: "",
    roleSkills: "",

    uniName: "",
    uniDegree: "",
    uniGrade: "",
    uniDate: "",
    uniLocation: "",
    uniSection: "",
    uniSkills: [],
  });
  const [selectedprofileImage, setprofileImage] = useState(
    "https://media.licdn.com/dms/image/D4E03AQHig7LtBns85Q/profile-displayphoto-shrink_400_400/0/1696993962952?e=1707955200&v=beta&t=WkndwQ9BKC5J23CFbn1GD1R1UZFk5fo4XshCGAxnLvg"
  );
  const [selectedbannerImage, setbannerImage] = useState(
    "https://media.licdn.com/dms/image/D4D16AQEz_eilIlP63w/profile-displaybackgroundimage-shrink_350_1400/0/1701948566295?e=1707955200&v=beta&t=bdsEFzJYqRI_Cb1HnVuTLnd1BbaGmvF8NOsUUPfXpZk"
  );

  const handleFileChangeBanner = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setbannerImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFileChangeDP = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setprofileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <form className="space-y-5 min-h-screen">
      {/* HEADER */}
      <div className="header flex flex-col gap-12 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] relative">
        <span className="banner relative">
          <img
            src={selectedbannerImage}
            alt="banner"
            className="rounded-t-xl"
          />
          {/* bannerImage upload */}
          <span className="w-40 h-40 opacity-0 hover:opacity-100">
            <label
              htmlFor="bannerImage"
              className="banner   absolute flex justify-center items-center w-full h-full top-0  cursor-pointer  hover:bg-white/50  rounded-t-xl shadow-[rgba(0,_0,_0,_0.1)_0px_1px_3px] hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
            >
              <FaRegImage size={33} className="text-white" />
            </label>
            <input
              type="file"
              name="bannerImage"
              id="bannerImage"
              className="sr-only"
              onChange={handleFileChangeBanner}
            />
          </span>
          <img
            src={selectedprofileImage}
            alt=""
            className="dp absolute w-24 sm:w-36 mask mask-circle -bottom-10 left-10"
          />
          {/* profileImage upload */}
          <span className="w-40 h-40 opacity-0 hover:opacity-100">
            <label
              htmlFor="profileImage"
              className="dp absolute -bottom-10 left-10 cursor-pointer w-24 sm:w-36 h-24 sm:h-36 bg-white/40 hover:bg-white/50 flex justify-center items-center rounded-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_3px] hover:shadow-[rgba(255,_255,_255,_1)_0px_3px_8px]"
            >
              <MdOutlineFileUpload size={45} className="text-white" />
            </label>
            <input
              type="file"
              name="profileImage"
              id="profileImage"
              className="sr-only"
              onChange={handleFileChangeDP}
            />
          </span>
        </span>
        <span className="headerContent flex w-full gap-8 p-3  pb-4">
          <span className="headerContentLeft w-2/3 space-y-1">
            <h1 className="name text-[20px] font-Poppins font-semibold">
              Muhammad Abdul Karim
            </h1>
            <h1 className="headline text-[15px] font-Poppins font-normal">
              React Developer | SysAdmin | Networks | Cyber security | IT
              Support
            </h1>
            <h1 className="location text-[13px] font-Poppins pt-2">
              Birmingham, England, United Kingdom
            </h1>
          </span>
          <span className="headerContentRight w-1/3 flex justify-center">
            <h1 className="text-[15px] font-Poppins font-normal ">
              University of Sunderland
            </h1>
          </span>
        </span>
      </div>
      {/* ABOUT */}
      <div className="about w-full bg-white rounded-xl p-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <h1 className="text-[20px] font-Poppins font-semibold">About</h1>
        <p className="w-full p-2 text-[14px] font-Poppins ">
          🚀 Tech Enthusiast | Network & Cybersecurity Enthusiast | Digital
          Architect Hello, I'm Muhammad Abdul Karim, a tech aficionado based in
          Birmingham, UK. My journey in the tech world has evolved, with a
          growing focus on network and cybersecurity.
        </p>
      </div>
      {/* Experience */}
      <div className="experience w-full bg-white rounded-xl p-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col gap-4">
        <h1 className="text-[20px] font-Poppins font-semibold">Experience</h1>
        <span className="experience1 flex w-full">
          <span className="w-1/2">
            <h1 className="role font-Poppins text-[16px] font-medium">
              Full-Stack Developer
            </h1>
            <h1 className="company font-Poppins text-[14px] font-normal">
              Thrive Creative Media
            </h1>
          </span>
          <span className="w-1/2 text-end">
            <h1 className="date font-Poppins text-[14px] font-normal">
              Apr 2018 - Jul 2019{" "}
            </h1>
            <h1 className="location setting font-Poppins text-[14px] font-normal">
              Dubai, United Arab Emirates · Hybrid
            </h1>
          </span>
        </span>
        <p className="job duties font-Poppins text-[14px] font-normal">
          Collaborated as a Full Stack Developer within a dynamic team, using
          technologies like Flutter, Java, and JavaScript to design and develop
          web and mobile applications, contributing to the successful delivery
          of creative and functional solutions. <br /> <br /> Managed the
          integration of AWS and Azure services into project workflows,
          optimizing cloud resources, and enhancing application performance,
          which played a critical role in supporting the efficient deployment of
          applications.
        </p>
        <div className="skills my-2">
          <h1 className="font-Poppins text-[16px] font-semibold ">Skills</h1>
          <h1 className="skillist font-Poppins text-[14px] font-normal">
            Computer Hardware · Operating Systems · Active Directory · Amazon
            Web Services (AWS) · Teamwork · Full-Stack Development · Flutter ·
            JavaScript
          </h1>
        </div>
      </div>

      {/* Education */}
      <div className="education w-full bg-white rounded-xl p-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col gap-4">
        <h1 className="text-[20px] font-Poppins font-semibold">Education</h1>
        <span className="education1 flex w-full">
          <span className="w-1/2">
            <h1 className="university font-Poppins text-[16px] font-medium">
              University of Sunderland
            </h1>
            <h1 className="degree font-Poppins text-[14px] font-normal">
              Bachelor of Science - BSc, Networks & CyberSecurity
            </h1>
            <h1 className="grade font-Poppins text-[14px] font-normal">
              Grade: First Class Honours
            </h1>
          </span>
          <span className="w-1/2 text-end">
            <h1 className="date font-Poppins text-[14px] font-normal">
              Sep 2019 - Jul 2022
            </h1>
            <h1 className="location setting font-Poppins text-[14px] font-normal">
              Sunderland, England, United Kingdom
            </h1>
          </span>
        </span>
        <p className="academic about font-Poppins text-[14px] font-normal">
          Collaborated as a Full Stack Developer within a dynamic team, using
          technologies like Flutter, Java, and JavaScript to design and develop
          web and mobile applications, contributing to the successful delivery
          of creative and functional solutions.
        </p>
        <div className="skills my-2">
          <h1 className="font-Poppins text-[16px] font-semibold ">Skills</h1>
          <h1 className="skillist font-Poppins text-[14px] font-normal">
            Computer Hardware · Operating Systems · Active Directory · Amazon
            Web Services (AWS) · Teamwork · Full-Stack Development · Flutter ·
            JavaScript
          </h1>
        </div>
      </div>
    </form>
  );
}
function StudentProfilePage() {
  return (
    <div className="space-y-5 min-h-screen">
      {/* HEADER */}
      <div className="header flex flex-col gap-12 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] relative">
        <span className="banner relative">
          <img
            src="https://media.licdn.com/dms/image/D4E03AQHig7LtBns85Q/profile-displayphoto-shrink_400_400/0/1696993962952?e=1707955200&v=beta&t=WkndwQ9BKC5J23CFbn1GD1R1UZFk5fo4XshCGAxnLvg"
            alt=""
            className="dp absolute w-24 sm:w-36 mask mask-circle -bottom-10 left-10"
          />
          <img
            src="https://media.licdn.com/dms/image/D4D16AQEz_eilIlP63w/profile-displaybackgroundimage-shrink_350_1400/0/1701948566295?e=1707955200&v=beta&t=bdsEFzJYqRI_Cb1HnVuTLnd1BbaGmvF8NOsUUPfXpZk"
            alt="banner"
            className="rounded-t-xl"
          />
        </span>
        <span className="headerContent flex w-full gap-8 p-3  pb-4">
          <span className="headerContentLeft w-2/3 space-y-1">
            <h1 className="name text-[20px] font-Poppins font-semibold">
              Muhammad Abdul Karim
            </h1>
            <h1 className="headline text-[15px] font-Poppins font-normal">
              React Developer | SysAdmin | Networks | Cyber security | IT
              Support
            </h1>
            <h1 className="location text-[13px] font-Poppins pt-2">
              Birmingham, England, United Kingdom
            </h1>
          </span>
          <span className="headerContentRight w-1/3 flex justify-center">
            <h1 className="text-[15px] font-Poppins font-normal ">
              University of Sunderland
            </h1>
          </span>
        </span>
      </div>
      {/* ABOUT */}
      <div className="about w-full bg-white rounded-xl p-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <h1 className="text-[20px] font-Poppins font-semibold">About</h1>
        <p className="w-full p-2 text-[14px] font-Poppins ">
          🚀 Tech Enthusiast | Network & Cybersecurity Enthusiast | Digital
          Architect Hello, I'm Muhammad Abdul Karim, a tech aficionado based in
          Birmingham, UK. My journey in the tech world has evolved, with a
          growing focus on network and cybersecurity.
        </p>
      </div>
      {/* Experience */}
      <div className="experience w-full bg-white rounded-xl p-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col gap-4">
        <h1 className="text-[20px] font-Poppins font-semibold">Experience</h1>
        <span className="experience1 flex w-full">
          <span className="w-1/2">
            <h1 className="role font-Poppins text-[16px] font-medium">
              Full-Stack Developer
            </h1>
            <h1 className="company font-Poppins text-[14px] font-normal">
              Thrive Creative Media
            </h1>
          </span>
          <span className="w-1/2 text-end">
            <h1 className="date font-Poppins text-[14px] font-normal">
              Apr 2018 - Jul 2019{" "}
            </h1>
            <h1 className="location setting font-Poppins text-[14px] font-normal">
              Dubai, United Arab Emirates · Hybrid
            </h1>
          </span>
        </span>
        <p className="job duties font-Poppins text-[14px] font-normal">
          Collaborated as a Full Stack Developer within a dynamic team, using
          technologies like Flutter, Java, and JavaScript to design and develop
          web and mobile applications, contributing to the successful delivery
          of creative and functional solutions. <br /> <br /> Managed the
          integration of AWS and Azure services into project workflows,
          optimizing cloud resources, and enhancing application performance,
          which played a critical role in supporting the efficient deployment of
          applications.
        </p>
        <div className="skills my-2">
          <h1 className="font-Poppins text-[16px] font-semibold ">Skills</h1>
          <h1 className="skillist font-Poppins text-[14px] font-normal">
            Computer Hardware · Operating Systems · Active Directory · Amazon
            Web Services (AWS) · Teamwork · Full-Stack Development · Flutter ·
            JavaScript
          </h1>
        </div>
      </div>

      {/* Education */}
      <div className="education w-full bg-white rounded-xl p-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col gap-4">
        <h1 className="text-[20px] font-Poppins font-semibold">Education</h1>
        <span className="education1 flex w-full">
          <span className="w-1/2">
            <h1 className="university font-Poppins text-[16px] font-medium">
              University of Sunderland
            </h1>
            <h1 className="degree font-Poppins text-[14px] font-normal">
              Bachelor of Science - BSc, Networks & CyberSecurity
            </h1>
            <h1 className="grade font-Poppins text-[14px] font-normal">
              Grade: First Class Honours
            </h1>
          </span>
          <span className="w-1/2 text-end">
            <h1 className="date font-Poppins text-[14px] font-normal">
              Sep 2019 - Jul 2022
            </h1>
            <h1 className="location setting font-Poppins text-[14px] font-normal">
              Sunderland, England, United Kingdom
            </h1>
          </span>
        </span>
        <p className="academic about font-Poppins text-[14px] font-normal">
          Collaborated as a Full Stack Developer within a dynamic team, using
          technologies like Flutter, Java, and JavaScript to design and develop
          web and mobile applications, contributing to the successful delivery
          of creative and functional solutions.
        </p>
        <div className="skills my-2">
          <h1 className="font-Poppins text-[16px] font-semibold ">Skills</h1>
          <h1 className="skillist font-Poppins text-[14px] font-normal">
            Computer Hardware · Operating Systems · Active Directory · Amazon
            Web Services (AWS) · Teamwork · Full-Stack Development · Flutter ·
            JavaScript
          </h1>
        </div>
      </div>
    </div>
  );
}

export default CreateProfilePage;
