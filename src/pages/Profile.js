import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { UserContext } from '../App';

const Profile=()=>{
  const {state,dispatch}=useContext(UserContext);
  //create state to hold the users post 
  const[mypics,setPics]=useState([]);

  //Fetch the users post from backend api endpoint->mypost
  useEffect(()=>{
    //use axios with http GET request to fetch user post who is logged in 
    axios.get("http://localhost:1000/mypost",{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+ localStorage.getItem("jwt")//attach token from localstorage
      }
    }).then(response=>{
      console.log(response.data);//log the data in console
      setPics(response.data.mypost)
    })
    .catch(error=>{
      console.log(error);
   })
  },[state,dispatch]);


    return (
      <div style={{maxWidth:"800px", margin:"0px auto"}}>
        <div style={{
          display:'flex',
          justifyContent:"space-around",
          margin:"18px 0px",
          borderBottom:"1px solid grey"
        }}>
          <div>
            <img style={{width:"160px",height:"160px",borderRadius:"80px",border:"2px solid black"}}
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyJTIwbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
            alt="img1" />
          </div>
          <div>
            <h4>{state?state.name:"Loading..."}</h4>
             <div style={
              {display:"flex",
              justifyContent:"space-between", 
              width:"110%"
              }}>
              <h5>80 post</h5>
              <h5>85 followers</h5>
              <h5>95 following</h5>
             </div>
          </div>
        </div>
        <div className='postimages'>
          {
            mypics.map(item=>{
              return (
                <img key={item._id} className='post' src={item.photo} alt={item.title}/>
              )
            })
          }
        
        </div>
      </div>
    )
}

export default Profile;