import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUsers();
    }, [id]); // Include 'id' as a dependency to trigger the effect when the ID changes

    function getUsers() {
        axios.get(`https://cquibranza.leon.svdphs.ph/api/user/${id}`).then(function (response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .put(`https://cquibranza.leon.svdphs.ph/api/user/${id}/edit`, inputs)
            .then(function (response) {
                console.log(response.data);
                navigate("/"); // Use the navigate function to navigate to the desired route
            });
        console.log(inputs);
    };

    return (
        <div>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>First Name:</label>
                            </th>
                            <td>
                                <input value={inputs.FirstName} type="text" name="FirstName" onChange={handleChange} />
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label>Last Name:</label>
                            </th>
                            <td>
                                <input value={inputs.LastName} type="text" name="LastName" onChange={handleChange}/>
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label>Email:</label>
                            </th>
                            <td>
                                <input value={inputs.Email} type="text" name="Email" onChange={handleChange} />
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label>Mobile:</label>
                            </th>
                            <td>
                                <input value={inputs.ContactNumber}type="text" name="Contact" onChange={handleChange} />
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
