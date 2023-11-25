import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllJobs, reset } from "../features/jobs/jobSlice";
import Slider from "react-slick";
import "../assets/slick-carousel/slick/slick.css";
import "../assets/slick-carousel/slick/slick-theme.css";
import FeaturedCardComp from "../components/Job/Components/FeaturedCardComp";
import JobBoardComponent from "../components/Job/Components/JobBoardComponent";
import SearchComponent from "../components/Misc/Search";
import {
  HiOutlineChevronDoubleDown,
  HiOutlineChevronDoubleUp,
} from "react-icons/hi";
import "semantic-ui-css/semantic.min.css";
import "../assets/slider.css";
import settings from "../components/Misc/slider_settings";
import SearchCat from "../components/Job/Components/BrowseFilters/SearchCat";
import Location from "../components/Job/Components/BrowseFilters/Location";
import PayRange from "../components/Job/Components/BrowseFilters/PayRange";
import SortingFilter from "../components/Job/Components/BrowseFilters/SortingFilter";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, isError, message, isLoading } = useSelector(
    (state) => state.jobs
  );
  const { student } = useSelector((state) => state.students);
  useEffect(() => {
    dispatch(getAllJobs());

    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);

  const remoteJobs = jobs.filter((job) =>
    job.setting.find((item) => item.name === "Remote" && item.value === true)
  );
  const [visibleJobs, setVisibleJobs] = useState(10);
  const itemsPerPage = 10; // Adjust this to the number of jobs to display per page
  const sortedJobs = [...jobs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const showMoreJobs = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 5);
  };

  const showLessJobs = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs - 5);
  };
  // Function to calculate the height of each card based on its content
  const calculateCardHeight = (job) => {
    // Add your logic to calculate the height based on job content
    // For example, you can use the number of lines in the job description
    const numberOfLines = job.description.split("\n").length;
    const baseHeight = 100; // Adjust this based on your design
    const lineHeight = 20; // Adjust this based on your design
    return baseHeight + numberOfLines * lineHeight;
  };
  // Assuming jobs is an array of job objects
  const maxCardHeight = Math.max(
    ...jobs.map((job) => calculateCardHeight(job))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [banner, setBanner] = useState(true);

  const hideBanner = () => {
    setBanner(false);
  };

  const filteredJobs = searchQuery
    ? jobs.filter((job) => {
        const lowerCaseQuery = searchQuery.toLowerCase();

        return (
          job.position.toLowerCase().includes(lowerCaseQuery) ||
          job.company.toLowerCase().includes(lowerCaseQuery) ||
          job.city.toLowerCase().includes(lowerCaseQuery) ||
          job.skills.some((skill) =>
            skill.toLowerCase().includes(lowerCaseQuery)
          )
        );
      })
    : jobs;

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  if (isLoading) {
    return (
      <div className="w-full flex-1 flex justify-center items-start h-screen">
        <span className="loading loading-spinner text-error w-14 mt-[10%]"></span>
      </div>
    );
  }
  return (
    <div className="justify-between items-center    mx-auto  bg-inherit max-w-[1100px]">
      <h1 className="text-center py-4 text-4xl text-[#333] select-none font-Poppins tracking-wide max-w-xs mx-auto font-bold">
        Find a Job Find a Job Find a Job
      </h1>
      {/* Search component */}
      <div className="flex w-full justify-center items-center min-h-max max-w-md mx-auto my-6 mb-14">
        <div className="flex justify-end flex-1 scale-125">
          <SearchComponent onSearch={handleSearch} className="h-24" />
        </div>
      </div>
      {/* BANNER */}
      {banner && (
        <div className="flex w-full px-[8rem] py-[2rem] rounded-3xl mx-auto justify-center items-center bg-transparent border text-black gap-4 font-Poppins text-lg">
          <p className="w-full max-w-fit">
            👉Currently Hiring? Reach out to our{" "}
            <a href="#" className="underline underline-offset-4">
              Members
            </a>{" "}
            on the 🏆best job portal
          </p>
          <span className="flex gap-4 w-full max-w-fit">
            <button className="bg-white text-black px-5 py-3 rounded-lg border border-black/20 hover:border-black/40  ">
              Post A Job
            </button>
            <button
              className="bg-white text-black px-5 py-3 rounded-lg border border-black/20 hover:border-black/40  "
              onClick={hideBanner}
            >
              Hide This
            </button>
          </span>
        </div>
      )}
      {/* TRUSTED BY */}
      <div className="flex font-Poppins gap-1 py-6 mb-12">
        <p className="text-[11px] min-w-fit">Trusted by </p>
        <span className="flex flex-row overflow-x-clip justify-between w-full ">
          <img
            src="https://remoteok.com/cdn-cgi/image/height=60,quality=85/https://remoteok.com/assets/microsoft.png?1634054013"
            className="w-56 grayscale hover:grayscale-0"
          />
          <img
            src="https://remoteok.com/cdn-cgi/image/height=60,quality=85/https://remoteok.com/assets/microsoft.png?1634054013"
            className="w-56 grayscale hover:grayscale-0"
          />
          <img
            src="https://remoteok.com/cdn-cgi/image/height=60,quality=85/https://remoteok.com/assets/microsoft.png?1634054013"
            className="w-56 grayscale hover:grayscale-0"
          />
          <img
            src="https://remoteok.com/cdn-cgi/image/height=60,quality=85/https://remoteok.com/assets/microsoft.png?1634054013"
            className="w-56 grayscale hover:grayscale-0"
          />
          <img
            src="https://remoteok.com/cdn-cgi/image/height=60,quality=85/https://remoteok.com/assets/microsoft.png?1634054013"
            className="w-56 grayscale hover:grayscale-0"
          />
        </span>
      </div>
      <div className=" w-full flex justify-between">
        <div className="space-x-4 ">
          <SearchCat />
          <Location />
          <PayRange />
        </div>

        <SortingFilter />
      </div>

      {/* Conditionally render the message */}
      {/* <h1 className="text-center font-medium py-4 text-2xl text-[#333] select-none font-Poppins tracking-wide">
        REMOTE
      </h1>
      <div className="Carousel Slider cursor-pointer rounded-[3rem]">
        <Slider {...settings}>
          {remoteJobs.length === 0 ? (
            <p className="text-2xl font-Inter">No Jobs Found</p>
          ) : (
            remoteJobs.map((job) => (
              <div
                key={job._id}
                className=""
                style={{ minHeight: `${maxCardHeight}px` }}
              >
                <FeaturedCardComp job={job} />
              </div>
            ))
          )}
        </Slider>
      </div> */}

      <div className="recent pb-10  mx-auto">
        {filteredJobs.length === 0 ? (
          <p className="text-2xl text-white text-center">No jobs found</p>
        ) : (
          <>
            {filteredJobs.slice(0, visibleJobs).map((job) => (
              <JobBoardComponent job={job} key={job._id} />
            ))}

            {/* Show More and Show Less buttons */}
            <div className="flex flex-row justify-center items-center gap-10  py-4">
              {filteredJobs.length > visibleJobs && (
                <button
                  onClick={showMoreJobs}
                  className="flex justify-center items-center w-[159px] h-[43px] ease-in-out duration-200 bg-[#C83055]  uppercase font-Poppins  px-3 rounded-xl py-2 text-white hover:text-white hover:scale-105 font-bold z-40 
                    "
                >
                  Load more
                </button>
              )}
              {visibleJobs > itemsPerPage && (
                <>
                  {/*                   
                  <button
                    onClick={showLessJobs}
                    className="primary-btn duration-200 ease-in-out shadow-[0px_4px_7px_rgb(0,0,0,0.4)]
                   flex items-center justify-center
                   bg-[#1c1f21] hover:bg-[#d0333c] 
                   text-[#d4d7d7] hover:text-[#d4d7d7]
                     w-12 h-12  rounded-full"
                  >
                    Load less
                  </button> */}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
