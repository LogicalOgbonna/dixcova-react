import React from 'react';
import { Input, FormInline, Container, Button, Fa } from "mdbreact";

import { SearchModal} from '../Modal/Modal';

class SearchBar extends React.Component {
  state ={
    search: "",
    searchModal: false,
    searchData: "",
    searchError: "",
  }

  changeHandler = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value});
  }

  submitSearchHandler = (event, modal) => { 
    event.preventDefault();
    fetch('http://localhost:4000/user/search/product', {
      method: 'post',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        productsearchcode: this.state.search
      }),
    })
    .then(response => {
      if(response.status >= 200 && response.status < 300){
        response.json()
        .then(data => {
          this.setState({searchData: data, searchError: ""})
          console.log(data)})
          
      }
      else if(response.status >= 404){
        response.text()
        .then(data => this.setState({searchError: data, searchData: ""}))
      }
    })
    .catch(error => console.log(error))
    

    // let modalNumber = "modal" + ml;
    this.setState({
      ...this.state,
      [modal]: !this.state[modal]
    });
  };


  render(){
    return(
      <Container style={{paddingTop: '80px', paddingLeft: '800px', width: '100%'}}>
              <FormInline onSubmit={(event) => this.submitSearchHandler(event, "searchModal")} className="md-form active-pink-2">
                <Fa icon="search" />
                <Input
                  className="form-control form-control-sm ml-3 w-75"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  name="search"
                  value={this.state.search}
                  onChange={this.changeHandler}
                />
                <Button  color="green" type="submit" >Search a product</Button>
              </FormInline>

              <SearchModal 
              productcategory={" Product Category: " + this.state.searchData.productcategory}
              productid={" Product ID: " + this.state.searchData.productid}
              productname={" Product Name: " + this.state.searchData.productname}
              productsearchcode={" Product Search: " + this.state.searchData.productsearchcode}
              error={this.state.searchError}
              isOpen={this.state.searchModal}
              click={this.submitSearchHandler}
              />
      </Container>
  )
  }
}

export default SearchBar;