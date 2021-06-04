import React, { useState ,useEffect} from 'react'
import {  useParams } from "react-router-dom";

function UserDetails() {

    const [user, setUser] = useState({
        name: '',
        age: ''
    })

    const { id } = useParams();

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
                    name:data.user[0][1],
                    age: data.user[0][2]
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <div className="container py-4">
            <h1 className="display-4">User ID: <b>{id}</b></h1>
            <hr />
            <ul className="list-group w-50">
                <li className="list-group-item"><b>Name :</b> {user.name}</li>
                <li className="list-group-item"><b>Age :</b> {user.age}</li>
            </ul>
        </div>
    )
}

export default UserDetails
