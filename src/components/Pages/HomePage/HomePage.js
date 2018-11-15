import React from 'react';
import Slider from 'react-animated-slider';
import { Link } from 'react-router-dom';
import {
    FreeBird,
    Container,
    Col,
    Row,
    CardBody,
    Fa
  } from "mdbreact";
import 'react-animated-slider/build/horizontal.css';
import 'normalize.css/normalize.css';
import './slider-animations.css';
import './styles.css';
const NavLink = require("react-router-dom").NavLink;

const content = [
	{
		title: 'Welcome to DixCova Food Verification and Identification Platform ',
		description:
		'A Platform that make sure the consumers consume a trusted product.',
        button: 'Please Login',
        to: '/login',
		image: 'https://i.imgur.com/ZXBtVw7.jpg',
        user: 'Eteka Christopher',
        developer: "Back-End ",
		userProfile: 'https://i.imgur.com/JSW6mEk.png'
	},
	{
		title: 'Want to register a product?',
		description:
		'Are a marketer that want your product registered, please sign up and register your product',
        button: 'Register',
        to: '/register',
		image: 'https://i.imgur.com/DCdBXcq.jpg',
        user: 'Ogbonna Arinze',
        developer: 'Front-End',
		userProfile: 'https://i.imgur.com/0Clfnu7.png'
	},
	{
		title: 'Search a Product with the product search code',
		description:
		'A consumer that want to check the authenticity of a product before consumption? All Registered products have search codes, check a product by its search code now',
        button: 'Search Product',
        to: '/search',
		image: 'https://i.imgur.com/DvmN8Hx.jpg',
        user: 'ActivEdge',
        developer: " ",
		userProfile: 'https://i.imgur.com/4KeKvtH.png'
	}
];

const HomePage = () => {
    return(
        <div style={{marginTop: '4rem'}}>
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
                  <Col size="2" md="2" className="float-left">
                    <Fa icon="user" className="green-text" size="2x" />
                  </Col>
                  <Col size="10" md="8" lg="10" className="float-right">
                    <h4 className="font-weight-bold">REGISTER</h4>
                    <p className="grey-text">
                      Create a new account.
                    </p>
                    <NavLink
                      tag="button"
                      className="btn btn-sm green darken-2"
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </Col>
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

export default HomePage;