import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-animated-slider';
import {
    FreeBird,
    Container,
    Col,
    Row,
    CardBody,
    Fa
  } from "mdbreact";
  import './style.css'
  import 'react-animated-slider/build/horizontal.css';
  import 'normalize.css/normalize.css';
  import '../HomePage/slider-animations.css';
  const NavLink = require("react-router-dom").NavLink;

  const content = [
    {
      title: 'Thank You for registering, Please wait while your account is been activated ',
      description:
      'A E-mail will be sent to you once this is done',
          button: 'Home',
          to: '/home',
      image: 'https://i.imgur.com/ZXBtVw7.jpg',
          user: 'Eteka Christopher',
          developer: "Back-End ",
      userProfile: 'https://i.imgur.com/JSW6mEk.png'
    }
  ];

const Welcome = () => {
    let userData = JSON.parse(window.sessionStorage.getItem('userData'));
    console.log(userData)
    return(
        <div style={{marginTop: '0rem'}}>
                <FreeBird>
                <Row>
                    <Col
                    md="12"
                    className=" float-none green z-depth-1 py-2 px-2"
                    >
                    <CardBody>
                    <Slider className="slider-wrapper" autoplay={1000}>
                        {content.map((item, index) => (
                        <div
                            key={index}
                            className="slider-content"
                            style={{ background: `url('${item.image}') no-repeat center center` }}
                        >
                        <div className="inner">
                                <h1>{item.title}</h1>
                                <p>{item.description}</p>
                                <button ><Link to={item.to}>{item.button}</Link></button>
                            </div>
                            <section>
                            <img src={item.userProfile} alt={item.user} />
                            <span>
                              {item.developer +" "}  Developer <strong>{item.user}</strong>
                            </span>
                        </section>
                        </div>
                        ))}
                    </Slider>
                    </CardBody>
                    </Col>
                    
                </Row>
                </FreeBird>
                <Container>
          <Row>
            <Col md="10" className="mx-auto mt-4">
              
              <Row id="categories">
                <Col md="4" className="mb-5">
                  <Col size="2" md="2" className="float-left">
                    <Fa icon="css3" className="green-text" size="2x" />
                  </Col>
                  <Col size="10" md="8" lg="10" className="float-right">
                    <h4 className="font-weight-bold">LOGIN</h4>
                    <p className="grey-text">
                      Registered members only.
                    </p>
                    <NavLink
                      tag="button"
                      className="btn btn-sm green darken-3"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </Col>
                </Col>
                <Col md="4" className="mb-5">
                  
                </Col>
                <Col md="4" className="mb-5">
                  <Col size="2" md="2" className="float-left">
                    <Fa icon="search" className="green-text" size="2x" />
                  </Col>
                  <Col size="10" md="8" lg="10" className="float-right">
                    <h4 className="font-weight-bold">SEARCH </h4>
                    <p className="grey-text">
                      Search for a Product now.
                    </p>
                    <NavLink
                      tag="button"
                      className="btn btn-sm green darken-3"
                      to="/search"
                    >
                      Search Product
                    </NavLink>
                  </Col>
                </Col>
              </Row>
              
            </Col>
          </Row>
        </Container>
        </div>
    )
}

export default Welcome;