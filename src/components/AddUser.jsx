import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

function AddUser() {
    let [message,setMessage] = useState('')

    const [userData, setUserData] = useState({
        fullname: '',
        age: ''
    })

    const { fullname, age } = userData;

    const handleUserInput = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        fetch("http://localhost/react-restapi-php-user-crud/add-user.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setMessage(data.msg)
            })
            .catch((err) => {
                console.log(err);
            });

            
    }


    return (
        <>
            <div className="mt-5">
                <div className="col-5 m-auto shadow-lg p-4">
                    <h1 className="display-4 text-center ">Add User</h1>
                    {message}
                    <Form  action="" method="POST" onSubmit={(e) => handleSubmitForm(e)}>
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
