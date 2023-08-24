import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  //functionality to fetch the data
  useEffect(() => {
    //Fetch the data from post db
    axios
      .get("http://localhost:1000/allpost", {
        headers: {
          "Content-Type": "Application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data.post);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  //Define a functionality to fetch the like on frontend
  const likePost = (id) => {
    //use axios for put http
    axios
      .put(
        "http://localhost:1000/like",
        {
          postId: id, //include the postid of the user logged in
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((response) => response.data)
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result; //user will be like post for once only
          } else {
            return item; //keep other post unchanged
          }
        });
        setData(newData); //update data after like
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Define a functionality to fetch the unlike on frontend
  const unlikePost = (id) => {
    //apply a logic to update the unlike endpoint
    axios
      .put(
        "http://localhost:1000/unlike",
        {
          postId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((response) => response.data)
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //create a fetch logic to fetch the comment on the  front end side

  const handleComment = (text, postId) => {
    //send a put request to /comment endpoint
    axios
      .put(
        "http://localhost:1000/comment",
        {
          postId,
          text,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((response) => response.data)
      .then((result) => {
        console.log(result);

        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result; //update the commented post in array ->return
          } else {
            return item;
          }
        });

        setData(newData); //updated the state with new data
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Functionality -to delete a post using id
  const deletePost = (postid) => {
    //send  a delete request to server to delete the post
    axios
      .delete(`http://localhost:1000/deletepost/${postid}`, {
        //include authorization token
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((response) => response.data)
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => item._id !== result._id);
        // console.log(newData);
        setData(newData); //update the stated with new data of the post ->deleted
      });
  };

  return (
    <div className="home">
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.map((item) => {
          return (
            <div className="card home-card" key={item._id}>
              <h5>
                <Link
                  to={
                    item.postedBy._id !== state._id
                      ? "/profile/" + item.postedBy._id
                      : "/profile"
                  }
                >
                  <h5>{item.postedBy.name}</h5>
                </Link>
                {item.postedBy._id === state._id && (
                  <button
                    style={{ float: "right" }}
                    className="material-icons"
                    onClick={() => deletePost(item._id)}
                  >
                    delete
                  </button>
                )}
              </h5>

              <div className="card-image">
                <img className="post" src={item.photo} alt="image1" />
              </div>
              
              <div className="card-content">
                <i
                  className="material-icons"
                  style={{ color: "red", fontSize: "30px" }}
                >
                  favorite
                </i>

                {/* check if the current user has like post or different user  */}
                {item.likes.includes(state._id) ? (
                  /* //display unlike button if liked      */
                  <button
                    className="material-icons"
                    onClick={() => {
                      unlikePost(item._id);
                    }}
                  >
                    thumb_down
                  </button>
                ) : (
                  /* //display like button if not liked  */
                  <button
                    className="material-icons"
                    onClick={() => {
                      likePost(item._id);
                    }}
                  >
                    thumb_up
                  </button>
                )}
                <h6>Likes:{item.likes.length}</h6>
                <h6>{item.title}</h6>
                <p>{item.body}</p>

                {item.comments.map((comment) => (
                  <h6
                    style={{ fontWeight: "bolder", fontSize: "14px" }}
                    key={comment._id}
                  >
                    <span style={{ color: "blue", fontSize: "14px" }}>
                      {comment.postedBy.name}:
                    </span>
                    {comment.text}
                  </h6>
                ))}
                {/* logic for comments  */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log(e.target[0].value);
                    handleComment(e.target[0].value, item._id);
                    e.target[0].value = "";
                  }}
                >
                  <input type="text" placeholder="Add a comments" />
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;
