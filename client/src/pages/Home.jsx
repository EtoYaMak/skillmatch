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
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  const handleSortChange = (selectedValue) => {
    // Handle the sorting change here, for example, update the sortBy state
    setSortBy(selectedValue);
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  useEffect(() => {
    // Apply filters
    let filtered = [...jobs];
    // Search
    if (searchQuery !== "") {
      filtered = filtered.filter(
        (job) =>
          job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
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
  }, [
    jobs,
    categoryFilter,
    locationFilter,
    salaryFilter,
    sortBy,
    currentPage,
    searchQuery,
  ]);

  const itemsPerPage = 5;
  const [visibleJobs, setVisibleJobs] = useState(itemsPerPage);

  const showMoreJobs = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 5);
  };

  const [banner, setBanner] = useState(false);

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
    <div className="mx-auto h-full  bg-inherit max-w-[1240px]">
      <h1 className="text-center py-4 text-3xl sm:text-4xl text-[#333] select-none font-Poppins tracking-wide max-w-xs mx-auto font-bold ">
        Find a Job
      </h1>
      {/* Search component */}
      <div className="flex sm:w-full justify-center items-center min-h-max max-w-md mx-auto min-[425px]:my-6 my-2 sm:mb-14">
        <div className="flex justify-end flex-1 sm:scale-125">
          <SearchComponent onSearch={handleSearch} className="h-24" />
        </div>
      </div>
      {/* BANNER */}
      {banner && (
        <>
          <div className=" hidden sm:flex sm:flex-row flex-col w-full px-2 sm:px-[4rem] py-[2rem] rounded-3xl mx-auto justify-between items-center bg-[#1f1f1f] border text-white  gap-4 font-Poppins text-lg max-w-[800px]">
            <p className="w-full max-w-fit">
              👉Currently Hiring? Reach out to our{" "}
              <a href="#" className="underline underline-offset-4">
                Members
              </a>{" "}
              on the 🏆best job portal
            </p>
            <span className="flex gap-4 w-full justify-center items-center">
              <button
                className="bg-orange-500 text-white px-5 py-3 rounded-lg border border-black/20 hover:border-black/40"
                onClick={() => navigate("/post")}
              >
                Post A Job
              </button>
              <button
                className="bg-orange-500 text-white px-5 py-3 rounded-lg border border-black/20 hover:border-black/40  "
                onClick={hideBanner}
              >
                Hide This
              </button>
            </span>
          </div>
          {/* TRUSTED BY */}
          <div className="flex justify-center items-center font-Poppins gap-1 py-1 my-4 sm:mb-12 mx-8 ">
            <p className="text-[14px] min-w-fit">Trusted by </p>
            <span className="flex flex-row overflow-x-clip justify-between ">
              <img
                src="https://remoteok.com/cdn-cgi/image/height=60,quality=85/https://remoteok.com/assets/microsoft.png?1634054013"
                alt="hi"
                className="w-24 sm:w-56 saturate-50 hover:saturate-100 ease-in-out duration-100 z-0"
              />
            </span>
          </div>{" "}
        </>
      )}

      <div className="flex flex-col min-[850px]:flex-row sm:justify-between  gap-2 sm:gap-4 max-w-[960px] sm:mx-auto mx-2">
        <div className="flex flex-col  min-[425px]:flex-row min-[425px]:gap-4 gap-2">
          <SearchCat setCategoryFilter={setCategoryFilter} />
          <Location setLocationFilter={setLocationFilter} />
        </div>
        <div className="flex flex-row min-[425px]:gap-4 gap-2">
          <PayRange setSalaryFilter={setSalaryFilter} />
          <SortingFilter handleSortChange={handleSortChange} />
        </div>
      </div>

      <div className="h-full pb-4 sm:px-2  mx-auto pt-3">
        <>
          {Array.isArray(FfilteredJobs) ? (
            FfilteredJobs.slice(0, visibleJobs).map((job) => (
              <React.Fragment key={job._id}>
                <JobBoardComponent job={job} />
              </React.Fragment>
            ))
          ) : (
            <p>Loading All Jobs...</p>
          )}
          {/* Show More and Show Less buttons */}
          <div className="flex flex-row justify-center items-center gap-10  mt-4 w-fit mx-auto">
            {FfilteredJobs.length > visibleJobs && (
              <button
                onClick={showMoreJobs}
                className="flex justify-center items-center w-[159px] h-[43px] ease-in-out duration-200 bg-[#C83055]  uppercase font-Poppins  px-3 rounded-xl py-2 text-white hover:text-white hover:scale-105 font-bold z-40"
              >
                Load more
              </button>
            )}
          </div>
        </>
      </div>
    </div>
  );
}

export default Home;
