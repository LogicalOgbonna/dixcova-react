import React from 'react';

import './Dashboard.css';
import AddProduct from '../Product/AddProduct';
import Home from '../Home/Home';
import Profile from '../Profile/ViewProfile';
import ViewProduct from '../Product/ViewProduct';
import ChangePassword from '../Profile/ChangePassword';

class DashBoard extends React.Component{

    state = {
        showProduct: false,
        showProfile: false,
        showAddProduct: false,
        showHome: true,
        ViewProduct: false,
        showChangePassword: false
    }

    dashboard = (value) => {
        this.setState({
            ...this.state,
            showProfile: false,
            showHome: false,
            ViewProduct: false,
            showAddProduct: false,
            showChangePassword: false,
            [value]: true
          });
        
    }

    logout = () => {
        sessionStorage.removeItem("userData")
        window.location.assign('/home')
    }
    
    render(){
        return(
            <div>
                <div id="snav" className="en">
                    <ul>
                        <li onClick={() => this.dashboard("showHome")}><a to="/"> <i className="fa fa-home"></i> <span>Home</span>  </a></li>
                        <li onClick={() => this.dashboard("showProfile")}><a to=''> <i className="fa fa-user"></i> <span>View Profile</span>  </a></li>
                        <li onClick={() => this.dashboard("ViewProduct")}> <a to=''><i className="fa fa-archive"></i> <span>View Product</span>  </a></li>
                        <li onClick={() => this.dashboard("showAddProduct")}> <a to=''><i className="fa fa-briefcase"></i> <span>Add Product</span>  </a></li>
                        <li onClick={() => this.dashboard("showChangePassword")}> <a to=''><i className="fa fa-exclamation-triangle"></i> <span>Change Password</span>  </a></li>
                        <li onClick={this.logout}> <a to=''><i className="fa fa-sign-out"></i> <span>Logout</span>  </a></li>
                    </ul>
                </div>
                

                <div>
                    
                    {this.state.showHome ? <Home /> : null}
                    {this.state.ViewProduct ? <ViewProduct /> : null}
                    { this.state.showProfile ? <Profile /> :null}
                    {this.state.showAddProduct? <AddProduct />: null}
                    {this.state.showChangePassword? <ChangePassword />: null}
                </div>
            </div>
    
        )
    }
    
}

export default DashBoard;