import axios from "axios";
/* const API_URL = "http://18.169.159.127/api/contact"; */
const API_URL = "http://localhost:4000/api/contact";

export const sendContactForm = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
