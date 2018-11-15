import React, { Component } from 'react'
import LaddaButton, { SLIDE_LEFT } from 'react-ladda'
import { Container,
  Card,
  CardBody,
  CardTitle,
  Col,
  Input,
  Row } from 'mdbreact';

export default class ChangePassword extends Component {

  state = {
    loading: false,
    newpassword: "",
    oldpassword: "",
    confirmnewpassword: "",
    respons: [],
    responseError: [],
    userData: JSON.parse(window.sessionStorage.getItem('userData')),
  }

  changeHandler = (event) => {
    this.setState({
      ...this.state, [event.target.name]: event.target.value
    })
  }
  changePassword = (event) => {
    event.preventDefault();
    const userMail = this.state.userData.email;
    console.log(userMail)
    this.setState({loading: true})
    fetch(`http://localhost:4000/user/changepassword`, {
      method: 'post',
      mode: 'cors',
      headers: {
          'content-type': 'application/json;charset=UTF-8',
          'Accept': 'application/json',
      },
      body: JSON.stringify({
        oldpassword: this.state.oldpassword,
        newpassword: this.state.newpassword,
        email: userMail,
      })
      })
      .then(response => {
          if (response.status >= 200 && response.status < 300){
              response.text()
              .then(data => {
                  this.setState({response: data})
                  console.log(data)
                  this.setState({loading: false})
              })
          }
          else if (response.status >= 400 ){
              response.text()
              .then(data => {
                  this.setState({responseError: data})
                  console.log(data)
                  this.setState({loading: false})
              })
          }
      })
      //   .then(data => console.log(data));
      .catch(error => console.log(error))
  }

  render() {
    return (
      <Container style={{paddingTop: '20px'}}>
        <Card reverse>
          <CardBody cascade>
              <CardTitle>Change User Password</CardTitle>
              <Row style={{justifyContent: 'center', paddingTop: '0px'}}>
                <Col md="6">
                  <form
                  className="needs-validation"
                  onSubmit={(event) => this.changePassword(event)}
                  noValidate
                  >
                    <div className="green-text">
                    <Input label="Type Old Password" 
                        icon="lock" group type="password" 
                        validate error="wrong" success="right"
                        name="oldpassword"
                        onChange={this.changeHandler}
                        value={this.oldpassword}
                      />
                      <Input label="Type New Password" 
                        icon="lock" group type="password" 
                        validate 
                        name="newpassword"
                        onChange={this.changeHandler}
                        value={this.newpassword}
                      />
                      <Input label="Confirm New Password" 
                        icon="lock" group type="password" 
                        validate 
                        name="confirmnewpassword"
                        onChange={this.changeHandler}
                        value={this.confirmnewpassword}
                      />
                      <LaddaButton
                        className="btn btn-success btn-ladda"
                        loading={this.state.loading}
                        data-color="green"
                        color="green"
                        size="sm"
                        data-style={SLIDE_LEFT}
                        style={{float: 'right'}}
                        >Continue</LaddaButton>
                    </div>
                  </form>
                    <div>
                    </div>
                </Col>
              </Row>
          </CardBody>
        </Card>
      </Container>
    )
  }
}
