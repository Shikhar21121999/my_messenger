import React, {useRef} from 'react';
import {Container,Form,Button} from 'react-bootstrap';
import {v4 as uuidV4} from 'uuid';

export default function Login({submit_id}) {
    const idRef=useRef()
    
    function handel_submit(e){
        e.preventDefault();
        submit_id(idRef.current.value);
    }

    return (
        <Container className="align-items-center d-flex" style={{ hieght : '100vh' }}>
            <Form className="w-100" onSubmit={handel_submit} >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Entere Your ID</Form.Label>
                    <Form.Control type="text" ref={idRef} placeholder="Enter ID" required/>
                </Form.Group>
                <Button type="submit"  variant="primary" className="mr-2">Submit</Button>
                <Button variant="secondary" onClick={ ()=> submit_id(uuidV4()) }>Create A New ID</Button>
            </Form>
            
        </Container>
    )
}


