import React, { useEffect, useState } from "react";
import SearchComponent from "../Search";

function AllUsers({ students, alljobs }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const getJobName = (jobId) => {
    const foundJob = alljobs.find((job) => job._id === jobId);
    return foundJob ? foundJob.position : "Job Not Found";
  };
  useEffect(() => {
    setCurrentPage(1); // Reset the current page when search query changes
  }, [searchQuery]);

  const filteredUsers = searchQuery
    ? students.filter(
        (student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : students;

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="text-xl  font-Poppins">
      <div className="h-24 w-full flex flex-row items-center justify-start  bg-white">
        <div className="w-full">
          <SearchComponent onSearch={handleSearch} />
        </div>
      </div>
      <h2 className="font-semibold text-xl text-center">All Students</h2>
      <div className="flex flex-row justify-between items-center font-Poppins font-bold px-4 py-2 w-full border-b border-black text-center">
        <h1 className="w-1/3 text-start">Name</h1>
        <h1 className="w-1/3 text-start">Email</h1>
        {/*         <h1 className="w-1/4 text-center">Activated</h1> */}
        <h1 className="w-1/3 text-start">Jobs</h1>
      </div>
      <div className="flex flex-col items-start justify-evenly w-full bg-white ">
        {Array.isArray(filteredUsers) ? (
          filteredUsers.map((student) => (
            <div
              key={student?._id}
              className="flex flex-wrap w-full text-center overflow-hidden p-4 my-2 "
            >
              <h3 className="font-bold w-1/3 text-start ">{student?.name}</h3>
              <p className="text-start w-1/3 flex-wrap">{student?.email}</p>
              {/*               <p className="font-bold w-1/3 ">
                {student?.isActive ? "Yes" : "No"}
              </p> */}
              <div tabIndex={0} className="w-1/4">
                <div className=" text-xl font-medium text-start">
                  Applied Jobs {student?.appliedJobs.length}
                </div>
                <div className="h-24 hidden overflow-hidden hover:overflow-y-scroll  p-2 min-w-[340px]">
                  <h1 className="text-start">
                    {student?.appliedJobs?.map((job) => (
                      <p
                        key={job?._id}
                        className="flex justify-start gap-2 space-y-1 items-center font-Poppins text-[14px]"
                      >
                        <h1
                          style={{
                            backgroundColor:
                              job?.status === "Rejected"
                                ? "red"
                                : job?.status === "Pending"
                                ? "black"
                                : "blue",
                          }}
                          className=" w-24 text-center rounded-3xl text-sm text-white font-Poppins"
                        >
                          {job?.status}
                        </h1>
                        <a
                          href={`/jobs/${job?.job}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className=""
                        >
                          {getJobName(job?.job)}
                          {/* I Want this to show the Job name from alljobs by finding the alljobs entry with ID of job?.job */}
                        </a>
                      </p>
                    ))}
                  </h1>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading students...</p>
        )}
      </div>
    </div>
  );
}

export default AllUsers;
