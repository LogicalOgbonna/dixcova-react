import React, { Component } from 'react';
import { Container,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button } from 'mdbreact';

export default class ViewProfile extends Component {

  state = {
    userData: JSON.parse(window.sessionStorage.getItem('userData'))
  }

  render() {
    console.log(this.state.userData)
    return (
      <Container style={{paddingTop: '10px'}}>
        <Card reverse>
          <CardBody cascade>
              <CardTitle sytle={{textAlign: 'center'}}>User Profile</CardTitle>
              <CardText> Welcome {this.state.userData.email}  quick example text to build on the card title and make up the bulk of the card's content.</CardText>
              <Button href="#">Button</Button>
          </CardBody>
        </Card>
      </Container>
    )
  }
}
