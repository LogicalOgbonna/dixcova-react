import React, { Component } from 'react';
import { Container, Row, Col, Button, DropdownToggle, DropdownItem, DropdownMenu, Dropdown, Card, CardBody, Table, TableBody, TableHead } from 'mdbreact';

import { FluidRightModal, VerticalModal, UserProductModal, DeleteUserModal, AssignRoleModal } from '../../Modal/Modal';

class View extends Component {
    state = {
        value: "",
        userData: [],
        productData:[],
        adminData:[],
        rolesData: [],
        userRoles: [],
        toggle: false,
        modal8: false,
        modal9: false,
        userInfo: [],
        userDeleteInfo: [],
        userDeleteError: [],
        adminDeleteInfo: [],
        adminDeleteError: [],
        productDeleteInfo: [],
        productDeleteError: [],
        rolesDeleteInfo: [],
        rolesDeleteError: [],
        userProduct: [],
        productModal: false,
        assignRoleModal: false,
        deleteUserModal: false,
        deleteAdminModal:false,
    }

    // Collect the value of inputs
    changeHandler = (event) => {
        this.setState({ ...this.state, value: event.target.value });
      }
    
    // Function that is responsible for all the view that receives a value
    // the value carries the any if the four states of value ( users, admin roles or producs)
    View = (value) => {
        // helps to keep the table shown on click of the view function
        this.setState({toggle: true})

        //checks if the view request is that of users
        if(value === "users"){
            //fectes all the users
            fetch('http://localhost:4000/admin/allusers', {
            method: "GET",
            headers: {
            'content-type': 'application/json',
            'cache-control': 'no-cache',
            'Accept': 'application/json'
            }
        })
        .then(response => {
            if(response.status === 200){
                response.json()
                .then(data =>{
                    this.setState({userData: data})
                })
            }
            else if(response.status === 404){
                response.text()
                .then(data =>{
                    console.log(data)
                })
            }
        }).catch(err => console.log(err))
        // fetches roles to be that can be assigned 
        fetch('http://localhost:4000/admin/allroles', {
            method: "GET",
            headers: {
            'content-type': 'application/json',
            'cache-control': 'no-cache',
            'Accept': 'application/json'
            }
        })
        .then(response => {
            if(response.status === 200){
                response.json()
                .then(data =>{
                    this.setState({userRoles: data})
                })
            }
            else if(response.status === 404){
                response.text()
                .then(data =>{
                    console.log(data)
                })
            }
        }).catch(err => console.log(err))
        }
        // Checks if the view request is of admin
        else if(value === "admin"){
            fetch('http://localhost:4000/admin/alladmin')
            .then(response => {
                if(response.status === 200){
                    response.json()
                    .then(data =>{
                        this.setState({adminData: data})
                    })
                }
                else if(response.status === 404){
                    response.text()
                    .then(data =>{
                        console.log(data)
                    })
                }
            })
                .catch(error => console.log(error));
        }

        // Checks if the request of products
        else if ( value === "products"){
        fetch('http://localhost:4000/admin/allproducts')
            .then(response => {
                if(response.status === 200){
                    response.json()
                    .then(data =>{
                        this.setState({productData: data})
                    })
                }
                else if(response.status === 404){
                    response.text()
                    .then(data =>{
                        console.log(data)
                    })
                }
            })
            .catch(error => console.log(error));
        }

        // Checks if the request is roles
        else if(value === "roles"){
            fetch('http://localhost:4000/admin/allroles')
            .then(response => {
                if(response.status === 200){
                    response.json()
                    .then(data =>{
                        this.setState({rolesData: data})
                    })
                }
                else if(response.status === 404){
                    response.text()
                    .then(data =>{
                        console.log(data)
                    })
                }
            })
                .catch(error => console.log(error));
        }
    }

