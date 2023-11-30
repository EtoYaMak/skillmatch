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
  const [FfilteredJobs, setFFilteredJobs] = useState([]);
  const [sortBy, setSortBy] = useState("LATEST");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  const handleSortChange = (selectedValue) => {
    // Handle the sorting change here, for example, update the sortBy state
    setSortBy(selectedValue);
  };
  useEffect(() => {
    // Apply filters
    let filtered = [...jobs];

    // Category
    if (categoryFilter !== "") {
      filtered = filtered.filter((job) => job.department === categoryFilter);
    }

    // Location
    if (locationFilter !== "") {
      filtered = filtered.filter((job) => job.country === locationFilter);
    }

    // Salary
    if (salaryFilter !== "") {
      filtered = filtered.filter((job) => job.salary === salaryFilter);
    }

    // Sort
    if (sortBy === "ASCENDING") {
      filtered.sort((a, b) =>
        a.position
          .trim()
          .toLowerCase()
          .localeCompare(b.position.trim().toLowerCase())
      );
    } else if (sortBy === "DESCENDING") {
      filtered.sort((a, b) =>
        b.position
          .trim()
          .toLowerCase()
          .localeCompare(a.position.trim().toLowerCase())
      );
    } else {
      // Default to sorting by latest
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Apply pagination
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filtered;

    setFFilteredJobs(currentJobs);
  }, [jobs, categoryFilter, locationFilter, salaryFilter, sortBy, currentPage]);

  const itemsPerPage = 10;
  const [visibleJobs, setVisibleJobs] = useState(itemsPerPage);

  const showMoreJobs = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 5);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [banner, setBanner] = useState(true);

  const hideBanner = () => {
    setBanner(false);
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
          <SearchComponent className="h-24" />
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
      <div className="w-full flex justify-between flex-col sm:flex-row gap-2 sm:gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Location setLocationFilter={setLocationFilter} />
          <SearchCat setCategoryFilter={setCategoryFilter} />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <PayRange setSalaryFilter={setSalaryFilter} />
          <SortingFilter handleSortChange={handleSortChange} />
        </div>
      </div>

      <div className="recent pb-10  mx-auto">
        <>
          {Array.isArray(FfilteredJobs) ? (
            FfilteredJobs.slice(0, visibleJobs).map((job) => (
              <>
                <JobBoardComponent job={job} key={job._id} />
              </>
            ))
          ) : (
            <p>Loading All Jobs...</p>
          )}
          {/* Show More and Show Less buttons */}
          <div className="flex flex-row justify-center items-center gap-10  py-4">
            {FfilteredJobs.length > visibleJobs && (
              <button
                onClick={showMoreJobs}
                className="flex justify-center items-center w-[159px] h-[43px] ease-in-out duration-200 bg-[#C83055]  uppercase font-Poppins  px-3 rounded-xl py-2 text-white hover:text-white hover:scale-105 font-bold z-40 
                    "
              >
                Load more
              </button>
            )}
            {visibleJobs > itemsPerPage && <></>}
          </div>
        </>
      </div>
    </div>
  );
}

export default Home;
