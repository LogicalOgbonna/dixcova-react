import React, { Component } from 'react';
import { Row, Col, Container, Input, Button } from 'mdbreact';

export default class EditProduct extends Component {

  
    changeHandler = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value});
    }
    handleChange = (event) =>{
        this.setState({category: event.target.value})
    }

    componentDidMount = () =>{
    const userData = 47;
        fetch(`http://localhost:4000/user/${userData}/addproduct`, {
        method: 'post',
        mode: 'cors',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            productcategory: this.state.category,
            productname: this.state.productname,
        })
        })
        .then(response => {
            if (response.status >= 200 && response.status < 300){
                response.json()
                .then(data => {
                    this.setState({addData: data})
                })
            }
            else if (response.status >= 400 ){
                response.text()
                .then(data => {
                    this.setState({errorData: data})
                    console.log(data)
                })
            }
        })
        //   .then(data => console.log(data));
        .catch(error => console.log(error))
    }
    handleAdd = (event) => {
        event.preventDefault();
        // const userData = this.props.userData;
        
    }
  render() {
    return (
      <Container style={{paddingTop: '0px'}}>
          <form onSubmit={this.handleAdd}>
              <Row>
                  <Col md="6">
                      <div className="green-text"  style={{justifyContent: 'center', paddingTop: '0px'}} value={this.category} onChange={this.handleChange}>
                          <label>Category</label>
                          <select className="custom-select browser-default" >
                          <option name="select">Select Category</option>
                          <option name="Male">Food</option>
                          <option name="Female">Drug</option>
                          </select>
                      </div>
                  </Col>
                  <Col md="6">
                          <div className="green-text">
                          <Input
                          label="Product Name"
                          icon="user"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          name = "productname"
                          onChange={this.changeHandler}
                          value={this.productname}
                          />
                          </div>
                  </Col>
              </Row>
              <Row>
                  <Col md="12">
                      <Button color="green" type="submit" style={{float: 'right'}}>Add</Button>
                  </Col>
              </Row>    
          </form>
          
        </Container>
    )
  }
}
