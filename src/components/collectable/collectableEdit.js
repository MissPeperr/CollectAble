import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Alert } from 'reactstrap';
import DataManager from '../modules/DataManager';

class CollectableEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            title: this.props.currentCollectable.title,
            description: this.props.currentCollectable.description,
            //imageURL :this.props.currentCollectable.imageURL
            boughtPrice: this.props.currentCollectable.boughtPrice,
            soldPrice: this.props.currentCollectable.soldPrice,
            isSold: this.props.currentCollectable.isSold
        };
        this.onDismiss = this.onDismiss.bind(this);

    }
    //changes state whenever an input field has changed
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    onDismiss() {
        this.setState({ visible: false });
    }
    
    ifSold = () => {
        if(this.state.isSold === true){
            alert("This collectable was sold! This collectable has been taken out of your current collection, but can still be seen inside of your archives! If you didn't mean to sell this, click the \"I Sold This\" button again before saving.")              
        } else if(this.state.isSold === false){
            alert("Collectable has been put back in your current collection!")
        } else {
            alert("There was an error selling your collectable.")
        }
    }

    userSoldItem = () => {
        this.setState({
            isSold: !this.state.isSold
        })
        window.setTimeout(this.ifSold, 1000)
    }

    editCollectableFunc = () => {
        const collectable = {
            title: this.state.title,
            description: this.state.description,
            // imageURL: this.state.imageURL,
            boughtPrice: this.state.boughtPrice,
            soldPrice: this.state.soldPrice,
            isSold: this.state.isSold,
        }
        if (collectable.title === null && collectable.description === null) {
            this.setState({
                visible: true,
            })
        } else {
            console.log("currentCollectable", this.props.currentCollectable.id);
            this.props.editCollectable("collectables", this.props.currentCollectable.id, collectable)
            this.props.toggle()
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className="add-collection-modal">
                <ModalHeader toggle={this.props.toggle}>Edit Collection</ModalHeader>
                <ModalBody>
                    {
                        this.state.visible &&
                        <Alert color="danger" onClick={this.onDismiss}>
                            You don't have a name for your Collection! If you'd like to delete this collection, please click on the trashcan icon on the previous page.
              </Alert>
                    }
                    <FormGroup>
                        <Input id="title"
                            className="form-control mb-2"
                            defaultValue={this.state.title}
                            type="text"
                            onChange={this.handleFieldChange}
                            placeholder="Title" />
                        <Input id="description"
                            className="form-control mb-2"
                            defaultValue={this.state.description}
                            type="textarea"
                            name="text"
                            onChange={this.handleFieldChange}
                            placeholder="Description" />
                            <Input id="boughtPrice"
                            className="form-control mb-2"
                            defaultValue={this.state.boughtPrice}
                            type="textarea"
                            name="text"
                            onChange={this.handleFieldChange}
                            placeholder="$0.00" />
                            <Button color="success" onClick={this.userSoldItem}>I Sold This!</Button>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={this.editCollectableFunc}>Save Changes</Button>{' '}
                    <Button color="dark" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default CollectableEdit;