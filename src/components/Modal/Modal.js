import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input } from "mdbreact";

export const SearchModal = (props) => {
    return (
    <Modal
        isOpen={props.isOpen}
        toggle={(event) => props.click(event, "searchModal")}
        side
        position="top-right"
      >
        <ModalHeader toggle={(event) => props.click(event, "searchModal")}>Verified Products</ModalHeader>
        <ModalBody>
          {
              props.error === ""?
          <div>
            <h3 style={{textAlign: 'center'}}>{props.productcategory}</h3>
            <p>{props.productid}</p>
            <p>{props.productname}</p>
            <p>{props.propa}</p>
            <p>{props.productsearchcode}</p> 
          </div>
          :<p>{props.error}</p>
          }
          
          
        </ModalBody>
        <ModalFooter>
          <Button color="green" style={{float: 'right', maxWidth: '50%'}} onClick={(event) => props.click(event, "searchModal")}>
            Close
          </Button>
          <Button color="green" style={{float: 'left', maxWidth: '50%'}} onClick={(event) => props.click(event, "searchModal")}>
          Save changes
          </Button>
        </ModalFooter>
    </Modal>
    )
}


export const FluidRightModal= (props) => {
 
    if(props.userInfo.products === " "){
        const man = props.userInfo.products.map(val =>{
                        
            
            
        return (
            <Modal
            isOpen={props.isOpen}
            toggle={() => props.click(" "," ",8)}
            fullHeight
            position="right"
        >
        
            <ModalHeader toggle={() => props.click(" "," ",8)}>Modal title</ModalHeader>
            
                <ModalBody >
                    {man}
                    {console.log(man)}
                    debugger
                </ModalBody>
             
            {console.log(props.userInfo.products)}
            <ModalFooter>
            <Button color="secondary" onClick={() => props.click(" "," ",8)}>
                Close
            </Button>
            <Button color="primary">Save changes</Button>
            </ModalFooter>
        </Modal>
        )    
            
        })
    }
    
  return (
        <Modal
            isOpen={props.isOpen}
            toggle={() => props.click(" "," ",8)}
            fullHeight
            position="right"
        >
        
            <ModalHeader toggle={() => props.click(" "," ",8)}>Modal title</ModalHeader>
            {props.userInfo.products ? 
                <ModalBody >
                    
                </ModalBody>
             : null}
            {/* {console.log(props.userInfo.products)} */}
            <ModalFooter>
            <Button color="secondary" onClick={() => props.click(" "," ",8)}>
                Close
            </Button>
            <Button color="primary">Save changes</Button>
            </ModalFooter>
        </Modal>
  )
}

export const VerticalModal = (props) => {
  return (
    <Modal
          isOpen={props.isOpen}
          toggle={() => props.click(" "," ",9)}
          centered
        >
          <ModalHeader toggle={() => props.click(" "," ",9)}>Modal title</ModalHeader>
          <ModalBody>
          {props.userDeleteInfo}
          {props.userDeleteError}
          {props.adminDeleteInfo}
          {props.adminDeleteError}
          {props.productDeleteInfo}
          {props.productDeleteError}
          {props.rolesDeleteInfo}
          {props.rolesDeleteError}
          {/* {props.addAdmin.adminid +
          props.addAdmin.adminname + 
          props.addAdmin.adminmail
          } */}
          {props.addAdminError}
          
          {props.addRoleError}
          </ModalBody>
          <ModalFooter>
            <Button color="green" onClick={() => props.click(" "," ",9)}>
              Close
            </Button>
            <Button color="green">Save changes</Button>
          </ModalFooter>
        </Modal>
  )
}

