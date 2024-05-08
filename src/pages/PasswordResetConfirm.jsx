import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { resetPasswordConfirm } from "../features/users/usersSlice";
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
const PasswordResetConfirm = () => {
  //const [requestSent, setRequestSent] = useState(false);
  const { resetPasswordConfirmStatus, resetPasswordConfirmError } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const { new_password, re_new_password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const params = useParams();
  const onSubmit = (e) => {
    e.preventDefault();
    const uid = params.uid;
    const token = params.token;
    if (
      !validator.isStrongPassword(new_password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setPasswordError("Your Password is too weak");
    } else if (new_password !== re_new_password) {
      setPasswordError("The passwords Do not Match!");
    } else {
      dispatch(resetPasswordConfirm(uid, token, new_password, re_new_password));
    }

    //setRequestSent(true);
  };
  if (resetPasswordConfirmStatus === "succeeded") {
    setTimeout(() => <Navigate to="/login" />, 5000);
  }
  return (
    <motion.div
      className="mt-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <form
        className="card shadow rounded border-0"
        onSubmit={onSubmit}
        style={{ width: "500px", margin: "auto" }}
      >
        <div className="card-header fw-medium">Reset Password Confirm </div>
        <div className="card-body">
          {resetPasswordConfirmError && (
            <div className="my-1 alert alert-danger" style={{ height: "40px" }}>
              {resetPasswordConfirmError}{" "}
            </div>
          )}
          {resetPasswordConfirmStatus === "succeeded" && (
            <div
              className="my-1 alert alert-success"
              style={{ height: "40px" }}
            >
              <span>
                You have successfully changed you password, You can now login
              </span>
            </div>
          )}
          <div className="form-group mb-3">
            <label className="form-label fw-medium text-muted">
              New Password
            </label>
            <input
              placeholder="new password"
              value={new_password}
              onChange={(e) => onChange(e)}
              type="password"
              required
              name="new_password"
              className={`form-control ${passwordError ? "border-danger" : ""}`}
            />
            {passwordError && (
              <div className="text-danger">{passwordError}</div>
            )}
          </div>
          <div className="form-group mb-3">
            <label className="form-label fw-medium text-muted">
              Confirm New Password
            </label>
            <input
              placeholder=" Confirm new password"
              value={re_new_password}
              onChange={(e) => onChange(e)}
              type="password"
              name="re_new_password"
              className="form-control"
            />
          </div>
          <div className="d-grid mt-2">
            <button
              className="btn btn-primary fw-medium w-100 btn-lg"
              disabled={resetPasswordConfirmStatus === "loading"}
            >
              {resetPasswordConfirmStatus === "loading" ? (
                <div class="spinner-border text-success" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                <span>Reset Password</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default PasswordResetConfirm;
