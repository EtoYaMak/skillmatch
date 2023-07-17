import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  sendContactFormAsync,
  resetFormState,
} from "../features/contact/contactSlice";
import DOMPurify from "dompurify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { name, email, message } = formData;
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.contact);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitize user input
    const sanitizedFormData = {
      name: DOMPurify.sanitize(formData.name),
      email: DOMPurify.sanitize(formData.email),
      message: DOMPurify.sanitize(formData.message),
    };

    dispatch(sendContactFormAsync(sanitizedFormData));
    setFormData({ name: "", email: "", message: "" }); // Reset form fields
  };

  // Reset form state on component unmount or success state
  useEffect(() => {
    return () => {
      dispatch(resetFormState());
    };
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto">
      <section className="text-gray-400 body-font font-Inter">
        <div className="container px-5 py-5 mx-auto bg-zinc-800 rounded-xl">
          <div className="flex flex-col text-center w-full mb-12 bg-inherit">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-50 bg-inherit font-Inter">
              Contact Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base bg-inherit">
              Connect with Skillmint Team by Sending us a Message!
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto bg-inherit">
            {success && (
              <p className="text-green-500 mb-4">Message sent successfully!</p>
            )}
            {error && (
              <p className="text-red-500 mb-4">
                Error occurred. Please try again.
              </p>
            )}
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap m-2 bg-inherit"
            >
              <div className="p-2 w-full sm:w-1/2 bg-inherit">
                <div className="relative bg-inherit">
                  <label
                    htmlFor="name"
                    className="leading-7 text-md text-zinc-200 bg-inherit font-Inter font-semibold"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full sm:w-1/2 bg-inherit">
                <div className="relative bg-inherit">
                  <label
                    htmlFor="email"
                    className="leading-7 text-md text-zinc-200 bg-inherit font-Inter font-semibold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full bg-inherit">
                <div className="relative bg-inherit">
                  <label
                    htmlFor="message"
                    className="leading-7 text-md text-zinc-200 bg-inherit font-Inter font-semibold"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={handleChange}
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full bg-inherit">
                <button
                  type="submit"
                  className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg font-Inter font-semibold"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>

            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-600 text-center bg-inherit">
              <Link className="text-gray-200 text-lg">
                skillmintofficial@gmail.com
              </Link>
              <p className="leading-normal my-5 bg-inherit">
                {/*                 49 Smith St.
                <br />
                Saint Cloud, MN 56301 */}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
