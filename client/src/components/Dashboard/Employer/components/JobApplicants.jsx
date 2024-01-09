import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobId,
  updateApplicationStatus,
} from "../../../../features/jobs/jobSlice";
import {
  getStudentProfile,
  SAgetStudentProfile,
} from "../../../../features/profiles/profileSlice";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheck, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

//
function ProfileCard({ profile, onUpdateStatus, job }) {
  const [isHovered, setIsHovered] = useState(false);
  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-500";
      case "Rejected":
        return "text-red-500";
      case "Pending":
        return "text-black";
      default:
        return "text-blue-500";
    }
  };
  const applicant = job.applicants.find(
    (app) => app.student === profile.student
  );

  return (
    /* Profile Card */

    <tbody>
      {/* row*/}
      <tr className="hover:bg-black/5">
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-14 h-14">
                <img
                  src={profile.profileImage}
                  alt="Avatar for Job Applicants"
                />
              </div>
            </div>
            <div>
              <div className="font-bold">
                {profile.headerContent.FirstName}{" "}
                {profile.headerContent.MiddleName}{" "}
                {profile.headerContent.LastName}
              </div>
              <div className="text-sm opacity-90 font-medium">
                {profile.headerContent.Location}
              </div>
            </div>
          </div>
        </td>
        <td className="font-semibold">
          {job.position}

          <br />
          <span className="font-normal">{job.company}</span>
        </td>
        <td>
          <a
            href={profile.ApplicantCV}
            target="_blank"
            className="btn btn-ghost btn-sm"
          >
            Resume
          </a>
        </td>
        <td>
          <a
            href={`/profile/${profile.student}`}
            target="_blank"
            className="btn btn-ghost btn-sm"
          >
            Profile
          </a>
        </td>
        <th>
          <span className=" flex justify-center gap-2 items-center">
            {applicant?.status !== "Approved" && (
              <button
                className="btn btn-ghost btn-sm hover:text-green-500"
                onClick={() => onUpdateStatus("Approved")}
              >
                <FaCheck />
              </button>
            )}
            {applicant?.status !== "Rejected" && (
              <button
                className="btn btn-ghost btn-sm hover:text-red-500"
                onClick={() => onUpdateStatus("Rejected")}
              >
                <FaXmark size={15} />
              </button>
            )}
          </span>
        </th>
      </tr>
    </tbody>
  );
}

function JobApplicants() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const handleGoBack = () => {
    navigate(-1); // Go back one step in the history stack
  };

  return jobStatus ? (
    <div className="text-black text-center w-fit">Loading...</div>
  ) : jobError ? (
    <div className="text-black text-center w-fit">Error while fetching job</div>
  ) : !job ? (
    <div className="text-black text-center w-full">No job available</div>
  ) : (
    <div className="font-Poppins max-w-[1280px] mx-auto min-h-screen ">
      {/* GO BACK */}
      <span className="flex justify-center relative items-center py-4 ">
        <button
          className="btn btn-ghost btn-md absolute left-10 flex font-Poppins text-lg font-medium gap-2"
          onClick={() => handleGoBack()}
        >
          <FaRegArrowAltCircleLeft size={22} />
          Dashboard
        </button>
        <div className=" flex justify-center items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-20 h-20">
              <img src={job.logo} alt="Avatar for Job Applicants" />
            </div>
          </div>
          {/* JOB Details */}
          <span>
            <h1 className="text-black tracking-wider text-2xl text-center font-Poppins font-bold uppercase ">
              {job.position}
            </h1>
            <h1 className="text-black/60 tracking-wider text-xl text-center font-Poppins font-medium uppercase">
              {job.company}
            </h1>
          </span>
        </div>
      </span>
      {/* TABS */}
      <div
        role="tablist"
        className="tabs tabs-boxed bg-transparent justify-center gap-4"
      >
        <a
          role="tab"
          className={`tab hover:text-black text-black/70 ${
            selectedTab === "Pending"
              ? "bg-black text-white hover:text-white"
              : ""
          }`}
          onClick={() => setSelectedTab("Pending")}
        >
          {pendingCount} Pending Review
        </a>
        <a
          role="tab"
          className={`tab hover:text-black text-black/70 ${
            selectedTab === "Accepted"
              ? "bg-black text-white hover:text-white"
              : ""
          }`}
          onClick={() => setSelectedTab("Accepted")}
        >
          {approvedCount} Approved
        </a>
        <a
          role="tab"
          className={`tab hover:text-black text-black/70 ${
            selectedTab === "Rejected"
              ? "bg-black text-white hover:text-white"
              : ""
          }`}
          onClick={() => setSelectedTab("Rejected")}
        >
          {rejectedCount} Rejected
        </a>
      </div>
      {/* Profile Component */}
      <div className="flex justify-start relative w-full pt-5">
        <div className="overflow-x-auto w-full">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-black text-[12px]">
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Name</th>
                <th>Job Applied to</th>
                <th>Resume</th>
                <th>Profile</th>
                <th></th>
              </tr>
            </thead>
            {Array.isArray(profiles) &&
              profiles.map((profile) => {
                const applicant = job.applicants.find(
                  (app) => app.student === profile.student
                );
                // Filter applications based on the selected tab
                if (
                  (selectedTab === "Pending" &&
                    applicant?.status === "Pending") ||
                  (selectedTab === "Accepted" &&
                    applicant?.status === "Approved") ||
                  (selectedTab === "Rejected" &&
                    applicant?.status === "Rejected")
                ) {
                  return (
                    <>
                      <ProfileCard
                        key={profile._id}
                        profile={profile}
                        job={job}
                        onUpdateStatus={(newStatus) =>
                          handleUpdateStatus(
                            job._id,
                            profile.student,
                            newStatus
                          )
                        }
                      />
                    </>
                  );
                }
                return null;
              })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default JobApplicants;
