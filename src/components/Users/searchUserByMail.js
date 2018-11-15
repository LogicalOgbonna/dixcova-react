import React, { Component } from 'react';
import { Container, Button, Row, Col, Input } from 'mdbreact';

class searchUserByMail extends Component {
    state = {
        email: ""
    }

    viewUser = (event) =>{
        event.preventDefault();
        fetch('http://localhost:4000/admin/finduser',{
            method: "POST",
            mode: 'cors',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Accept': 'application/json',
      },
      body: JSON.stringify({
            email: this.state.email
            })
        })
            .then(response =>{
                if (response.status >= 200 && response.status < 300){
                    response.json().then(data => {
                        console.log(data)
                    })
                }
            })
                .catch(error => console.log(error));
    }

    changeHandler = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value});
      }

  render() {
    return (
        
        <Container style={{ paddingTop: '0px'}}>
                        
            <form
            className="needs-validation"
            onSubmit={this.viewUser}
            noValidate
            >
            <Row className="mt-5">
            <Col md="12">
            <p className="h5 text-center mb-4">View User</p>
            </Col>
            </Row>
            <Row>
                <Col md="12">
                    <div className="green-text">
                    <Input
                        label="Your email"
                        icon="envelope"
                        group
                        type="email"
                        validate = {true}
                        success="right"
                        name = 'email'
                        onChange={this.changeHandler}
                        value={this.state.email}
                    />
                    </div>
                </Col>
                </Row>
                <Row>
                <Col md="12">
                    <div className="text-center">
                        <Button color="green" type="submit">Search User</Button>
                    </div>
                </Col>
                </Row>
        </form>
        {console.log(this.state.email)}
        </Container>
    )
  }
}

export default searchUserByMail