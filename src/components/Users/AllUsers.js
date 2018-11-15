import React from 'react';
import { Container, Button } from 'mdbreact';

class AllUsers extends React.Component {

    state = {
        data: [],
    }

    getUsers = () => {

        fetch('http://localhost:4000/user/showusers', {
            method: "GET",
            headers: {
            'content-type': 'application/json',
            'cache-control': 'no-cache',
            'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {this.setState({data: data})
                })
            };
    

    deleteUser = (email) => {
        console.log(email)
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
                .then(data => console.log(data));
            }
            else if( response.status === 404 ){
                return response.text()
                .then(data => console.log(data))
            }
        })

    }

    //Assign user Role
    addRole = (email) => {
        
    }

   

    render(){
        return (
            <Container style={{paddingTop: '100px'}}>
                <Button type="button" onClick={this.getUsers}>View Users</Button>
                
                
                    
                        <table className="pure-table pure-table-bordered" >
                        <thead>
                     <tr>
                         <th>userId</th>
                         <th>Name</th>
                         <th>Phone</th>
                         <th>Email</th>
                         <th></th>
                     </tr>
                 </thead>
                        {this.state.data.map((val) => (
                        
         
                     <tbody key={val.userid}>
                         <tr>
                             <td>{val.userid}</td>
                             <td>{val.name}</td>
                             <td>{val.phonenumber}</td>
                             <td>{val.email}</td>
                             <td><Button color="red" onClick={() => this.deleteUser(val.email)}>Delete User</Button></td>
                             <td><Button color="green" onClick={() => this.addRole(val.email)}>Assign Role</Button></td>
                         </tr>
                         </tbody>
                    
                    ))
                    }
                </table>
            </Container>
      )
    }
      
    //    if (!isLoaded) return ( <div>loading</div>)
    //    else{
        
       }
    

export default AllUsers;