import React from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
/* import { toast } from "react-toastify"; */
import JobPost from "../components/Job/Post/JobPost";
const Post = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      /* navigate("/login"); */
      /* toast.error("Job Posting is for Employers only"); */
    }
  }, [user, navigate]);
  if (isLoading) {
    return (
      <div className="w-full flex-1 flex justify-center items-start h-screen">
        <span className="loading loading-spinner text-error w-14 mt-[10%]"></span>
      </div>
    );
  }
  return (
    <div className="select-none w-full h-screen">
      <h1 className="hiddenHSEO">Skillmint Post A Job Page</h1>
      <h2 className="hiddenHSEO">
        Start Posting Jobs and find the best candidate
      </h2>
      {user ? (
        user.isActive ? (
          <>
            <JobPost />
          </>
        ) : (
          <div className="text-center h-full flex justify-center items-center">
            <p className="text-2xl text-white font-Poppins ">
              Your account is not activated. Please activate your account to
              post a job.
            </p>
          </div>
        )
      ) : (
        <div className="text-center flex justify-center items-center h-full ">
          <p className="text-2xl text-white font-Poppins ">
            Want to post a job?{" "}
            <Link to="/register" className="text-[#333]/70 hover:text-[#000]">
              Click here to register as a job poster
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default Post;
