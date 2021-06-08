import React, { useState, useEffect } from 'react'
import { Table, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { FaUserEdit, FaTrashAlt, FaEye } from "react-icons/fa";

import { store } from "react-notifications-component";

function UsersList() {

    const [allusers, setAllusers] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        fetch("http://localhost/react-restapi-php-user-crud/all-users.php")
            .then((res) => res.json())
            .then((data) => {
                setAllusers(data.users.reverse());
            })
            .catch((err) => {
                console.log(err)
            }).finally(() => {
                setLoading(false);
            });
    }, []);



    const removeUser = (user_id) => {
        // filter outing user
        let userDeleted = allusers.filter((user) => { return user[0] !== user_id })

        fetch("http://localhost/react-restapi-php-user-crud/delete-user.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: user_id })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setAllusers(userDeleted);
                    // fetchUsers()
                } else {
                    alert(data.msg);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteConfirm = (id) => {
        if (window.confirm("Are you sure?")) {
            removeUser(id);
        }
    };




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


                    {loading ? <tr><td colSpan="3">Records are loading...</td></tr> :
                        allusers.length == 0 ? <tr><td colSpan="3">No Record Found!</td></tr> :
                            (allusers.map((user) => (
                                <tr key={user[0]}>
                                    <td>{user[1]}</td>
                                    <td>{user[2]}</td>
                                    <td style={{ fontSize: '24px' }}>

                                        <OverlayTrigger overlay={<Tooltip >View</Tooltip>}>
                                            <Link className="ml-3 text-success" to={`/user/${user[0]}`}><FaEye /></Link>
                                        </OverlayTrigger>

                                        <OverlayTrigger overlay={<Tooltip >Edit</Tooltip>}>
                                            <Link className="ml-3 text-primary" to={`/edit-user/${user[0]}`}><FaUserEdit /></Link>
                                        </OverlayTrigger>



                                        <OverlayTrigger overlay={<Tooltip >Remove</Tooltip>}>
                                            <span role="button" className="ml-3 text-danger " onClick={() => deleteConfirm(user[0])} ><FaTrashAlt /></span>
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
