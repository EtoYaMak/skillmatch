import { Link, useNavigate } from "react-router-dom";
import { getAllJobsTwo } from "../../features/jobs/jobSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function AllStudents({ students, alljobs }) {
  const getJobName = (jobId) => {
    const foundJob = alljobs.find((job) => job._id === jobId);
    return foundJob ? foundJob.position : "Job Not Found";
  };
  return (
    <div className="text-xl text-center font-Poppins h-screen">
      <h2 className="font-semibold text-xl">All Students</h2>
      <div className="flex flex-col sm:flex-row sm:justify-start items-start h-full max-w-5xl mx-auto">
        {Array.isArray(students) ? (
          students.map((student) => (
            <div
              key={student?._id}
              className="border p-2 my-2 mx-0 sm:m-2 w-full sm:w-[50vw] min-h-[20vh] max-h-fit flex flex-col justify-evenly"
            >
              <h3 className="font-bold">{student?.name}</h3>
              <p>{student?.email}</p>
              <p>Activated: {student?.isActive ? "Yes" : "No"}</p>
              <div tabIndex={0} className="border ">
                <div className=" text-xl font-medium">Applied Jobs:</div>
                <div className="h-24 overflow-hidden hover:overflow-y-scroll  p-2">
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
                          className="w-24 text-center rounded-3xl text-sm text-white font-Poppins"
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

export default AllStudents;
