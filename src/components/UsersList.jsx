import React, { useState, useEffect } from 'react'
import { Table, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { FaUserEdit, FaTrashAlt, FaEye } from "react-icons/fa";

function UsersList() {

    const [allusers, setAllusers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost/react-restapi-php-user-crud/all-users.php")
            .then((res) => res.json())
            .then((data) => {
                setAllusers(data.users.reverse());
            })
            .catch((err) => {
                setError(err)
            }).finally(() => {
                setLoading(false);
            });

    }, []);


    const removeUser = (id) =>{
        console.log(id)
    }
    
    return (
        <div>
            <h2 className="mb-5 text-center display-4">Users</h2>
            <Table striped bordered hover size="sm" className="text-center m-auto col-8">
                <thead >
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                 
                    {error || !Array.isArray(allusers) ? <tr><td colSpan="3">There was an error loading your data!.</td></tr> : null}

                    {loading ? <tr><td colSpan="3">Records are loading...</td></tr> :
                        (allusers.map((user, index) => (
                            <tr key={index}>
                                <td>{user[1]}</td>
                                <td>{user[2]}</td>
                                <td style={{ fontSize: '24px' }}>

                                    <OverlayTrigger overlay={<Tooltip >View</Tooltip>}>
                                        <Link className="ml-3 text-success" to={`/user/${user.id}`}><FaEye /></Link>
                                    </OverlayTrigger>

                                    <OverlayTrigger overlay={<Tooltip >Edit</Tooltip>}>
                                        <Link className="ml-3 text-primary" to={`/edit-user/${user.id}`}><FaUserEdit /></Link>
                                    </OverlayTrigger>



                                    <OverlayTrigger overlay={<Tooltip >Remove</Tooltip>}>
                                        <span role="button" className="ml-3 text-danger " onClick={() => removeUser(user[0])} ><FaTrashAlt /></span>
                                    </OverlayTrigger>
                                </td>
                            </tr>
                        )))

                    }
                </tbody>
            </Table>
        </div>
    )
}

export default UsersList
