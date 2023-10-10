// PrivacyPolicyModal.js

import React from "react";

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  const modalStyles = {
    display: isOpen ? "block" : "none",
    position: "fixed",
    zIndex: 9999, // Ensure it's above everything else
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "4px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  };

  const overlayStyles = {
    display: isOpen ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Darkened background
    zIndex: 9998, // Below the modal
  };
  return (
    <div
      className={`inset-0 fixed flex items-center justify-end bg-white w-full h-fit font-Inter ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="modal-container" style={overlayStyles}>
        <div
          className="modal-content h-1/2 overflow-y-scroll overflow-x-clip py-4 border-4 border-red-600 "
          style={modalStyles}
        >
          <h2 className="font-bold text-xl">Privacy Policy</h2>
          <p className="mt-1 font-semibold">Last Updated: 7 Oct 2023</p>
          <p className="mt-1">
            This Privacy Policy describes how Skillmint ("we," "us," or "our")
            collects, uses, discloses, and protects the personal information of
            users of our job portal website located at
            <a
              href="https:\\www.skillmint.io"
              target="_blank"
              className="underline font-bold mx-1"
            >
              Skillmint
            </a>
            (the "Website"). By using our Website, you consent to the practices
            described in this Privacy Policy.
          </p>
          <div className="my-2">
            <h3 className="font-bold">1. Information We Collect</h3>

            <p>
              We collect the following types of personal information from users
              of our Website:
            </p>
          </div>
          <div className="ml-4 my-4">
            <p>
              <strong>User Registration:</strong>
            </p>
            <ul>
              <li>Name</li>
              <li>Email</li>
              <li>Password</li>
            </ul>
          </div>
          <div className="ml-4 my-4">
            <p>
              <strong>Job Listing:</strong>
            </p>
            <ul>
              <li>Job Title</li>
              <li>Job Location</li>
              <li>Job Setting Type (e.g., on-site, remote, full-time, etc.)</li>
              <li>Job Description</li>
            </ul>
          </div>
          <div className="ml-4 my-1">
            <p>
              <strong>Job Applicants:</strong>
            </p>
            <ul>
              <li>Applicant Name</li>
              <li>Applicant Email</li>
              <li>Applicant CV</li>
            </ul>
          </div>
          <div className="my-4">
            <h3 className="font-bold">2. How We Use Your Information</h3>

            <p>We use the information we collect for the following purposes:</p>

            <ul>
              <li>To create and manage user accounts.</li>
              <li>To enable users to post job listings and apply for jobs.</li>
              <li>
                To communicate with users regarding job listings, applications,
                and account-related matters.
              </li>
              <li>To improve our Website and services.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </div>
          <div className="my-4">
            <h3 className="font-bold">3. Sharing Your Information</h3>

            <p>
              We may share your personal information with the following third
              parties:
            </p>

            <ul>
              <li>
                Other users of the Website as necessary for job applications and
                listings.
              </li>
              <li>
                Service providers who assist us in operating our Website and
                providing services.
              </li>
              <li>
                Legal authorities when required by law or to protect our rights.
              </li>
            </ul>
          </div>
          <div className="my-4">
            <h3 className="font-bold">4. Security</h3>

            <p>
              We implement appropriate security measures to protect your
              personal information. However, no data transmission over the
              internet or storage system can be guaranteed to be 100% secure.
            </p>
          </div>
          <div className="my-4">
            <h3 className="font-bold">5. Your Rights</h3>

            <p>
              You have the following rights regarding your personal information:
            </p>

            <ul>
              <li>
                Access: You can request access to the personal information we
                hold about you.
              </li>
              <li>
                Rectification: You can request the correction of inaccurate or
                incomplete personal information.
              </li>
              <li>
                Deletion: You can request the deletion of your personal
                information under certain circumstances.
              </li>
              <li>
                Restriction: You can request the restriction of the processing
                of your personal information.
              </li>
              <li>
                Portability: You can request the transfer of your personal
                information to another service provider.
              </li>
            </ul>

            <p>
              To exercise these rights, please contact us using the contact
              information provided in Section 7.
            </p>
          </div>
          <div className="my-4">
            <h3 className="font-bold">6. Cookies and Tracking</h3>

            <p>
              We may use cookies and similar tracking technologies to collect
              information about your use of our Website. You can control cookies
              through your browser settings.
            </p>
          </div>
          <div className="my-4">
            <h3 className="font-bold">7. Contact Us</h3>

            <p>
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or the handling of your personal information,
              please contact us at:{" "}
              <a
                href="mailto:skillmintofficial@gmail.com"
                className="font-semibold underline"
              >
                skillmintofficial@gmail.com
              </a>
            </p>
          </div>
          <div className="my-4">
            <h3 className="font-bold">8. Changes to this Privacy Policy</h3>

            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page, and the date of the latest revision
              will be indicated.
            </p>
          </div>
          <div className="flex flex-row gap-4 justify-center items-center">
            <button
              className="btn btn-ghost bg-red-600 text-white"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
