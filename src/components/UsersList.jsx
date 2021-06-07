import React, { useState, useEffect } from 'react'
import { Table, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { FaUserEdit, FaTrashAlt, FaEye } from "react-icons/fa";

function UsersList() {

    const [allusers, setAllusers] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [editingMode, setEditingMode] = useState(false);
    const [error, setError] = useState();

    const [newData, setNewData] = useState({});

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
                    console.log(data.msg)
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


    const enableEdit = (id, name, age) => {
        // console.log(id, name, age)
        setNewData({ id, name, age });
        editMode(id);
    }

    // Enabling the edit mode for a listed user.
    const editMode = (id) => {
        const tempUsers = allusers.map((user) => {
            if (user[0] === id) {
                user.isEditing = true;
                return user;
            }
            else {
                user.isEditing = false;
                return user;
            }
        });
        setAllusers(tempUsers);
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

                    {allusers.length == 0 ? <tr><td colSpan="3">No Record Found!.</td></tr> : null}

                    {loading ? <tr><td colSpan="3">Records are loading...</td></tr> :
                        (allusers.map((user,isEditing) => {

                            return isEditing === true ? (
                                <tr key={user[0]}>
                                    <td>
                                        <input
                                            type="text"
                                            defaultValue={user[1]}
                                        // onChange={(e) => updateNewData(e, "fullname")}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="email"
                                            defaultValue={user[2]}
                                        // onChange={(e) => updateNewData(e, "age")}
                                        />
                                    </td>
                                </tr>
                            )
                                :
                                (
                                    <tr key={user[0]}>
                                        <td>{user[1]}</td>
                                        <td>{user[2]}</td>
                                        <td style={{ fontSize: '24px' }}>

                                            <OverlayTrigger overlay={<Tooltip >View</Tooltip>}>
                                                <Link className="ml-3 text-success" to={`/user/${user[0]}`}><FaEye /></Link>
                                            </OverlayTrigger>

                                            <OverlayTrigger overlay={<Tooltip >Edit</Tooltip>}>
                                                <span className="ml-3 text-primary" onClick={() => enableEdit(user[0], user[1], user[2])}><FaUserEdit /></span>
                                            </OverlayTrigger>



                                            <OverlayTrigger overlay={<Tooltip >Remove</Tooltip>}>
                                                <span role="button" className="ml-3 text-danger " onClick={() => deleteConfirm(user[0])} ><FaTrashAlt /></span>
                                            </OverlayTrigger>
                                        </td>
                                    </tr>
                                )
                        }
                        ))

                    }
                </tbody>
            </Table>
        </div>
    )
}

export default UsersList
