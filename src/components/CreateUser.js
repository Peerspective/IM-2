import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function CreateUser() {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};

        // Check if required fields are empty
        if (!inputs.FirstName) {
            newErrors.FirstName = "First Name is required";
        }
        if (!inputs.LastName) {
            newErrors.LastName = "Last Name is required";
        }
        if (!inputs.Email) {
            newErrors.Email = "Email is required";
        }

        // Check if email is valid
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (inputs.Email && !emailPattern.test(inputs.Email)) {
            newErrors.Email = "Invalid email format";
        }

        // Check for duplicate emails (You may need an API request here)
        // For now, we'll assume there are no duplicates
        // Replace this logic with your API call to check for duplicates

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            axios
                .post("https://cquibranza.leon.svdphs.ph/api/user/save", inputs)
                .then(function (response) {
                    console.log(response.data);
                    navigate("/"); // Use the navigate function to navigate to the desired route
                });
            console.log(inputs);
        }
    };

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>First Name:</label>
                            </th>
                            <td>
                                <input type="text" name="FirstName" onChange={handleChange} />
                                {errors.FirstName && <span className="error">{errors.FirstName}</span>}
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label>Last Name:</label>
                            </th>
                            <td>
                                <input type="text" name="LastName" onChange={handleChange} />
                                {errors.LastName && <span className="error">{errors.LastName}</span>}
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label>Email:</label>
                            </th>
                            <td>
                                <input type="text" name="Email" onChange={handleChange} />
                                {errors.Email && <span className="error">{errors.Email}</span>}
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label>Mobile:</label>
                            </th>
                            <td>
                                <input type="text" name="Contact" onChange={handleChange} />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="2" align="right">
                                <button>Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}
