import React from 'react';
import { Row, Col, Container, Input, Button } from 'mdbreact';

import { VerticalModal } from '../../Modal/Modal';

class Add extends React.Component {
    state ={
        toggle: false,
        value: "",
        adminname: "",
        adminmail: "",
        adminpassword: "",
        name: "",
        roleid: "",
        // error: false,
        modal9: false,
        addAdmin: [],
        addAdminError: [],
        addRole: {},
        addRoleError:[],
    }

    changeHandler = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value});
      }
    handleChange = (event) => {
        this.setState({value: event.target.value,})
    }
    handleAdd = (value, mt,  ml) =>{
        if(value === this.state.adminname){
            fetch('http://localhost:4000/admin/signupadmin', {
                method: 'post',
                headers: {
                  'content-type': 'application/json;charset=UTF-8',
                  'Accept': 'application/json',
                },
                body: JSON.stringify({
                  
                    adminname: this.state.adminname,
                    adminmail: this.state.adminmail,
                    adminpassword: this.state.adminpassword,
                })})
                  .then(response => 
                {
                if (response.status >= 200 && response.status < 300) {
                    response.json()
                    .then(data => {
                        this.setState({addAdmin: data})
                      console.log(data)
                    })
                } else {
                  this.setState({error: true})
                  response.text()
                  .then(data =>{
                      this.setState({addAdminError: data})
                      console.log(data)
                  })
                }
              })
              .catch(error => console.log(error));
              this.setState({
                  adminname: "",
                  adminmail: "",
                  adminpassword: "",
                })
        }
        else if(value === this.state.name){
            fetch('http://localhost:4000/admin/createrole', {
                method: 'post',
                headers: {
                  'content-type': 'application/json;charset=UTF-8',
                  'Accept': 'application/json',
                },
                body: JSON.stringify({
                  
                    name:this.state.name,
                    roleid:this.state.roleid
                })})
                  .then(response => 
                {
                if (response.status >= 200 && response.status < 300) {
                    response.json()
                    .then(data => {
                      this.setState({addRole: data})
                      console.log(data)
                    })
                } else {
                  response.text()
                  .then(data =>{
                      this.setState({addRoleError: data})
                      console.log(data)
                  })
                }
              })
              .catch(error => console.log(error));
              this.setState({
                name: "",
                roleid: "",
              })
        }

        let modalNumber = "modal" + ml;
            this.setState({
            ...this.state,
            [modalNumber]: !this.state[modalNumber]
            });

    }

    render(){
        return (
            <Container style={{paddingTop: '10px'}}>
                  <Row>
                      <Col md="12">
                          <div className="green-text"  style={{justifyContent: 'center', paddingTop: '5px'}} onChange={this.handleChange}>
                              <select className="custom-select browser-default" >
                              <option value="select">Select What to Add</option>
                              <option value="role">Create Role</option>
                              <option value="admin">Create Admin</option>
                              </select>
                          </div>
                      </Col>
                  </Row>
                  <Row>
                  </Row>

              {
                this.state.value === "admin"? 
                <Container style={{paddingBottom: '10px'}}>
                    <Row>
                        <Col md="4">
                            <div className="green-text">
                            <Input
                                label="Admin Name"
                                icon="user"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                                name = "adminname"
                                onChange={this.changeHandler}
                                value={this.state.adminname}
                                />
                            </div>
                        </Col>
                        <Col md="4">
                                <div className="green-text">
                                <Input
                                label="Admin Email"
                                icon="envelope"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                                name = "adminmail"
                                onChange={this.changeHandler}
                                value={this.state.adminmail}
                                />
                                </div>
                        </Col>
                        <Col md="4">
                                <div className="green-text">
                                <Input
                                label="Admin Password"
                                icon="lock"
                                group
                                type="password"
                                validate
                                error="wrong"
                                success="right"
                                name = "adminpassword"
                                onChange={this.changeHandler}
                                value={this.state.adminpassword}
                                />
                                </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Button style={{float: 'right'}} onClick={() => this.handleAdd(this.state.adminname, this.state.adminmail, 9)} color="green" type="submit">Add Admin</Button>
                        </Col>
                    </Row>
            </Container>:
                this.state.value === "role" ? 
                <Container style={{paddingTop: '0px'}}>
                        <Row>
                            <Col md="6">
                                <div className="green-text">
                                <Input
                                    label="Role Name"
                                    icon="user"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                    name = "name"
                                    onChange={this.changeHandler}
                                    value={this.state.name}
                                    />
                                </div>
                            </Col>
                            <Col md="6">
                                    <div className="green-text">
                                    <Input
                                    label="Role Id"
                                    icon="user"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                    name = "roleid"
                                    onChange={this.changeHandler}
                                    value={this.state.roleid}
                                    />
                                    </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <Button onClick={() => this.handleAdd(this.state.name, this.state.roleid, 9)} style={{float: 'right'}} color="green" type="submit">Add Role</Button>
                            </Col>
                        </Row>  
                </Container>:
                null}

                <VerticalModal
                addAdmin={this.state.addAdmin}
                addAdminError={this.state.addAdminError}
                addRole={this.state.addRole}
                addRoleError={this.state.addRoleError}
                isOpen={this.state.modal9}
                click={this.handleAdd}
                />
            </Container>
              
        )
    }
  
}

export default Add;