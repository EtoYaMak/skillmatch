import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
/* import { createProfile } from "../features/profiles/profileSlice";
import StudentProfile from "../components/studentProfile";  */

function StudentDash() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { student, isError, message } = useSelector((state) => state.students);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!student) {
      navigate("/loginS");
    }
  }, [student, navigate, isError, message, dispatch]);

  return (
    <>
      <div className="w-max mx-auto h-fit">
        <span className="flex flex-col items-center gap-10 mt-10 w-full h-full">
          <p className="bg-inherit text-3xl font-Inter font-bold">
            Sorry! Currently working on a Student Dashboard{" "}
          </p>
          <span className="flex flex-row gap-4 justify-evenly w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="120px"
            >
              <path
                fill="none"
                stroke="#000"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="32"
                d="M436.7 184.1a27.2 27.2 0 0 1-38.3 0l-22.5-22.5a27.1 27.1 0 0 1 0-38.3l50.9-50.9a.8.8 0 0 0-.3-1.3A95.3 95.3 0 0 0 324.1 91c-26 25.7-27.4 64.3-18 98a27 27 0 0 1-7.6 27.1L125.5 377a40.8 40.8 0 1 0 57.6 57.5l162.1-173.3a27 27 0 0 1 26.8-7.7c33.5 9 71.5 7.3 97-17.9 27.6-27 33.5-75 20.2-102.3a.8.8 0 0 0-1.4-.2Z"
              />
              <path
                fill="none"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="m224 284-31-30.3a18.2 18.2 0 0 1-3.3-21.3 20.8 20.8 0 0 1 3.5-4.7l15.6-15.2a18.7 18.7 0 0 1 5.7-4 18.1 18.1 0 0 1 20 3.7l33.4 32.5m49.1 46.6c41 38.1 90.7 83.3 110 99.4a13.5 13.5 0 0 1 1 20L394.6 444a14 14 0 0 1-20.3-.8c-16.5-19.1-61-67-99.2-107"
              />
              <path
                fill="none"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="m17.3 193.5 29.4-28.7a4.7 4.7 0 0 1 3.5-1.4 4.8 4.8 0 0 1 3.4 1.4h0a9.9 9.9 0 0 0 8.2 2.7c3.8-.4 7.9-1.6 10.5-4 6-5.9-1-17.3 4.4-24.6a207 207 0 0 1 19.7-22.6 217 217 0 0 1 70-44.5 107.3 107.3 0 0 1 40.3-7.8c22.6 0 40 10 46.2 15.7a89.5 89.5 0 0 1 10.3 11.6 79 79 0 0 0-9.2-2.8 68.8 68.8 0 0 0-20-1.2 80 80 0 0 0-38 14c-13.9 11-19.9 25.7-20.8 44.7-.7 14.1 2.7 22 36 55.5a6.6 6.6 0 0 1-.2 9.1l-18.3 18a6.9 6.9 0 0 1-9.5.1c-22-22-36.7-33-45-38.1s-15-6.5-18.3-6.9a30.9 30.9 0 0 0-18.3 3.9 11.4 11.4 0 0 0-2.6 2 14.1 14.1 0 0 0 .4 20l1.7 1.7a4.6 4.6 0 0 1 0 6.6l-29.4 28.7a4.7 4.7 0 0 1-3.4 1.4 4.9 4.9 0 0 1-3.4-1.4l-47.6-46.4a4.9 4.9 0 0 1 0-6.7Z"
              />
            </svg>
          </span>
        </span>
      </div>
      {/* <StudentProfile /> */}
    </>
  );
}

export default StudentDash;
