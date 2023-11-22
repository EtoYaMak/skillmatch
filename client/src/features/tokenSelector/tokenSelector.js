// tokenSelector.js or a similar utility file
export const selectAuthToken = (state) => {
  // Adjust the logic here based on your application's requirements
  if (state.auth && state.auth.user && state.auth.user.token) {
    return state.auth.user.token;
  } else if (state.SAuser && state.SAuser.SAuser && state.SAuser.SAuser.token) {
    return state.SAuser.SAuser.token;
  }
  return null; // or throw an error if a token is mandatory
};
