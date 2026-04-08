import React, { useEffect, useState } from "react";
import "./update.css";
import axios from 'axios'
import { server } from './utils/server'
import { useParams } from 'react-router-dom';


function UpdateProfileUI() {

    // getting id of the particular user from parameter
    const { id } = useParams()

    const [user, setUser] = useState({
        name: "",
        age: "",
        contact: "",
        image: null
    });

    // handling the input change
    const hadleChange = (e) => {
        const { name, value, files } = e.target
        // if user is updating image
        if (name == 'image') {
            setUser({ ...user, image: files[0] })
        }
        else {
            setUser({ ...user, [name]: value })
        }
    }

    // handling the submit the update 
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', user.name)
        formData.append('age', user.age)
        formData.append('contact', user.contact)
        // Only append image if user selected a new file
        if (user.image instanceof File) {
            formData.append("image", user.image);
        }
        // formData.append('image', user.image)
        await axios.patch(`${server}/update-user-data/${user._id}`, formData).then((res) => {
            console.log(res.data)
            alert(res.data.message)
            setUser(res.data.updatedUser)
        })
    }


    // fetching particular user data from the database

    useEffect(() => {
        axios.get(`${server}/get-user/${id}`).then((res) => {
            setUser(res.data.user)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div className="container">
            <div className="card">
                <div className="profile-header">
                    <div className="image-box">
                        <img
                            src={
                                user.image instanceof File
                                    ? URL.createObjectURL(user.image) // preview new file
                                    : user.image
                                        ? `${server}/${user.image}`   // existing image from server
                                        : "default-avatar.png"       // optional placeholder
                            }
                            alt="profile" />
                    </div>
                    <h2>Update Profile</h2>
                </div>

                <div className="form">
                    <input type="text" name="name" value={user.name} onChange={hadleChange} placeholder="Name" />
                    <input type="number" name="age" value={user.age} onChange={hadleChange} placeholder="Age" />
                    <input type="text" name="contact" value={user.contact} onChange={hadleChange} placeholder="Contact" />
                    <input type="file" name="image" onChange={hadleChange} />

                    <button onClick={handleSubmit}>Update Profile</button>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfileUI;

