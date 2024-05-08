import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { resetPassword } from "../features/users/usersSlice";
import validator from "validator";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.25,
      type: "spring",
      stiffness: 120,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};
const PasswordReset = () => {
  const { resetPasswordStatus, resetPasswordError } = useSelector(
    (state) => state.users
  );
  //const [requestSent, setRequestSent] = useState(false);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [emailError, setEmailError] = useState("");
  const { email } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setEmailError("This is an invalid email!");
    } else {
      dispatch(resetPassword(email));
    }

    //setRequestSent(true);
  };
  if (resetPasswordStatus === "succeeded") {
    return setTimeout(() => <Navigate to="/vaccancies" />, 5000);
    //return <Navigate to="/" />;
  }
  return (
    <motion.div
      className="mt-5"
      variants={containerVariants}
      animate="visible"
      initial="hidden"
      exit="exit"
    >
      <form
        className="card shadow rounded border-0"
        onSubmit={onSubmit}
        style={{ width: "500px", margin: "auto" }}
      >
        <div className="card-header fw-medium">Password Reset Request </div>

        <div className="card-body">
          {resetPasswordError && (
            <div className="my-1 alert alert-danger" style={{ height: "40px" }}>
              {resetPasswordError}{" "}
            </div>
          )}
          {resetPasswordStatus === "succeeded" && (
            <div
              className="my-1 alert alert-success"
              style={{ height: "40px" }}
            >
              <span>
                We have send you an email, Please visit your mail box and change
                your password
              </span>
            </div>
          )}
          <div className="form-group">
            <label className="form-label fw-medium text-muted">Email</label>
            <input
              placeholder="email@gmail.com"
              value={email}
              onChange={(e) => onChange(e)}
              type="email"
              required
              name="email"
              className={`form-control ${emailError ? "border-danger" : ""}`}
            />
            {emailError && <div className="text-danger mt-1">{emailError}</div>}
          </div>

          <div className="d-grid mt-2">
            <button
              className="btn btn-primary fw-medium w-100 btn-lg"
              disabled={resetPasswordStatus === "loading"}
            >
              {resetPasswordStatus === "loading" ? (
                <div class="spinner-border text-success" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                <span>Request Password Reset</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default PasswordReset;
