import React, {useRef} from 'react';
import {Container,Form,Button} from 'react-bootstrap';

export default function Login() {
    const idRef=useRef()
    
    return (
        <Container className="align-items-center d-flex" style={{hieght:'100vh'}}>
            <Form className="" >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Entere Your ID</Form.Label>
                    <Form.Control type="text" ref={idRef} placeholder="Enter ID" required/>
                </Form.Group>
                <Button variant="primary" className="mr-2">Submit</Button>
                <Button variant="secondary">Create A New ID</Button>
            </Form>
            
        </Container>
    )
}


