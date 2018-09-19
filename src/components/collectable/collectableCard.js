import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardImg, Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import DataManager from '../modules/DataManager';
import CollectableEdit from './collectableEdit';
import './collectable.css'
import 'bootstrap/dist/css/bootstrap.min.css';
library.add(faTrashAlt, faEdit)

export default class CollectableCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            deleteModal: false
        };

        this.toggle = this.toggle.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);

    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggleDelete = () => {
        this.setState({
            deleteModal: !this.state.deleteModal
        });
    }

    deleteCollectable = (string, id) => {
        this.toggleDelete();
        DataManager.delete(string, id)
            .then(this.props.updateState);
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


    render() {
        return (
            <Card className="collectable-card">
                    <CardImg className="user-input-img" top width="25%" src={this.props.currentCollectable.imageURL} alt={this.props.currentCollectable.title} />
                    <CardBody>
                        <CardTitle className="collectable-title">
                            {this.props.currentCollectable.title}
                        </CardTitle>
                        <CardSubtitle className="collectable-description">{this.props.currentCollectable.description}
                        </CardSubtitle>
                        <br></br>
                        <CardSubtitle>{this.props.currentCollectable.boughtPrice}</CardSubtitle>
                    </CardBody>
                    <hr></hr>
                    <div className="collectable-footer">
                        <Button id="edit-collectable-btn" onClick={this.toggle}><FontAwesomeIcon icon="edit" /></Button>
                        <CollectableEdit
                            collectionId={this.collectionId}
                            currentCollectable={this.props.currentCollectable}
                            editCollectable={this.props.editCollectable}
                            toggle={this.toggle}
                            modal={this.state.modal} />
                            <Button color="success" onClick={this.userSoldItem}>I Sold This!</Button>
                        <Button id="delete-collectable-btn" onClick={() => {
                            this.toggleDelete();
                        }}>
                            <FontAwesomeIcon icon="trash-alt" />
                        </Button>
                    </div>

                <Modal isOpen={this.state.deleteModal} toggle={this.toggleDelete} className="delete-modal">
                    <ModalBody>
                        Are you sure you want to delete this Collectable?
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => { this.deleteCollectable("collectables", this.props.currentCollectable.id)}}>Yes</Button>
                        <Button onClick={this.toggleDelete}>No</Button>
                    </ModalFooter>
                </Modal>

            </Card>
        )
    }
}