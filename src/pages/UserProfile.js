import React, { useEffect, useState }  from "react";
import { useParams } from "react-router-dom";
import axios  from "axios";
const UserProfile=()=>{
    const [userProfile,setProfile]=useState(null);

    //get the user id from routes paramaters
    const {userid}=useParams();


    //useEffect hook->to perform component mount->used id

    useEffect(()=>{
        axios.get(`http://localhost:1000/user/${userid}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(response=>{
            console.log(response.data);
            setProfile(response.data);
        }).catch(error=>{
            console.log(error);
        })
    
    },[userid])
   
    return (
        <div>
            {userProfile?(
                //if the user profile is available,display user information
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
                    <h4>{userProfile.user.name}</h4>
                    <h4>{userProfile.user.email}</h4>
                     <div style={
                      {display:"flex",
                      justifyContent:"space-between", 
                      width:"110%"
                      }}>
                      <h5>{userProfile.posts.length} Post </h5>
                      <h5>85 followers</h5>
                      <h5>95 following</h5>
                     </div>
                  </div>
                </div>
                <div className='postimages'>
                  {userProfile.posts.map(item=>(
                    //map through user post and display the image
                    <img key={item._id} className='post' src={item.photo} alt={item.title}/>
                  ))}
                </div>
        </div>
      ):(
        <h2>Loading....</h2>
      )};
      </div>
      );
}

export default UserProfile;