export const UserProductModal =(props) =>{
    return(
        <Modal
            isOpen={props.isOpen}
            toggle={() => props.click(" ","productModal")}
            centered
            >
            <ModalHeader toggle={() => props.click(" ","productModal")} style={{textAlign: 'center'}}>Product Details
            </ModalHeader>
                <ModalBody style={{ fontSize: '20', fontFamily: 'Vadana'}}>
                    {"Product Id: " +props.userProduct[0]}<br />
                    {"Product Category: " +props.userProduct[1]}<br />
                    {"Product Name: " +props.userProduct[2]}<br />
                    {"Product Search Code: " +props.userProduct[3]}<br />
                </ModalBody>
                <ModalFooter>
                    <Button color="green" onClick={() => props.click(" ","productModal")}>Close</Button>
                </ModalFooter>
        </Modal>
    )
}

export const EditProduct = (props) => {
    return(
        <Modal
            isOpen={props.isOpen}
            toggle={() => props.click(" ","productModal")}
            centered
            >
            <ModalHeader toggle={() => props.click(" ","productModal")} style={{textAlign: 'center'}}>
            </ModalHeader>
                    <ModalBody>
                    <Row>
                        <Col md="6">
                            <div className="green-text">
                            <Input
                            label="Product ID"
                            icon="user"
                            disabled
                            group
                            type="text"
                            validate
                            error="wrong"
                            success="right"
                            name = "productid"
                            // onChange={this.changeHandler}
                            value={props.product.productid}
                            />
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="green-text">
                            <Input
                            label="Product Search Code"
                            icon="user"
                            disabled
                            group
                            type="text"
                            validate
                            error="wrong"
                            success="right"
                            name = "productsearchcode"
                            // onChange={this.changeHandler}
                            value={props.product.productsearchcode}
                            />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <div className="green-text">
                            <Input
                            label="Product Name"
                            icon="user"
                            group
                            type="text"
                            validate
                            error="wrong"
                            success="right"
                            name = "productname"
                            onChange={props.changeHandler}
                            value={props.product.productname}
                            />
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="green-text"  style={{justifyContent: 'center', paddingTop: '0px'}} value={props.category} onChange={props.handleChange}>
                                <label>Category</label>
                                <select className="custom-select browser-default" >
                                <option name="select">Select Category</option>
                                <option name="Male">Food</option>
                                <option name="Female">Drug</option>
                                </select>
                            </div>
                        </Col>

                    </Row>
                </ModalBody>
                
                <ModalFooter>
                    <Button color="green" onClick={() => props.click(" ","productModal")}>Close</Button>
                </ModalFooter>
        </Modal>
    )
}

export const DeleteUserModal =(props) =>{
    return(
        <Modal
            isOpen={props.isOpen}
            toggle={() => props.click(" ", " ", "deleteUserModal")}
            centered
            >
            <ModalHeader toggle={() => props.click(" ", " ", "deleteUserModal")} style={{textAlign: 'center'}}>Product Details
            </ModalHeader>
            {props.deletedData ? 
                <ModalBody style={{ fontSize: '20', fontFamily: 'Vadana'}}>
                {props.deletedData}
                </ModalBody>:
                <ModalBody style={{ fontSize: '20', fontFamily: 'Vadana'}}>
                {props.deletedError}
                </ModalBody>
            }
                <ModalFooter>
                    <Button color="green" onClick={() => props.click(" ", " ", "deleteUserModal")}>Close</Button>
                </ModalFooter>
        </Modal>
    )
}

export const DeleteAdminModal = (props) => {
    return(
        <Modal
            isOpen={props.isOpen}
            toggle={() => props.click(" ", " ", "deleteAdminModal")}
            centered
            >
            <ModalHeader toggle={() => props.click(" ", " ", "deleteAdminModal")} style={{textAlign: 'center'}}>Product Details
            </ModalHeader>
            {props.deletedData ? 
                <ModalBody style={{ fontSize: '20', fontFamily: 'Vadana'}}>
                {props.deletedData}
                </ModalBody>:
                <ModalBody style={{ fontSize: '20', fontFamily: 'Vadana'}}>
                {props.deletedError}
                </ModalBody>
            }
                <ModalFooter>
                    <Button color="green" onClick={() => props.click(" ", " ", "deleteAdminModal")}>Close</Button>
                </ModalFooter>
        </Modal>
    )
}

