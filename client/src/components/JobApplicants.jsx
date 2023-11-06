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
      className={`mx-auto rounded-lg shadow-md p-4 mb-4 flex flex-col sm:flex-row items-stretch 
      justify-between select-none min-w-max max-w-2xl ease-linear duration-200 h-full ${
        isHovered ? "bg-black/60 scale-[101%]" : "bg-[#1c1f21]"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* First Column */}
      <div className="flex flex-col sm:items-start items-center justify-center space-y-4 py-2 w-full">
        <h2
          className={`uppercase text-xl font-Inter font-bold ${
            isHovered ? "text-white" : "text-white"
          }`}
        >
          {profile.studentName}
        </h2>
        <p
          className={`uppercase text-lg font-Inter font-medium ${
            isHovered ? "text-white" : "text-white"
          }`}
        >
          {profile.Degree} {profile.DegreeTitle}
        </p>
        <p
          className={`uppercase text-md font-Inter font-normal ${
            isHovered ? "text-white" : "text-white"
          }`}
        >
          {profile.University}
        </p>
      </div>

      <div className="flex flex-row justify-evenly w-full">
        {/* Second Column */}
        <div className="flex flex-row sm:flex-col justify-center items-center space-y-2 w-max">
          <button
            className={`btn btn-ghost ease-in-out duration-300 rounded-md px-2 py-1 
           hover:bg-[#fff] appearance-none  hover:text-black font-Inter
            text-lg w-32 mb-2 ${isHovered ? "text-white" : "text-white"}`}
            onClick={handleViewCV}
          >
            View CV
          </button>
          <div className="flex flex-col items-center space-y-2">
            <p
              className={`text-center font-Inter font-bold text-lg uppercase w-32 ${
                isHovered ? "text-white/80" : "text-white"
              }`}
            >
              Status
            </p>
            <p
              className={`text-center font-Inter font-bold text-lg uppercase w-32 ${getStatusClass(
                applicant ? applicant.status : "N/A"
              )}`}
            >
              {applicant ? applicant.status : "N/A"}
            </p>
          </div>
        </div>

        {/* Third Column */}
        <div className="flex flex-row sm:flex-col justify-center items-center gap-3 py-2 px-2 w-max">
          {applicant?.status !== "Approved" && (
            <button
              className="btn btn-ghost hover:bg-green-800 hover:text-white text-green-500 ease-in-out duration-300 rounded-md px-2 py-1 font-Inter"
              onClick={() => onUpdateStatus("Approved")}
            >
              Approve
            </button>
          )}
          {applicant?.status !== "Rejected" && (
            <button
              className="btn btn-ghost ease-in-out duration-300 rounded-md px-2 py-1 hover:bg-red-800 hover:text-white text-red-500 font-Inter"
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
    <div className="text-white">Loading...</div>
  ) : jobError ? (
    <div className="text-white">Error while fetching job</div>
  ) : !job ? (
    <div className="text-white">No job available</div>
  ) : (
    <div className="w-5/6 min-w-fit mx-auto font-Inter bg-[#25292b] rounded-b-xl p-4 mb-8 min-h-fit h-[40vh]">
      <div className="">
        <h1 className="text-[#d0333c] tracking-wider text-2xl text-center font-Inter font-bold uppercase">
          {job.position}{" "}
          {/* This should come from the parent Component UserDashJobs.jsx */}
        </h1>
        <div className="flex justify-center space-x-4 mb-4 mt-2">
          <button
            className={`btn ${
              selectedTab === "Pending" ? "btn-active bg-black/40" : "btn-ghost"
            } text-white `}
            onClick={() => setSelectedTab("Pending")}
          >
            Pending {pendingCount}
          </button>
          <button
            className={`btn ${
              selectedTab === "Accepted"
                ? "btn-active bg-black/40"
                : "btn-ghost"
            } text-white`}
            onClick={() => setSelectedTab("Accepted")}
          >
            Accepted {approvedCount}
          </button>
          <button
            className={`btn ${
              selectedTab === "Rejected"
                ? "btn-active bg-black/40"
                : "btn-ghost"
            } text-white`}
            onClick={() => setSelectedTab("Rejected")}
          >
            Rejected {rejectedCount}
          </button>
        </div>
        {profiles.map((profile) => {
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
        })}
      </div>
    </div>
  );
}

export default JobApplicants;
