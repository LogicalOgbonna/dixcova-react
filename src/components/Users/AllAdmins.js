import React, { Component } from 'react';
import { Container, Button } from 'mdbreact';

 class AllAdmins extends Component {
    state = {
        data: []
    }
    getAllAdmins = (event) =>{
        event.preventDefault();
        fetch('http://localhost:4000/admin/alladmin')
            .then(response => response.json())
            .then(data => {this.setState({data: data})
                })
                .catch(error => console.log(error));
            
    }

    deleteAdmin = (adminmail) => {
        console.log(adminmail)
        fetch('http://localhost:4000/admin/admin/delete', {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json',
              'cache-control': 'no-cache',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
                "adminmail": adminmail
            })
        })
        .then(response => {
            if(response.status === 200){
                return response.text()
                .then(data => console.log(data));
            }
            else if( response.status === 404 ){
                return response.text()
                .then(data => console.log(data))
            }
        }).catch(error => console.log(error))

    }

    render(){
        return (
            <Container style={{paddingTop: '0px'}}>
                <Button type="button" onClick={this.getAllAdmins}>View All Admins</Button>
                
                
                    
                        <table className="pure-table pure-table-bordered" >
                        <thead>
                     <tr>
                         <th>Admin_Id</th>
                         <th>Admin Name</th>
                         <th>Admin Mail</th>
                         <th>Action</th>
                     </tr>
                 </thead>
                        {this.state.data.map((val) => (
                        
         
                     <tbody key={val.adminid}>
                         <tr>
                             <td>{val.adminid}</td>
                             <td>{val.adminname}</td>
                             <td>{val.adminmail}</td>
                             <td><Button color="red" onClick={() => this.deleteAdmin(val.adminmail)}>Delete User</Button></td>
                         </tr>
                         </tbody>
                    
                    ))
                    }
                </table>
            </Container>
    )
  }
}

export default AllAdmins;