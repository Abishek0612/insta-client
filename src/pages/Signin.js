import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../App';


const Signin = () => {
const {state, dispatch} = useContext(UserContext)

  const navigate = useNavigate()
  //create a state using hook for email and password
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  //create a function to handle submit data using axios
  const PostData = () => {
    //regex validation using toast
    //email vailidation regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    //Password validation regex
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\w_]).{8,}$/;

    //validate email format using regex
    if (!email.match(emailRegex)) {
      toast.error('Invalid Email format', {
        position: toast.POSITION.TOP_RIGHT,
      })
      return;
    }

    if (!password.match(passwordRegex)) {
      toast.error("Invalid password format", {
        position: toast.POSITION.TOP_RIGHT,
      })
      return;
    }

    //use axios to make a post request -> /signin
    axios.post("http://localhost:1000/signin", {
      email,
      password
    })
      .then(response => {
        const data = response.data;
        console.log(data)
        if (data.error) {
          alert('Login not success')
        } else {
          //storing jwt  token and use data in local storage
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user))
          dispatch({type: "User", payload:data.user})
          alert(data.msg);
          navigate("/")  //navigate to home page
        }
      }).catch(error => {
        console.log(error)
      })
  }

  return (
    <div className='mycard'>
      <div className='card innput-field logindiv'>
        <h2>Instagram</h2>
        <input type='email' placeholder='Enter your email' value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <input type='password' placeholder='Enter your Password' value={password}
          onChange={(e) => setPassword(e.target.value)} />


        <button onClick={() => PostData()} className="btn waves-effect waves-light #448aff blue accent-2" type="submit" name="action">Login
        </button>

        <h6>
          <Link to='/register' >Don't have an account?</Link>
        </h6>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Signin