import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllJobs, reset } from "../features/jobs/jobSlice";
import Slider from "react-slick";
import "../assets/slick-carousel/slick/slick.css";
import "../assets/slick-carousel/slick/slick-theme.css";
import FeaturedCardComp from "../components/FeaturedCardComp";
import JobBoardComponent from "../components/JobBoardComponent";
import { /* Button, */ Icon } from "semantic-ui-react";
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

  const remoteJobs = jobs.filter(
    (job) => job.setting.find((item) => item.name === "remote").value === true
  );
  const [visibleJobs, setVisibleJobs] = useState(5);

  const showMoreJobs = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 5);
  };

  const showLessJobs = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs - 5);
  };

  const sortedJobs = [...jobs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="justify-between items-center max-w-[1240px] max-h-fit px-4 my-5 mx-auto mb-5">
      <h1 className="text-center font-semibold my-5 text-3xl text-[#d0333c] select-none">
        Remote Jobs
      </h1>

      <div className="Carousel Slider cursor-pointer">
        <Slider {...settings}>
          {remoteJobs.length === 0 ? (
            <p className="text-2xl font-mono">No Jobs Available</p>
          ) : (
            remoteJobs.map((job) => (
              <div key={job._id} className="featuredCarousel">
                <FeaturedCardComp job={job} />
              </div>
            ))
          )}
        </Slider>
      </div>

      <h1 className="text-center font-semibold mt-10 pb-4 text-3xl text-[#d0333c] select-none">
        Recent Job Postings
      </h1>

      <div className="recent pb-5">
        {sortedJobs.length === 0 ? (
          <p className="text-2xl text-white text-center">No jobs found</p>
        ) : (
          <>
            {sortedJobs.slice(0, visibleJobs).map((job) => (
              <JobBoardComponent job={job} key={job._id} />
            ))}
            {visibleJobs < sortedJobs.length && (
              <div className="load-more-btn-container flex justify-center gap-2 py-4">
                <button
                  onClick={showMoreJobs}
                  className="primary-btn text-lg font-semibold bg-[#d0333c] hover:bg-[#1c1f21] py-2 px-4 rounded-md text-[#d4d7d7] hover:text-[#d0333c]"
                >
                  Show More
                  <Icon name="chevron down" className="pl-2 bg-transparent" />
                </button>
                {visibleJobs > 5 && (
                  <button
                    onClick={showLessJobs}
                    className="primary-btn text-lg font-semibold bg-[#d0333c] hover:bg-[#1c1f21] py-2 px-4 rounded-md text-[#d4d7d7] hover:text-[#d0333c]"
                  >
                    Show Less
                    <Icon name="chevron up" className="pl-2 bg-transparent" />
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
