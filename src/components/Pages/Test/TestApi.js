import React from 'react';

class TestApi extends React.Component {
    state ={
        isLoading: false
    }

    componentDidMount(){
        fetch('https://014bf112.ngrok.io/users')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({
                    isLoading: true
                })
            })
    }
    render(){
        const { isLoading } = this.state;
        if(!isLoading){
            return <div style={{paddingTop: "100px"}}>Loading...</div>
        }else{
            return(
        
                <div style={{paddingTop: "100px"}}>Done Loading</div>
                    )
        }
        
    }
}

export default TestApi;