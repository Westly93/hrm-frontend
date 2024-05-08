import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../features/users/usersSlice";
import validator from "validator";

// import logo from '../imgs/logo.png';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerError, isAuthenticated, registerStatus } = useSelector(
    (state) => state.users
  );
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
  });
  const errorMessage = registerError?.message?.split(",");
  //console.log(errorMessage)
  const { email, name, password, password_confirmation } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setEmailError("This is an invalid Email");
      setPasswordError("");
    } else if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setPasswordError("Your Password is too weak");
      setEmailError("");
    } else if (password !== password_confirmation) {
      setPasswordError("Passwords Do not match!");
      setEmailError("");
    } else {
      setPasswordError("");
      setEmailError("");
      dispatch(register(formData));
      //console.log(formData);
      setFormData({ email: "", password: "", name: "", password_confirm: "" });
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/applicant-adverts-list");
    }
  });

  return (
    <div className="col-lg-4 m-auto mt-4">
      {/* <img src={logo} alt="Logo" class="img-fluid" /> */}
      <legend className="fw-bold text-center">HRM Recruitment System</legend>
      <form
        className="card shadow border-0 rounded"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="card-header fw-medium">Create Account</div>
        <div className="card-body">
          {errorMessage &&
            errorMessage.map((error) => (
              <div
                class="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                <strong>
                  <li>{error}</li>
                </strong>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            ))}
          <div class="mb-3">
            <label for="name" className="form-label fw-medium text-muted">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              name="name"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="mb-3">
            <label
              for="exampleInputEmail1"
              className="form-label fw-medium text-muted"
            >
              Email address
            </label>
            <input
              type="email"
              className={`form-control ${emailError ? "border-danger" : ""}`}
              id="exampleInputEmail1"
              value={email}
              name="email"
              required
              onChange={(e) => onChange(e)}
              aria-describedby="emailHelp"
            />
            {emailError && <div className="text-danger mt-1">{emailError}</div>}
          </div>
          <div class="mb-3">
            <label
              for="exampleInputPassword1"
              className="form-label fw-medium text-muted"
            >
              Password
            </label>
            <input
              type="password"
              className={`form-control ${passwordError ? "border-danger" : ""}`}
              id="exampleInputPassword1"
              onChange={(e) => onChange(e)}
              value={password}
              name="password"
            />
          </div>
          {passwordError && (
            <div className="text-danger mt-1">{passwordError}</div>
          )}
          <div class="mb-3">
            <label
              for="confirm_password"
              className="form-label fw-medium text-muted"
            >
              Password Confirm
            </label>
            <input
              type="password"
              className="form-control"
              id="confirm_password"
              onChange={(e) => onChange(e)}
              value={password_confirmation}
              name="password_confirmation"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary fw-medium w-100 btn-lg"
            disabled={registerStatus === "loading"}
          >
            {registerStatus === "loading" ? (
              <>
                <span className="visually-hidden">Loading...</span>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Please Wait!
              </>
            ) : (
              <>
                Create Account{" "}
                <i className="bi bi-plus-circle-fill float-end"></i>
              </>
            )}
          </button>
        </div>
      </form>
      <p className="mt-4">
        Already have an account?
        <Link className="fw-medium " to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
