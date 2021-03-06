import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'




function AddUser() {

    const [userData, setUserData] = useState({
        fullname: '',
        age: ''
    })

    const [success, setSuccess] = useState()

    let history = useHistory();

    const { fullname, age } = userData;

    const handleUserInput = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }


    const handleSubmitForm = async e => {
        e.preventDefault();

        // there is the 1st method to use axios api call
        await axios.post("http://localhost/react-restapi-php-user-crud/add-user.php", userData)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    console.log(data.msg)
                }
                else {
                    console.log(data.msg)
                }
            })
            .catch((err) => {
                console.log(err);
            });

            history.push("/users-list");
            
    }

    return (
        <>
            <div className="mt-5">
                <div className="col-5 m-auto shadow-lg p-4">
                    <h1 className="display-4 text-center ">Add User</h1>
                    <Form id="user-form" action="" method="POST" onSubmit={(e) => handleSubmitForm(e)}>
                        <Form.Group >
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={(e) => handleUserInput(e)} name="fullname" type="text" placeholder="Enter name" value={fullname} required />
                            <br />
                            <Form.Label>Age</Form.Label>
                            <Form.Control onChange={(e) => handleUserInput(e)} name="age" type="text" placeholder="Enter age" value={age} required />


                            <Button className="col-12 mt-3" variant="primary" type="submit">Add</Button>

                        </Form.Group>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default AddUser
