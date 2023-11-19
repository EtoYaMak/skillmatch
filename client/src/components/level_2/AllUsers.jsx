function AllUsers({ users }) {
  return (
    <div className="text-xl text-center font-Poppins">
      <h2 className="font-semibold text-xl">All Students</h2>
      <div className="flex flex-row justify-center items-center">
        {Array.isArray(users) ? (
          users.map((user) => (
            <div key={user?._id} className="border p-4 m-2">
              <h3 className="font-bold">{user?.name}</h3>
              <p>Email: {user?.email}</p>
              <p>Activated: {user?.isActive ? "Yes" : "No"}</p>
            </div>
          ))
        ) : (
          <p>Loading students...</p>
        )}
      </div>
      <img
        src="https://skillmint-job-images.s3.eu-west-2.amazonaws.com/job-images/1700315173496-avatar.png"
        alt=""
      />
      <h1>Image</h1>
    </div>
  );
}

export default AllUsers;
