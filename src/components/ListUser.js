import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListUser() {
    const [users, setUsers] = useState([]); // Initialize as an empty array

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('https://cquibranza.leon.svdphs.ph/api/users/').then(function (response) {
            console.log(response.data);
            setUsers(response.data);
        });
    }

    const deleteUser = (Id) => { // Use consistent naming, 'Id' instead of 'id'
        axios.delete(`https://cquibranza.leon.svdphs.ph/api/user/${Id}/delete`).then(function(response){ // Use 'Id' here
            console.log(response.data);
            getUsers();
        })
    }
    return (
        <div>
            <h1>List Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) => (
                        <tr key={key}>
                            <td>{user.Id}</td>
                            <td>{user.FirstName}</td>
                            <td>{user.LastName}</td>
                            <td>{user.Email}</td>
                            <td>{user.ContactNumber}</td>
                            <td>
                                <Link to={`user/${user.Id}/edit`} style={{ marginRight: "10px" }}>Edit</Link>
                                <button onClick={() => deleteUser(user.Id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
