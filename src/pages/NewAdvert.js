import AddAdvert from "../features/adverts/AddAdvert";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux";
const NewAdvert = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, status } = useSelector((state) => state.users);
  const variants = {
    enter: { x: "-100%", opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };

  
  // console.log("something ", isAuthenticated);

  // if (!isAuthenticated) {
  //   navigate("/login");
  // }

  // console.log(status);

  // if (status == "failed") {
  //   navigate("/login");
  // }
  return (
    <>
      {status === "loading" ? (
        <div class="spinner-border text-info" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (
        <AddAdvert />
      )}
    </>
  );
};

export default NewAdvert;
