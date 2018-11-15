import React from 'react';
import { Container, Input, Button } from 'mdbreact';
import LaddaButton, { SLIDE_LEFT } from 'react-ladda';

class ProceedPasswordReset extends React.Component {
    state ={
        resetcode: "",
        loading: false,
        resetdata: [],
    }

changeHandler = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value});
}

// Use this in the modal
// window.location.assign("/forgotpassword")

resetPassword = (event) => {
    event.preventDefault();
    this.setState({loading: true})
    fetch('http://localhost:4000/user/passwordreset/proceed', {
          method: 'post',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            resetcode: this.state.resetcode,
          }),
        })
        .then(response => 
          {
          if (response.status >= 200 && response.status < 300) {
                response.text().then(data => 
                    this.setState({resetData: data})
                    )

          } else {
              response.text(data => {
                console.log(data)
                this.setState({resetError: data, loading: false})
              })
          }
        }
          )
        .catch(error => console.log(error), this.setState({loading: false}));
}
    render(){
        return (
            <Container style={{ paddingTop: '0px', maxWidth: '50%', justifyContent: 'center',}}>
                <p className="h5 text-center mb-4">Enter Reset Code</p>
                <div className="green-text">
                    <Input label="Type your reset code" 
                        icon="code" group type="text" 
                        validate error="wrong" success="right"
                        name="resetcode"
                        onChange={this.changeHandler}
                        value={this.username}
                        />
                </div>
                <div>
                    <LaddaButton
                        className="btn btn-success btn-ladda"
                        loading={this.state.loading}
                        style={{ float: 'right'}} 
                        onClick={this.resetPassword}
                        data-color="green"
                        color="green"
                        size="sm"
                        data-style={SLIDE_LEFT}
                        >Proceed to Reset Password</LaddaButton>
                </div>
            </Container>
          )
    }
}

export default ProceedPasswordReset;