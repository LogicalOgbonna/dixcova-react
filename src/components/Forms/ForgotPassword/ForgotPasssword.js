import React from 'react';
import { Container, Input, Button } from 'mdbreact';
import LaddaButton, { SLIDE_LEFT } from 'react-ladda';

class ForgotPasssword extends React.Component {
    state ={
        email: "",
        loading: false,
        forgotPasswordData: [],
        forgotPasswordError: [],
    }

changeHandler = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value});
}

//use this in the modal
//window.location.assign("/proceedpasswordreset")
resetPassword = (event) => {
    event.preventDefault();
    this.setState({loading: true})
    fetch('http://localhost:4000/user/passwordreset', {
          method: 'post',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            email: this.state.email,
          }),
        })
        .then(response => 
          {
          if (response.status >= 200 && response.status < 300) {
            response.text().then(data => {
                console.log(data), 
                this.setState({loading: false, forgotPasswordData: data})
                
            })
          } else {
              response.text(data => {
                console.log(data)
                this.setState({forgotPasswordError: data, loading: false})
              })
          }
        }
          )
        .catch(error => console.log(error), this.setState({loading: true}));
}
    render(){
        return (
            <Container style={{ paddingTop: '0px', maxWidth: '50%', justifyContent: 'center',}}>
                <p className="h5 text-center mb-4">Reset Password</p>
                <div className="green-text">
                    <Input label="Type your email" 
                        icon="envelope" group type="email" 
                        validate error="wrong" success="right"
                        name="email"
                        onChange={this.changeHandler}
                        value={this.email}
                        />
                </div>
                <div>
                    <LaddaButton
                        className="btn btn-success btn-ladda"
                        loading={this.state.loading}
                        style={{ float: 'right'}} onClick={this.resetPassword}
                        data-color="green"
                        color="green"
                        size="sm"
                        data-style={SLIDE_LEFT}
                    >Reset Password</LaddaButton>
                </div>
            </Container>
          )
    }
}

export default ForgotPasssword;