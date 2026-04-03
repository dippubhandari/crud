import React, { useState } from "react";
import "./update.css";

function UpdateProfileUI() {
    const [user, setUser] = useState({
        name: "John Doe",
        age: "25",
        contact: "07123456789",
        image: "https://i.pravatar.cc/300"
    });

    return (
        <div className="container">
            <div className="card">
                <div className="profile-header">
                    <div className="image-box">
                        <img src={user.image} alt="profile" />
                    </div>
                    <h2>Update Profile</h2>
                </div>

                <div className="form">
                    <input type="text" value={user.name} placeholder="Name" readOnly />
                    <input type="number" value={user.age} placeholder="Age" readOnly />
                    <input type="text" value={user.contact} placeholder="Contact" readOnly />
                    <input type="file" />

                    <button>Update Profile</button>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfileUI;

