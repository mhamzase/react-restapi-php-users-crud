import React, { useState, useEffect } from 'react'
import { useParams,useHistory } from "react-router-dom";

function EditUser() {

    const [user, setUser] = useState({
        fullname: '',
        age: ''
    })

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
                    fullname:data.user[0][1],
                    age: data.user[0][2]
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const updateUser = (e) =>{
        e.preventDefault();

        history.push("/users-list")
    }

    return (
        <div className="container py-4">
            <h1 className="display-4">Edit user ID: <b>{id}</b></h1>
            <hr />
            <ul className="list-group w-50">
                <form action="" method="post" onSubmit={(e) => updateUser(e)}>
                    <li className="list-group-item"><b>Name :</b> <input type="text" className="form-control" name="name" value={user.fullname} /> </li>
                    <li className="list-group-item"><b>Age :</b> <input type="text" className="form-control" name="age" value={user.age} /></li>
                    <li className="list-group-item"><button type="submit" className="form-control bg-primary text-light" name="updateUser">Updte</button> </li>
                </form>
            </ul>
        </div>
    )
}

export default EditUser