    // A function that delete either a user, admin or role
    //the function receives three arguments, email, the state of value and a modal number (ml)
    delete = (email, value, modal ) => {
        //checks if the fields of email or value is empty
        //this will help in the modal rendering
        if(email === " " || value === " "){
            this.setState({
            ...this.state,
            [modal]: !this.state[modal]
            });
        }else{
            // checks if the delete request is for user
        if(value === "users"){
            fetch('http://localhost:4000/admin/user/delete', {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json',
              'cache-control': 'no-cache',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        })
        .then(response => {
            if(response.status === 200){
                return response.text()
                .then(data => {
                    this.setState({userDeleteInfo: data})
                    console.log(this.state.userDeleteInfo)
                });
            }
            else if( response.status === 404 ){
                return response.text()
                .then(data => {
                    this.setState({UserDeleteError: data})
                })
            }
        }).catch(error => console.log(error))
        }
        
        else if( value === "admin"){
            //checks if the delete request is for admin
            fetch('http://localhost:4000/admin/admin/delete', {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json',
              'cache-control': 'no-cache',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
                adminmail: email
            })
        })
        .then(response => {
            if(response.status === 200){
                return response.text()
                .then(data => {
                    this.setState({adminDeleteInfo: data})
                    console.log(this.state.adminDeleteInfo)
                });
            }
            else if( response.status === 404 ){
                return response.text()
                .then(data => {
                    this.setState({adminDeleteError: data})
                    console.log(this.state.adminDeleteError)})
            }
            else{
                return response.text()
                .then(data => console.log(data))
            }
        }).catch(error => console.log(error))
        }

