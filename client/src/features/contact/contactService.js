import axios from "axios";

export const sendContactForm = async (formData) => {
  try {
    const response = await axios.post(
      "http://13.53.103.94/api/contact",
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
