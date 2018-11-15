import React from 'react';
import { Container, Row, Col, Input, Button } from 'mdbreact';
import LaddaButton, { SLIDE_LEFT } from 'react-ladda';

import { Link, withRouter } from 'react-router-dom'
import { LoginErrorModal } from '../../Modal/Modal';

 class LoginPage extends React.Component {

    state = {
      email: "",
      name: "",
      password: "",
      error: false,
      loading: false,
      loginError: [],
      loginErrorModal: false,
      userData: {
        userid: "",
        address: "",
        email: "",
        gender: "",
        phonenumber: "",
        products: [],
        role: []
      },
    }

  changeHandler = (event) => {
      this.setState({ ...this.state, [event.target.name]: event.target.value});
  }

  submitLoginHandler = (modal) =>{
    
    // event.preventDefault();
    if(this.state.email === ""){
      alert("Please fill out your email")
    } 
    else if(this.state.password===""){
      alert("Please fill out your password ");
    }
    else{
      this.setState({loading: true});
      fetch('http://localhost:4000/user/login', {
        method: 'post',
        mode: 'cors',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          
          email: this.state.email,
          password: this.state.password,
        })
        })
        .then(response => {
          if(response.status === 200 ){
          return response.json().then(data => {
            let userData = {...this.state.data}
            userData.userid = data.userid;
            userData.address = data.address;
            userData.email = data.email;
            userData.gender = data.gender;
            userData.phonenumber = data.phonenumber;
            userData.products = data.products;
            userData.role = data.roles;
            console.log(userData);
            let Profile = JSON.stringify(userData)
            window.sessionStorage.setItem('userData', Profile);
            console.log(data.roles[0].name)
            this.setState({loading: false});
            if(data.roles[0].name === "USER"){
              // this.props.history.push('/userdashboard');
              window.location.assign('/userdashboard');
            }
            else if(data.roles[0].name === "ADMIN"){
              // this.props.history.push("/admindashboard");
              window.location.assign('/admindashboard');
            }
            // else if(data.roles[0].name === undefined){
            //   window.location.assign("/welcome")
            // }
            // console.log(data)
          })}
          else if(response.status === 403){
            window.location.assign("/welcome")
            response.text().then(data => console.log(data))
          }
          else if(response.status === 400){
            return response.text().then(data => {
              console.log(data)
              this.setState({
                ...this.state,
                [modal]: !this.state[modal],
                loading: false,
                loginError: data
              });
            })
          }
          else {
            return response.json().then(data => {
              console.log(this.state.loginError);
              this.setState({
                ...this.state,
                [modal]: !this.state[modal],
                loading: false,
                loginError: data
              });
            })
          }
        }
          
      )
      .catch(error => console.log(error),
      // window.location.assign("/welcome")
      );
      }
    
    }
    
  render() {
    return (
      <Container>
      <Row style={{justifyContent: 'center'}}>
          <Col md="6">
            {/* <form
            className="needs-validation"
            onSubmit={(e) => this.submitLoginHandler(e, "loginErrorModal")}
            noValidate
            > */}
              <p className="h5 text-center mb-4">Sign in</p>
              <div className="green-text">
              <Input label="Type your email" 
                  icon="envelope" group type="email" 
                  validate error="wrong" success="right"
                  name="email"
                  onChange={this.changeHandler}
                  value={this.username}
                />
                <Input label="Type your password" 
                  icon="lock" group type="password" 
                  validate 
                  name="password"
                  onChange={this.changeHandler}
                  value={this.password}
                />
                <LaddaButton
                  className="btn btn-success btn-ladda"
                  loading={this.state.loading}
                  data-color="green"
                  color="green"
                  size="sm"
                  data-style={SLIDE_LEFT}
                  onClick={() => this.submitLoginHandler("loginErrorModal")}
                  >Login</LaddaButton>
                <Link to="/forgotpassword"> Forgot Password?</Link>
              </div>
            {/* </form> */}
              <div>
              <Link to="/register" > I dont have an account</Link>
              </div>
          </Col>
        </Row>
        {
          <LoginErrorModal 
          isOpen={this.state.loginErrorModal}
          click={this.submitLoginHandler}
          errorInfo={this.state.loginError}
          /> 
          }
    </Container>
  )
  }
    
  }

  export default withRouter(LoginPage);