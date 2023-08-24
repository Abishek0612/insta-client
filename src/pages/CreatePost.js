import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const CreatePost = () => {

    //create 3 states for title, body, image upload
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("")

    //React router for navigation
    const navigate = useNavigate()

    //Effect hook to perform actions after url, body and title
    useEffect(() => {
        //check if an image url  is available
        if (url) {
            //make a post request to create a new post
            axios.post('http://localhost:1000/createpost', {
                title,
                body,
                pic: url
            }, {
                //set the header for request
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            })
                .then(response => {
                    const data = response.data;
                    console.log(data)
                    //check if there is an error
                    if (data.error) {
                        console.log('Something went wrong')
                    } else {
                        //if successful login  navigate to home page
                        navigate("/")
                    }
                }).catch(error => {
                    console.log(error)
                })
        }
    }, [url, body, title, navigate])


    //Function to upload image to cloudinary and set the url
    const postDetails = async () => {
        //create a form data object to hold image data and upload presets
        const data = new FormData()
        //file type along with
        data.append("file", image)

        //set the upload preset
        data.append('upload_preset', 'civaleuo')

        //set the cloud name
        data.append('cloud_name', 'dsjgl0cbj');

        //we are going to make a request
        try {
            //make a post request to cloudinary to make request
            const response = await axios.post("https://api.cloudinary.com/v1_1/dsjgl0cbj/image/upload", data)
            //retrive the url or secure_url of the uploaded images
            const imageUrl = response.data.secure_url;
            //set the url state with upload image url
            setUrl(imageUrl)

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="card input-field postcontainer" >
            <input type="text" placeholder="Title..."
                value={title} onChange={(e) => setTitle(e.target.value)} />

            <input type="text" placeholder="Add your content here..."
                value={body} onChange={(e) => setBody(e.target.value)} />


            <div className="file-field input-field">
                <div className="btn #3d5afe indigo accent-3">
                    <span>Upload</span>
                    <input type="file"
                        onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            {/* display th uploaded image if the url is available */}

            {
                url && (
                    <img src={url}  alt="Uploaded" style={{width:"100%", maxHeight:"300px" , objectFit:'cover'}} />
                )
            }

            <button onClick={postDetails} className="btn waves-effect waves-light #448aff blue accent-2"
                type="submit" name="action">Add Post
            </button>
        </div>
    )
}

export default CreatePost