export const AssignRoleModal = (props) => {
    return(
        <Modal
            isOpen={props.isOpen}
            toggle={() => props.click(" ", " ", "assignRoleModal")}
            centered
            >
            <ModalHeader toggle={() => props.click(" ", " ", "assignRoleModal")} style={{textAlign: 'center'}}>Added Role
            </ModalHeader>
            {props.userInfo ? 
                <ModalBody style={{ fontSize: '20', fontFamily: 'Vadana'}}>
                    <div>
                        <p>Role Id {" " +props.userInfo[0].roleid + "\n"}</p>
                        <p>Role Name { " " +props.userInfo[0].name + " "} Has been </p>
                        <p> </p>
                    </div>
                </ModalBody>:
                <ModalBody style={{ fontSize: '20', fontFamily: 'Vadana'}}>
                {props.deletedError}
                </ModalBody>
            }
                <ModalFooter>
                    <Button color="green" onClick={() => props.click(" ", " ", "assignRoleModal")}>Close</Button>
                </ModalFooter>
        </Modal>
    )
}

export const LoginErrorModal = (props) => {
    return(
        <Modal
            isOpen={props.isOpen}
            toggle={() => props.click("loginErrorModal")}
            centered
            >
            <ModalHeader toggle={() => props.click("loginErrorModal")} style={{textAlign: 'center'}}>Login Error
            </ModalHeader>
            {props.errorInfo ? 
                <ModalBody style={{ fontSize: '20', fontFamily: 'Vadana'}}>
                    <div>
                        <p>{" " +props.errorInfo + "\n"}</p>
                    </div>
                </ModalBody>:
                <ModalBody style={{ fontSize: '20', fontFamily: 'Vadana'}}>
                </ModalBody>
            }
                <ModalFooter>
                    <Button color="green" onClick={() => props.click("loginErrorModal")}>Close</Button>
                </ModalFooter>
        </Modal>
    )
}

export const AddProductModal = (props) => {
    return(
        <Modal
            isOpen={props.isOpen}
            toggle={() => props.click("AddProductModal")}
            centered
            >
            <ModalHeader toggle={() => props.click("AddProductModal")} style={{textAlign: 'center'}}>Added Product
            </ModalHeader>
            {props.addData ? 
                <ModalBody style={{ fontSize: '20', fontFamily: 'Vadana'}}>
                    <div>
                        <p>{"You have successflly added "+ props.addData.productname+ "\n"}</p>
                    </div>
                </ModalBody>:
                <ModalBody style={{ fontSize: '20', fontFamily: 'Vadana'}}>
                </ModalBody>
            }
                <ModalFooter>
                    <Button color="green" onClick={() => props.click("AddProductModal")}>Close</Button>
                </ModalFooter>
        </Modal>
    )
}

export const DeleteProductModal = (props) => {
    return(
        <Modal
            isOpen={props.isOpen}
            toggle={() => props.click("", "DeleteProductModal")}
            centered
            >
            <ModalHeader toggle={() => props.click("", "DeleteProductModal")} style={{textAlign: 'center'}}>Deleted Product
            </ModalHeader>
            {props.product ? 
                <ModalBody style={{ fontSize: '20', fontFamily: 'Vadana'}}>
                    <div>
                        <p>{"You have successflly Deleted a Product"+ "\n"}</p>
                    </div>
                </ModalBody>:
                <ModalBody style={{ fontSize: '20', fontFamily: 'Vadana'}}>
                </ModalBody>
            }
                <ModalFooter>
                    <Button color="green" onClick={() => props.click("", "DeleteProductModal")}>Close</Button>
                </ModalFooter>
        </Modal>
    )
}