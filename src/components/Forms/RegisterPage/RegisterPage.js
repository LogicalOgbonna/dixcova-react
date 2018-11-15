import React from 'react';
import { Container, Row, Col, Input, Button } from 'mdbreact';
import LaddaButton, { XL, SLIDE_UP, CONTRACT_OVERLAY, SLIDE_LEFT } from 'react-ladda';
import { Link } from 'react-router-dom';

import 'ladda/dist/ladda-themeless.min.css';

 class RegisterPage extends React.Component {

    state = {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      value: "",
      error: false,
      loading: false,
      progress: 0,
      slideleft: false,
      loading: false,
    }

    submitRegisterHandler = (event) => {
        this.setState({loading: true})
        event.preventDefault();
            const gender = this.state.value.charAt(0);
            console.log(gender);
    
            fetch('http://localhost:4000/user/signup', {
          method: 'post',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            gender: gender,
            password: this.state.password,
            phonenumber: this.state.phone,
          })})
            .then(response => 
          {
          if (response.status >= 200 && response.status < 300) {
              response.json().then(data => {
                  this.setState({
                      loaded: true
                  })
                window.location.assign("/login")
                console.log(data)
              })
          } else {
            this.setState({error: true, loading: false})
            console.log(response.text())
          }
        })
        .catch(error => console.log(error));
    
      }
    
    changeHandler = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value, value: event.target.value});
    }

    render(){
        return (
            <Container style={{ paddingTop: '0px'}}>
                
                    <form
                    className="needs-validation"
                    onSubmit={this.submitRegisterHandler}
                    noValidate
                    >
                    <Row className="mt-5">
                    <Col md="12">
                      <p className="h5 text-center mb-4">Register</p>
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
                            name = "name"
                            onChange={this.changeHandler}
                            value={this.name}
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
                                name = 'email'
                                onChange={this.changeHandler}
                                value={this.email}
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
                                name="password"
                                onChange={this.changeHandler}
                                value={this.password}
                                />
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="green-text">
                            <Input
                                label="Confirm password"
                                icon="exclamation-triangle"
                                group
                                type="password"
                                validate
                                name="confirmPassword"
                                onChange={this.changeHandler}
                                value={this.confirmPassword}
                            />
                            </div>
                        </Col>
                        </Row>
                        <Row>
                        <Col md="6">
                            <div className="green-text">
                            <Input
                                label="Your Phone"
                                icon="phone"
                                group
                                type="number"
                                validate
                                name="phone"
                                onChange={this.changeHandler}
                                value={this.phone}
                                />
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="green-text">
                                <Input
                                    label="Your Address"
                                    icon="address"
                                    error="Input is not an Email!"
                                    group
                                    type="text"
                                    validate = {true}
                                    success="right"
                                    name = 'address'
                                    onChange={this.changeHandler}
                                    value={this.address}
                                    />
                            </div>
                        </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                            <div className="green-text"  style={{paddingTop: '10px'}} value={this.value} onChange={this.changeHandler}>
                                <select className="custom-select browser-default" >
                                <option value="select">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                </select>
                            </div>
                            </Col>
                            <Col md="6" className="py-4">
                                <div className="text-center">
                                <LaddaButton
                                    className="btn btn-success btn-ladda"
                                    loading={this.state.loading}
                                    data-color="green"
                                    color="green"
                                    size="sm"
                                    data-style={SLIDE_LEFT}
                                >Register</LaddaButton>
                                    <Link  to="/login" color="green" >Already Have an account</Link>
                                </div>
                            </Col>
                        </Row>
                  </form>
                  
              </Container>
          )
    }
        
    }

export default RegisterPage;