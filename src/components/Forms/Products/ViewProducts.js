import React from 'react';
import { Container, Button } from 'mdbreact';

class ViewProducts extends React.Component {

    state = {
        data: []
    }
    getAllProduct = (event) =>{
        event.preventDefault();
        fetch('http://localhost:4000/admin/allproducts')
            .then(response => response.json())
            .then(data => {this.setState({data: data})
                })
                .catch(error => console.log(error));
            
    }
    render(){
        return (
            <Container style={{paddingTop: '0px'}}>
                <Button type="button" onClick={this.getAllProduct}>View All Products</Button>
                
                
                    
                        <table className="pure-table pure-table-bordered" >
                        <thead>
                     <tr>
                         <th>Product_Id</th>
                         <th>Product Category</th>
                         <th>Product Name</th>
                         <th>Product Search Code</th>
                         <th>Action</th>
                     </tr>
                 </thead>
                        {this.state.data.map((val) => (
                        
         
                     <tbody key={val.productid}>
                         <tr>
                             <td>{val.productid}</td>
                             <td>{val.productcategory}</td>
                             <td>{val.productname}</td>
                             <td>{val.productsearchcode}</td>
                             <td><Button color="red" onClick={() => this.deleteProduct(val.productsearchcode)}>Delete User</Button></td>
                         </tr>
                         </tbody>
                    
                    ))
                    }
                </table>
            </Container>
          )
    }
}

export default ViewProducts;