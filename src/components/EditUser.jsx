import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios'
import { Form } from 'react-bootstrap'

import { store } from "react-notifications-component";

function EditUser() {

    const [user, setUser] = useState({
        id: '',
        fullname: '',
        age: ''
    })
    const [success, setSuccess] = useState(false)


    const handleUserInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }


    const { id } = useParams();
    let history = useHistory();


    useEffect(() => {
        loadUserDetials();
    }, [])

    const loadUserDetials = () => {
        fetch("http://localhost/react-restapi-php-user-crud/user-details.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setUser({
                    id: id,
                    fullname: data.user[0][1],
                    age: data.user[0][2]
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    
    const updateUser = async (e) => {
        e.preventDefault();


        fetch("http://localhost/react-restapi-php-user-crud/update-user.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    // setSuccess(true)
                } else {
                    console.log(data.msg);
                }
            })
            .catch((err) => {
                console.log(err);
            });

            history.push("/users-list")
        
    }

    return (
        <div className="container py-4">
            <h1 className="display-4">Edit user ID: <b>{id}</b></h1>
            <hr />
            <ul className="list-group w-50">
                <Form action="" method="post" onSubmit={(e) => updateUser(e)}>
                    <li className="list-group-item"><b>Name :</b> <input onChange={(e) => handleUserInput(e)} type="text" className="form-control" name="fullname" value={user.fullname} /> </li>
                    <li className="list-group-item"><b>Age :</b> <input onChange={(e) => handleUserInput(e)} type="text" className="form-control" name="age" value={user.age} /></li>
                    <li className="list-group-item"><button type="submit" className="form-control bg-primary text-light">Updte</button> </li>
                </Form>
            </ul>
        </div>
    )
}

export default EditUser
