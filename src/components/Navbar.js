
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App.js";

const Navbar = () => {
  //use useContext hook to acces the userContext and state

  const { state, dispatch } = useContext(UserContext);
  const navigate=useNavigate()

  //Define a functionality to render the list of navbar item
  const renderList = () => {
    //check if the use state is there or not
    if (state) {
      //if  user authenticated , render ->  home , profile , createpost link
      return (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/create-post">Add Post</Link>
          </li>

          <li>
            <button
              className="btn waves-effect waves-light #00e676 green accent-3"
              type="submit"
              name="action"
              onClick={() => {
                //clear the local storage ->logout the user
                localStorage.clear();
                //dispatch an action to clear the user data
                dispatch({ type: "CLEAR" });
                navigate("/signin");
              }}
            >
              Logout
            </button>
          </li>
        </>
      );
    } else {
      //if not authenticated, render the login and register Links
      return (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </>
      );
    }
  };

  //render the navbar component
  return (
    <nav>
      <div className="nav-wrapper white bgcolor">
        <Link to={state ? "/" : "/login"} className="brand-logo">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
