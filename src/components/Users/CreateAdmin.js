import React from 'react';
import { Container, Row, Col, Input, Button } from 'mdbreact';

class CreateAdmin extends React.Component {

    state = {
        adminmail: "",
        adminname: "",   
        adminpassword: "",
    }

    changeHandler = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value});
      }

    createAdmin = (event) =>{
        event.preventDefault();
        fetch('http://localhost:4000/admin/signupadmin', {
            method: "POST",
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                adminmail: this.state.adminmail,
                adminname: this.state.adminname,
                adminpassword: this.state.adminpassword
            })})
            .then(response => {
                if(response.status >= 200 && response.status <300){
                    console.log(response.json());
                }
            })
            .catch(error => console.log(error));
    }

    render(){
        return (
            <Container style={{ paddingTop: '0px'}}>
                        
            <form
            className="needs-validation"
            onSubmit={this.createAdmin}
            noValidate
            >
            <Row className="mt-5">
            <Col md="12">
            <p className="h5 text-center mb-4">Create Admin</p>
            </Col>
            </Row>
            <Row>
                <Col md="6">
                    <div className="green-text">
                    <Input
                    label="Your fullname"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    name = "adminname"
                    onChange={this.changeHandler}
                    value={this.state.name}
                    />
                    </div>
                </Col>
                <Col md="6">
                    <div className="green-text">
                    <Input
                        label="Your email"
                        icon="envelope"
                        group
                        type="email"
                        validate = {true}
                        success="right"
                        name = 'adminmail'
                        onChange={this.changeHandler}
                        value={this.state.email}
                    />
                    </div>
                </Col>
                </Row>
                <Row>
                <Col md="6">
                    <div className="green-text">
                    <Input
                        label="Password"
                        icon="lock"
                        group
                        type="password"
                        validate
                        name="adminpassword"
                        onChange={this.changeHandler}
                        value={this.state.password}
                        />
                    </div>
                </Col>
                <Col md="6">
                    <div className="text-center">
                        <Button color="green" type="submit">Create Admin</Button>
                    </div>
                </Col>
                </Row>
        </form>
        
        </Container>
      )
    }
}

export default CreateAdmin;