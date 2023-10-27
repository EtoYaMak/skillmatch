import React from "react";
import JobFormAdmin from "./JobFormAdmin";
import { useSelector } from "react-redux";
function AdminDash() {
  const { SAuser } = useSelector((state) => state.SAuser);
  return (
    <div className="h-fit py-4 px-2">
      <div className="flex flex-wrap w-full gap-2">
        <div className="grid h-fit card bg-base-300 mx-auto rounded-box">
          <ul className="menu flex-row min-[900px]:flex-col w-fit bg-base-200 text-white  rounded-box">
            <li>
              <a>Post</a>
            </li>
            <li>
              <a>Analytics</a>
            </li>
            <li>
              <a>Users</a>
            </li>
          </ul>
        </div>

        <div className="divider w-min[900px]:divider-horizontal"></div>
        <div className="grid h-fit flex-grow card bg-base-300 rounded-box  px-4">
          <JobFormAdmin />
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