        else if(value === "products"){
            //checks if the delete request is for products
            console.log(email)
            fetch('http://localhost:4000/admin/product/delete', {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json',
              'cache-control': 'no-cache',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
                productsearchcode: email
            })
            })
        .then(response => {
            if(response.status === 200){
                return response.text()
                .then(data => {
                    this.setState({productDeleteInfo: data})
                    console.log(this.state.productDeleteInfo)
                });
            }
            else if( response.status === 404 ){
                return response.text()
                .then(data => {
                    this.setState({productDeleteError: data})
                    console.log(this.state.productDeleteError)
                });
            }
        }).catch(error => console.log(error))
        }
        else if(value === "roles"){
            //checks if the delete request is for roles
            fetch('http://localhost:4000/admin/role/delete', {
            method: 'DELETE',
            mode: 'cors',
            headers: {
              'content-type': 'application/json',
              'cache-control': 'no-cache',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
                roleid: email
            })
            })
        .then(response => {
            if(response.status === 200){
                return response.text()
                .then(data => {
                    this.setState({rolesDeleteInfo: data})
                    console.log(this.state.rolesDeleteInfo)
                });
            }
            else if( response.status === 404 ){
                return response.text()
                .then(data => {
                    this.setState({rolesDeleteError: data})
                    console.log(this.state.rolesDeleteError)
                });
            }
        }).catch(error => console.log(error))
        }
            //sets the modal state to true to display the information got from the above api calls
            this.setState({
            ...this.state,
            [modal]: !this.state[modal]
            });
        }
    }

    // A function that assign roles to users
    // It receives the roleid, email and modal number
    assignRole = (roleid, email, modal) => {

        if(roleid === " " || email === " "){
            this.setState({
            ...this.state,
            [modal]: !this.state[modal]
            });
        }else{
            fetch('http://localhost:4000/admin/assignrole', {
            method: 'PUT',
            mode: 'cors',
            headers: {
              'content-type': 'application/json',
              'cache-control': 'no-cache',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                roles: [{roleid}]
            })
        })
        .then(response => {
            if(response.status === 200){
                return response.json()
                .then(data => {
                    this.setState({userInfo: data})
                    console.log(data)
                });
            }
            else if( response.status >= 400 ){
                return response.text()
                // .then(data => console.log(data))
            }
        }).catch(error => console.log(error))

    this.setState({
      ...this.state,
      [modal]: !this.state[modal]
    });

    }
}
    viewProduct = (product, modal) => {
        this.state.userProduct = Object.values(product);
        console.log(this.state.userProduct)

            this.setState({
            ...this.state,
            [modal]: !this.state[modal]
            });
    }
    
  render() {
    return (
        <Container style={{paddingLeft: '-20px', marginTop: '0px'}}>
            <Row className="py-3">
            <Col md="8">
            <div className="green-text"  style={{paddingTop: '0px'}} value={this.state.value} onChange={this.changeHandler}>
                <select className="custom-select browser-default" >
                <option value="select">View All</option>
                <option value="users">View All Users</option>
                <option value="admin">View All Admins</option>
                <option value="products">View All Products</option>
                <option value="roles">View All Roles</option>
                </select>
            </div>
            </Col>
            <Col md="4">
                <div className="text-center" style={{paddingTop: '0px'}} >
                    <Button size="sm" onClick={() =>this.View(this.state.value)} color="green" type="submit">View</Button>
                </div>
            </Col>
        </Row>
        {this.state.toggle ? this.state.value === "users" ? 
         <div>
        <Container style={{paddingTop: '0px'}}>
            <Row className="py-3">
                <Col md="12">
                <Card style={{ width: "110%" }}>
                    <CardBody>
                    <h2 className="h2-responsive pb-4">User Table</h2>
                    <Table 
                        striped 
                        bordered 
                        hover
                        responsive
                        >
                        <caption>List of users</caption>
                        <TableHead
                        sort="asc"
                        color="green">
                        <tr>
                            <th>USER ID</th>
                            <th>NAME</th>
                            <th>PHONE</th>
                            <th>EMAIL</th>
                            <th>PRODUCTS</th>
                            <th>USER ROLE</th>
                            <th>ASSIGN ROLE</th>
                            <th>DELETE USER</th>
                        </tr>
                        </TableHead>
                        {this.state.userData.map((val) => (
                            <TableBody key={val.userid}>
                            <tr>
                                <td>{val.userid}</td>
                                <td>{val.name}</td>
                                <td>{val.phonenumber}</td>
                                <td>{val.email}</td>
                                <td> 
                                    <Dropdown size="sm">
                                        <DropdownToggle  caret color="green">
                                            PRODUCTS
                                        </DropdownToggle>
                                        <DropdownMenu basic>

                                           {val.products.map((product) =>
                                                
                                                <DropdownItem key={product.productid} onClick={() => this.viewProduct(product, "productModal")}>{product.productname}</DropdownItem>
                                            )}
                                        
                                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </td>
                                <td> 
                                    <Dropdown size="sm">
                                        <DropdownToggle  caret color="green">
                                            ROLE
                                        </DropdownToggle>
                                        <DropdownMenu basic>

                                           {val.roles.map((role) =>
                                                <DropdownItem key={role.roleid}>{role.name}</DropdownItem>
                                            )}
                                        
                                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </td>
                                <td>
                                    <Dropdown size="sm">
                                            <DropdownToggle  caret color="green">
                                                Assign Role
                                            </DropdownToggle>
                                            <DropdownMenu basic>
                                            {this.state.userRoles.map((role) =>
                                                <DropdownItem key={role.roleid} onClick={() =>this.assignRole(role.roleid,val.email, "assignRoleModal")}>{role.name}</DropdownItem>
                                            )}
                                            
                                            </DropdownMenu>
                                        </Dropdown>
                                </td>
                                <td><Button  size="sm" color="red" onClick={() => this.delete(val.email, this.state.value, "deleteUserModal")}>Delete</Button></td>
                            </tr>
                            </TableBody>
                        ))}
                    </Table>
                    </CardBody>
                </Card>
                </Col>
            </Row>
        </Container>
         </div>: 
        this.state.value === "admin" ? 
        <Container style={{paddingTop: '0px'}}>
                <Row className="py-3">
                <Col md="12">
                <Card>
                    <CardBody>
                    <h2 className="h2-responsive pb-4">Admin Table</h2>
                    <Table 
                        striped 
                        bordered 
                        hover
                        >
                        <caption>List of Admins</caption>
                        <TableHead
                        sort="asc"
                        color="green">
               
             <tr>
                 <th>ADMIN ID</th>
                 <th>ADMIN NAME</th>
                 <th>ADMIN EMAIL</th>
                 <th>DELETE ADMIN</th>
             </tr>
         </TableHead>
         
             
         
                {this.state.adminData.map((val) => (
             <TableBody key={val.adminid}>
                 <tr>
                     <td>{val.adminid}</td>
                     <td>{val.adminname}</td>
                     <td>{val.adminmail}</td>
                     <td><Button size="sm" color="red" onClick={() => this.delete(val.adminmail, this.state.value, "deleteAdminModal")}>Delete Admin</Button></td>
                 </tr>
                 </TableBody>
            
            ))
            }
            </Table>
            </CardBody>
        </Card>
        </Col>
    </Row>
    </Container> : 
        this.state.value === "products" ? 
        <Container style={{paddingTop: '0px'}}>
        <Row className="py-3">
                <Col md="12">
                <Card>
                    <CardBody>
                    <h2 className="h2-responsive pb-4">Products Table</h2>
                    <Table 
                        striped 
                        bordered 
                        hover
                        >
                        <caption>List of Products</caption>
                        <TableHead
                        sort="asc"
                        color="green">
             <tr>
                 <th>PRODUCT ID</th>
                 <th>PRODUCT CATEGORY</th>
                 <th>PRODUCT NAME</th>
                 <th>PRODUCT SEARCH  CODE</th>
                 <th>DELETE PRODUCT</th>
             </tr>
         </TableHead>
                {this.state.productData.map((val) => (
             <TableBody key={val.productid}>
                 <tr>
                     <td>{val.productid}</td>
                     <td>{val.productcategory}</td>
                     <td>{val.productname}</td>
                     <td>{val.productsearchcode}</td>
                     <td><Button color="red" size="sm" onClick={() => this.delete(val.productsearchcode, this.state.value, 9)}>Delete Product</Button></td>
                 </tr>
                 </TableBody>
            ))
            }
        </Table>
        </CardBody>
        </Card>
        </Col>
    </Row>
    </Container>:
        this.state.value === "roles" ? 
        <Container style={{paddingTop: '0px'}}>
         <Row className="py-3">
                <Col md="12">
                <Card>
                    <CardBody>
                    <h2 className="h2-responsive pb-4">Roles Table</h2>
                    <Table 
                        striped 
                        bordered 
                        hover
                        >
                        <caption>List of Roles</caption>
                        <TableHead
                        sort="asc"
                        color="green">
             <tr>
                 <th>ROLE ID</th>
                 <th>ROLE NAME</th>
                 <th>ROLE AUTHORITY</th>
                 <th>DELETE ROLE</th>
             </tr>
         </TableHead>
                {this.state.rolesData.map((val) => (
             <TableBody key={val.roleid}>
                 <tr>
                     <td>{val.roleid}</td>
                     <td>{val.name}</td>
                     <td>{val.authority}</td>
                     <td><Button size="sm" color="red" style={{float: 'right'}} onClick={() => this.delete(val.roleid, this.state.value, 9)}>Delete Role</Button></td>
                 </tr>
                 </TableBody>
            
            ))
            }
            </Table>
            </CardBody>
            </Card>
            </Col>
            </Row>
    </Container>: null: null}
            
            <FluidRightModal 
                isOpen={this.state.modal8}
                click={this.assignRole}
                userInfo={this.state.userInfo}
            />

            <UserProductModal 
                 userProduct={this.state.userProduct}
                 isOpen={this.state.productModal}
                 click={this.viewProduct}
                 />

            <VerticalModal 
            userDeleteInfo={this.state.userDeleteInfo}
            userDeleteError={this.state.userDeleteError}
            adminDeleteInfo={this.state.adminDeleteInfo}
            adminDeleteError={this.state.adminDeleteError}
            productDeleteInfo={this.state.productDeleteInfo}
            productDeleteError={this.state.productDeleteError}
            rolesDeleteInfo={this.state.rolesDeleteInfo}
            rolesDeleteError={this.state.rolesDeleteError}
            isOpen={this.state.modal9}
            click={this.delete}/>

            <DeleteUserModal 
            // userProduct={this.state.userProduct}
            isOpen={this.state.deleteUserModal}
            click={this.delete}
            deletedData={this.state.userDeleteInfo}
            deletedError={this.state.userDeleteError}
            />
            
            <AssignRoleModal 
            isOpen={this.state.assignRoleModal}
            click={this.assignRole}
            userInfo={this.state.userInfo.roles}
            />
        </Container>
    )
  }
}

export default View;