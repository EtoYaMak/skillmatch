import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllJobs, reset } from "../features/jobs/jobSlice";
import Slider from "react-slick";
import "../assets/slick-carousel/slick/slick.css";
import "../assets/slick-carousel/slick/slick-theme.css";
import FeaturedCardComp from "../components/FeaturedCardComp";
import JobBoardComponent from "../components/JobBoardComponent";
import {
  HiOutlineChevronDoubleDown,
  HiOutlineChevronDoubleUp,
} from "react-icons/hi";
import "semantic-ui-css/semantic.min.css";
import "../assets/slider.css";
import settings from "../components/level_2/slider_settings";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, isError, message } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getAllJobs());
    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);

  const remoteJobs = jobs.filter((job) =>
    job.setting.find((item) => item.name === "remote" && item.value === true)
  );
  const [visibleJobs, setVisibleJobs] = useState(5);
  const itemsPerPage = 5; // Adjust this to the number of jobs to display per page
  const sortedJobs = [...jobs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const showMoreJobs = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 5);
  };

  const showLessJobs = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs - 5);
  };

  return (
    <div className="justify-between items-center max-w-[1240px]  px-4  mx-auto  bg-inherit">
      {/* Conditionally render the message */}
      <h1 className="text-center font-semibold py-4 text-2xl text-[#f2f3f3] select-none font-Inter tracking-[0.25em]">
        REMOTE
      </h1>
      <div className="Carousel Slider cursor-pointer">
        <Slider {...settings}>
          {remoteJobs.length === 0 ? (
            <p className="text-2xl font-Inter">No Jobs Available</p>
          ) : (
            remoteJobs.map((job) => (
              <div key={job._id}>
                <FeaturedCardComp job={job} />
              </div>
            ))
          )}
        </Slider>
      </div>
      <h1 className="text-center font-semibold mt-10 pb-4 text-2xl text-[#f2f3f3] select-none font-Inter tracking-[0.25em]">
        RECENT
      </h1>
      <div className="recent pb-10 ">
        {sortedJobs.length === 0 ? (
          <p className="text-2xl text-white text-center">No jobs found</p>
        ) : (
          <>
            {sortedJobs.slice(0, visibleJobs).map((job) => (
              <JobBoardComponent job={job} key={job._id} />
            ))}

            {/* Show More and Show Less buttons */}
            <div className="flex flex-row justify-center items-center gap-10 ">
              {sortedJobs.length > visibleJobs && (
                <button
                  onClick={showMoreJobs}
                  className="duration-200 ease-in-out 
                   bg-[#d0333c] hover:bg-[#1c1f21] 
                    text-[#d4d7d7] hover:text-[#d0333c]
                    w-12 h-12 rounded-full
                    flex items-center justify-center
                    "
                >
                  <HiOutlineChevronDoubleDown size={16} />
                </button>
              )}
              {visibleJobs > itemsPerPage && (
                <button
                  onClick={showLessJobs}
                  className="primary-btn duration-200 ease-in-out
                   flex items-center justify-center
                    bg-[#d0333c] hover:bg-[#1c1f21] 
                     text-[#d4d7d7] hover:text-[#d0333c]
                     w-12 h-12  rounded-full"
                >
                  <HiOutlineChevronDoubleUp size={16} />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
