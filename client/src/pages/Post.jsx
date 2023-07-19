import React from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import JobForm from "../components/JobForm";
const Post = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      /* navigate("/login"); */
      /* toast.error("Job Posting is for Employers only"); */
    }
  }, [user, navigate]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="my-4 pb-1 ">
        {user ? (
          <>
            <section className="text-center text-white">
              <h1 className="text-xl font-semibold">
                Welcome <br />
                <span className="hover:text-[#ee6555]">
                  {user && user.name}
                </span>
              </h1>
              <p className="text-xl font-thin pt-2 pb-4">
                Hire the best. Share your job post with thousands of job
                seekers.
              </p>
            </section>

            <JobForm />
          </>
        ) : (
          <div className="text-center h-[50vh] flex justify-center items-center">
            <p className="text-2xl text-white tracking-[0.15em]">
              Want to post a job?{" "}
              <Link to="/register" className="text-[#f3900b] hover:underline">
                Click here to register as a job poster
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
