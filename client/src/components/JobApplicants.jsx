import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobId, updateApplicationStatus } from "../features/jobs/jobSlice";
import {
  getStudentProfile,
  SAgetStudentProfile,
} from "../features/profiles/profileSlice";
import { useParams } from "react-router-dom";

function ProfileCard({ profile, onUpdateStatus, job }) {
  const [isHovered, setIsHovered] = useState(false);
  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-500";
      case "Rejected":
        return "text-red-500";
      case "Pending":
        return "text-yellow-500";
      default:
        return "text-blue-500";
    }
  };
  const applicant = job.applicants.find(
    (app) => app.student === profile.student
  );
  const handleViewCV = () => {
    window.open(profile.cv, "_blank");
  };
  return (
    <div
      className={`mx-auto rounded-3xl shadow-md p-4 mb-4 flex flex-col sm:flex-row items-stretch w-full sm:w-fit
      justify-between select-none  ease-linear duration-200 h-full ${
        isHovered ? "bg-black/60 scale-[101%]" : "bg-black"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* First Column */}
      <div className="flex flex-col sm:items-start items-center justify-center space-y-4 py-2 sm:w-fit">
        <h2
          className={`uppercase text-lg sm:text-xl font-Poppins font-bold ${
            isHovered ? "text-white" : "text-white"
          }`}
        >
          {profile.studentName}
        </h2>
        <p
          className={`uppercase sm:text-lg font-Poppins font-medium ${
            isHovered ? "text-white" : "text-white"
          }`}
        >
          {profile.Degree} {profile.DegreeTitle}
        </p>
        <p
          className={`uppercase sm:text-md font-Poppins font-normal ${
            isHovered ? "text-white" : "text-white"
          }`}
        >
          {profile.University}
        </p>
      </div>

      <div className="flex flex-row justify-evenly sm:w-fit">
        {/* Second Column */}
        <div className="flex flex-row sm:flex-col justify-center items-center space-y-2 ">
          <button
            className={`btn btn-ghost ease-in-out duration-300 rounded-md 
           hover:bg-[#fff] appearance-none  hover:text-black font-Poppins
            sm:text-lg  ${isHovered ? "text-white" : "text-blue-400 "}`}
            onClick={handleViewCV}
          >
            View CV
          </button>
          <div className="flex px-2 flex-col items-center space-y-2">
            <p
              className={`text-center w-fit font-Poppins font-bold sm:text-lg uppercase  ${
                isHovered ? "text-white/80" : "text-white"
              }`}
            >
              Status
            </p>
            <p
              className={`text-center w-fit font-Poppins font-bold sm:text-lg uppercase  ${getStatusClass(
                applicant ? applicant.status : "N/A"
              )}`}
            >
              {applicant ? applicant.status : "N/A"}
            </p>
          </div>
        </div>

        {/* Third Column */}
        <div className="flex flex-row sm:flex-col justify-center items-center gap-3 py-2 px-2">
          {applicant?.status !== "Approved" && (
            <button
              className="btn btn-ghost hover:bg-green-800 hover:text-white text-green-500 ease-in-out duration-300 rounded-md px-2 py-1 font-Poppins"
              onClick={() => onUpdateStatus("Approved")}
            >
              Approve
            </button>
          )}
          {applicant?.status !== "Rejected" && (
            <button
              className="btn btn-ghost ease-in-out duration-300 rounded-md px-2 py-1 hover:bg-red-800 hover:text-white text-red-500 font-Poppins"
              onClick={() => onUpdateStatus("Rejected")}
            >
              Reject
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function JobApplicants() {
  const dispatch = useDispatch();
  const { jobId } = useParams(); // Get the job ID from the URL parameter

  const job = useSelector((state) =>
    state.jobs.jobs.find((j) => j._id === jobId)
  );
  const profiles = useSelector((state) => state.profiles.profiles);
  const jobStatus = useSelector((state) => state.jobs.isLoading);
  const jobError = useSelector((state) => state.jobs.isError);
  const SAuser = useSelector((state) => state.SAuser.SAuser);
  const user = useSelector((state) => state.auth.user);
  const [renderedProfiles, setRenderedProfiles] = useState(new Set());

  useEffect(() => {
    if (!job) {
      // Fetch only if job isn't already in the state
      dispatch(getJobId(jobId));
    }
  }, [dispatch, jobId, job]);

  useEffect(() => {
    if (job && job.applicants) {
      job.applicants.forEach((applicant) => {
        if (!renderedProfiles.has(applicant.student)) {
          if (user) {
            dispatch(getStudentProfile(applicant.student));
            setRenderedProfiles((prevProfiles) =>
              new Set(prevProfiles).add(applicant.student)
            );
          } else if (SAuser) {
            dispatch(SAgetStudentProfile(applicant.student));
            setRenderedProfiles((prevProfiles) =>
              new Set(prevProfiles).add(applicant.student)
            );
          } else {
            console.error("Unkown user student profile request");
          }
        }
      });
    }
  }, [user, SAuser, dispatch, job, renderedProfiles]);

  //

  const handleUpdateStatus = async (jobId, studentId, newStatus) => {
    dispatch(updateApplicationStatus({ jobId, studentId, newStatus }));
  };

  const [selectedTab, setSelectedTab] = useState("Pending");
  const pendingCount =
    job?.applicants.filter((app) => app.status === "Pending").length || 0;
  const approvedCount =
    job?.applicants.filter((app) => app.status === "Approved").length || 0;
  const rejectedCount =
    job?.applicants.filter((app) => app.status === "Rejected").length || 0;

  return jobStatus ? (
    <div className="text-black text-center w-fit">Loading...</div>
  ) : jobError ? (
    <div className="text-black text-center w-fit">Error while fetching job</div>
  ) : !job ? (
    <div className="text-black text-center w-full">No job available</div>
  ) : (
    <div className="font-Poppins sm:scale-100 scale-[85%] min-h-screen w-full max-w-2xl mx-auto">
      <div className="bg-black/10 rounded-3xl p-4">
        <h1 className="text-[#d0333c] tracking-wider text-2xl text-center font-Poppins font-bold uppercase">
          {job.position}{" "}
          {/* This should come from the parent Component UserDashJobs.jsx */}
        </h1>
        <div className="flex justify-center space-x-4 mb-4 mt-2">
          <button
            className={`btn ${
              selectedTab === "Pending"
                ? "btn-active bg-black"
                : "btn-ghost bg-black/50"
            } text-white `}
            onClick={() => setSelectedTab("Pending")}
          >
            Pending {pendingCount}
          </button>
          <button
            className={`btn ${
              selectedTab === "Accepted"
                ? "btn-active bg-black"
                : "btn-ghost bg-black/50"
            } text-white`}
            onClick={() => setSelectedTab("Accepted")}
          >
            Accepted {approvedCount}
          </button>
          <button
            className={`btn ${
              selectedTab === "Rejected"
                ? "btn-active bg-black"
                : "btn-ghost bg-black/50"
            } text-white`}
            onClick={() => setSelectedTab("Rejected")}
          >
            Rejected {rejectedCount}
          </button>
        </div>
        {Array.isArray(profiles) &&
          profiles.map((profile) => {
            const applicant = job.applicants.find(
              (app) => app.student === profile.student
            );

            // Filter applications based on the selected tab
            if (
              (selectedTab === "Pending" && applicant?.status === "Pending") ||
              (selectedTab === "Accepted" &&
                applicant?.status === "Approved") ||
              (selectedTab === "Rejected" && applicant?.status === "Rejected")
            ) {
              return (
                <ProfileCard
                  key={profile._id}
                  profile={profile}
                  job={job}
                  onUpdateStatus={(newStatus) =>
                    handleUpdateStatus(job._id, profile.student, newStatus)
                  }
                />
              );
            }
            return null;
          })}

        {/*         {profiles.map((profile) => {
          const applicant = job.applicants.find(
            (app) => app.student === profile.student
          );

          // Filter applications based on the selected tab
          if (
            (selectedTab === "Pending" && applicant?.status === "Pending") ||
            (selectedTab === "Accepted" && applicant?.status === "Approved") ||
            (selectedTab === "Rejected" && applicant?.status === "Rejected")
          ) {
            return (
              <ProfileCard
                key={profile._id}
                profile={profile}
                job={job}
                onUpdateStatus={(newStatus) =>
                  handleUpdateStatus(job._id, profile.student, newStatus)
                }
              />
            );
          }
          return null;
        })} */}
      </div>
    </div>
  );
}

export default JobApplicants;
