import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../features/users/usersSlice";
import validator from "validator";
const Login = () => {
  const navigate = useNavigate();

  const disptch = useDispatch();
  //const { error } = useSelector((state) => state.users);
  const { isAuthenticated, loginStatus, user, loginError } = useSelector(
    (state) => state.users
  );
  //const {user, isAuthenticated} = useSelector((state) => state.users.user);
  //const UserRole = user?.data?.roles[0]?.name || null;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //console.log("error message", error)
  const { email, password } = formData;
  const [emailError, setEmailError] = useState("");
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setEmailError("Please Enter a valid email!");
    } else {
      await disptch(login(formData));

      // if (newLogin.payload) {
      //   navigate("/applicant-adverts-list");
      // }
      setFormData({ email: "", password: "" });
      setEmailError("");
    }
  };
  useEffect(() => {
    //disptch(userVerification());
    if (isAuthenticated) {
      if (user.roles.some((role) => role.name === "admin")) {
        navigate("/adverts-list");
      } else if (user.roles.some((role) => role.name === "user")) {
        navigate("/applicant-adverts-list");
      } else {
        navigate("/login");
      }
    }
  }, [isAuthenticated, navigate, user?.roles]);

  return (
    <div className="col-lg-4 m-auto mt-5">
      <div>
        <legend className="fw-bold text-center">MSU HRM System</legend>
        <form
          className="card shadow rounded border-0"
          onSubmit={(e) => onSubmit(e)}
        >
          <div className="card-header fw-medium">Login </div>
          <div className="card-body">
            {loginError && (
              <div
                class="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                <strong>
                  <li>{loginError}</li>
                </strong>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            )}

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
              {emailError && (
                <div className="text-danger mt-1">{emailError}</div>
              )}
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
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => onChange(e)}
                value={password}
                required
                name="password"
              />
            </div>
            <p className="mt-2">
              Forgot your password?{" "}
              <Link to="/reset-password">Request Reset Password</Link>
            </p>
            {/* <Link>Forgot Password?</Link> */}
          </div>
          <div className="card-footer">
            <button
              type="submit"
              className="btn btn-primary fw-medium w-100 btn-lg"
              disabled={loginStatus === "loading"}
            >
              {loginStatus === "loading" ? (
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
                  Login <i className="bi bi-box-arrow-in-right float-end"></i>
                </>
              )}
            </button>
          </div>
        </form>
        <p className="mt-2">
          Dont have an account?{" "}
          <Link className="fw-medium" to="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
