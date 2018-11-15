import React from 'react';

import './Dashboard.css';
import View from '../../Admin/View/View';
import Add from '../../Admin/Add/Add';
import Home from '../Home/Home';

class DashBoard extends React.Component{

    state = {
        showView: false,
        showAdd: false,
        showHome: true
    }
    dashboard = (value) => {
        // this.setState({
        //     ...this.state,
            
        // })
        this.setState({
            ...this.state,
            showView: false,
            showAdd: false ,
            showHome: false,
            [value]: true
          });
        
    }
    
    logOut = () => {
        sessionStorage.removeItem("userData")
        window.location.assign('/home')
    }
    render(){
        return(
            <div>
                <div id="snav" className="en">
                    <ul>
                        <li onClick={() => this.dashboard("showHome")}><a to="/"> <i className="fa fa-home"></i> <span>Home</span>  </a></li>
                        <li onClick={() => this.dashboard("showView")}><a to=''> <i className="fa fa-street-view"></i> <span>View</span>  </a></li>
                        <li onClick={() => this.dashboard("showAdd")}> <a to=''><i className="fa fa-plus "></i> <span>Create</span>  </a></li>
                        <li onClick={() => this.dashboard()}> <a to=''><i className="fa fa-ban"></i> <span>Delete</span>  </a></li>
                        <li onClick={this.logOut}><a to=''> <i className="fa fa-sign-out"></i> <span>Logout</span>  </a></li>
                    </ul>
                </div>
                

                <div style={{paddingTop: '0px'}}>
                    {this.state.showHome ? <Home /> : null}
                    {this.state.showView ? <View /> : null}
                    { this.state.showAdd ? <Add /> :null}
                </div>
            </div>
    
        )
    }
    
}

export default DashBoard;