import React, { Component } from 'react';
import { Container, Row, Col, Button, DropdownToggle, DropdownItem, DropdownMenu, Dropdown, Card, CardBody, Table, TableBody, TableHead } from 'mdbreact';
import { EditProduct, DeleteProductModal } from '../../Modal/Modal';

export default class  ViewProduct extends Component {

  state = {
    products:[],
    productError: "",
    DeleteProductModal: false,
    userData: JSON.parse(window.sessionStorage.getItem('userData')),
    editProduct: [],
    editProductError: "",
    productModal: false,
    category: "",
    productDelete: [],
    emptyContent: false
  }

  changeHandler = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value});
}
handleChange = (event) =>{
    this.setState({category: event.target.value})
}

editProduct = (userid, modal) => {
  fetch(`http://localhost:4000/user/${userid}/editproduct`, {
      method: 'post',
      mode: 'cors',
      headers: {
          'content-type': 'application/json;charset=UTF-8',
          'Accept': 'application/json',
      },
      body: JSON.stringify({
        productid: this.state.products.productid,
        productsearchcode: this.state.products.productsearchcode,
        productcategory: 'Food',
        productname: 'Mango'

      })
      })
      .then(response => {
          if (response.status >= 200 && response.status < 300){
              response.json()
              .then(data => {
                  this.setState({editProduct: data})
              })
          }
          else if (response.status >= 400 ){
              response.text()
              .then(data => {
                  this.setState({editProductError: data})
              })
          }
      })
      //   .then(data => console.log(data));
      .catch(error => console.log(error))
}

componentDidMount = () =>{

      const userid = this.state.userData.userid;
      fetch(`http://localhost:4000/user/${userid}/products`, {
      method: 'post',
      mode: 'cors',
      headers: {
          'content-type': 'application/json;charset=UTF-8',
          'Accept': 'application/json',
      },
      body: JSON.stringify({
        userid: userid
      })
      })
      .then(response => {
          if (response.status === 200 ){
              response.json()
              .then(data => {
                  this.setState({products: data})
              })
          }
          else if(response.status === 204){
              this.setState({emptyContent: true})
          }
          else if (response.status >= 400 ){
              response.text()
              .then(data => {
                  this.setState({productError: data})
              })
          }
      })
      //   .then(data => console.log(data));
      .catch(error => console.log(error))
  }
  
editProduct = (userid, modal) => {
    this.setState({
      ...this.state,
      [modal]: !this.state[modal]
      });
  }

deleteProduct = (code, modal) =>{
  fetch('http://localhost:4000/user/remove/product', {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json',
              'cache-control': 'no-cache',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
                productsearchcode: code
            })
        })
        .then(response => {
            if(response.status === 200){
                return response.text()
                .then(data => {
                    this.setState({productDelete: data})
                });
            }
            else if( response.status === 404 ){
                return response.text()
                .then(data => {
                    this.setState({productDeleteError: data})
                })
            }
        }).catch(error => console.log(error))
        this.setState({
            ...this.state,
            [modal]: !this.state[modal]
            });
}

render() {
return (
  <Container style={{paddingTop: '0px'}}>
      <Row className="py-3">
                <Col md="12">
                <Card>
                    <CardBody>
                    <h2 className="h2-responsive pb-4">User Product Table</h2>
                    <Table 
                        striped 
                        bordered 
                        hover
                        >
                        <caption>List of user products</caption>
                        <TableHead
                        sort="asc"
                        color="green">
                        <tr>
                            <th>PRODUCT ID</th>
                            <th>PRODUCT NAME</th>
                            <th>PRODUCT CATEGORY</th>
                            <th>PRODUCT SEARCH CODE</th>
                            <th>EDIT PRODUCT</th>
                            <th>DELETE PRODUCT</th>
                        </tr>
                        </TableHead>
                        
                            <TableBody>
                                {this.state.emptyContent ? 
                                    <tr>
                                        <td>No Product</td>
                                        <td>No Product</td>
                                        <td>No Product</td>
                                        <td>No Product</td>
                                        <td>No Product</td>
                                        <td>No Product</td>
                                    </tr>
                                        :
                                    
                                        
                                        this.state.products.map((pro) => (
                                            <tr key={pro.productsearchcode}>
                                            <td>{pro.productid}</td>
                                            <td>{pro.productname}</td>
                                            <td>{pro.productcategory}</td>
                                            <td>{pro.productsearchcode}</td>
                                            <td><Button  size="sm" color="green" onClick={() => this.editProduct(this.state.userid, "productModal")}>Edit Product</Button></td>
                                            <td><Button  size="sm" color="red"  onClick={() => this.deleteProduct(pro.productsearchcode, "DeleteProductModal")}>Delete Product</Button></td>
                                            </tr>
                                        
                                        
                                    
                                        ))}
                            </TableBody>
                        
                    </Table>
                    </CardBody>
                </Card>
                </Col>
            </Row>
        <EditProduct 
        product={this.state.products}
        isOpen={this.state.productModal}
        click={this.editProduct}
        category={this.state.category}
        changeHandler={this.changeHandler}/>

        <DeleteProductModal 
        isOpen={this.state.DeleteProductModal}
        click={this.deleteProduct}
        product={this.state.productDelete}/>
    </Container>
)
}
  }

