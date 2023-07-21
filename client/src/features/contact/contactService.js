import axios from "axios";

/* "http://localhost:4000/api/contact", */
export const sendContactForm = async (formData) => {
  try {
    const response = await axios.post(
      "http://16.171.182.16/api/contact",
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
