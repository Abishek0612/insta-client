import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//make http request, import axios
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {
  //define state -> useState hooks
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  //Function to handle user signup  user data
  const PostData = () => {
    //add validation check for name , email, password
    if (!name || !email || !password) {
      toast.error("Please fill in all fields...")
      return
    }

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


    //? use axios to make a post request to signup
    axios.post("http://localhost:1000/signup", {
      name,
      email,
      password
    }).then(response => {
      const data = response.data;
      console.log(data)
      if (data.error) {
        alert("Error")
      } else {
        console.log(response.data)
        navigate('/login')
      }
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div className='mycard'>
      <div className='card innput-field logindiv'>
        <h2>Instagram</h2>
        <input type='text' placeholder='Enter your name' value={name}
          onChange={(e) => setName(e.target.value)} />

        <input type='email' placeholder='Enter your email' value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <input type='password' placeholder='Enter your Password' value={password}
          onChange={(e) => setPassword(e.target.value)} />

        <button className="btn waves-effect waves-light #448aff blue accent-2"
          onClick={() => PostData()} type="submit" name="action">Register
        </button>

        <h6>

          <Link to='/login'>Already having an account?</Link>
        </h6>
      </div>

      <ToastContainer/>
    </div>
  )
}

export default Signup