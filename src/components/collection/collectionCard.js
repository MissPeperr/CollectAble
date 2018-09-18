import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import CollectionEdit from './collectionEdit';
import DataManager from '../modules/DataManager';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
library.add(faTrashAlt, faEdit)

class CollectionCard extends Component {
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
            deleteModal: !this.state.modal
        });
    }


    deleteCollection = (string, id) => {
        this.toggleDelete();
        DataManager.delete(string, id)
            .then(this.props.getCollections);
    }

    render() {
        return (
            <div className="collection-card">
                <Card>
                    <CardBody>
                        <Link to={`/collection/${this.props.currentCollection.id}`}
                            className="collectable-list-link">
                            <CardTitle className="collection-title">
                                {this.props.currentCollection.title}
                            </CardTitle>
                        </Link>
                        <CardSubtitle className="collection-description">{this.props.currentCollection.description}
                        </CardSubtitle>
                    </CardBody>
                    <div className="collection-footer">
                        <Button id="edit-collection-btn" onClick={this.toggle}><FontAwesomeIcon icon="edit" /></Button>
                        <CollectionEdit key={this.props.currentCollection.id}
                            toggle={this.toggle}
                            modal={this.state.modal}
                            currentCollection={this.props.currentCollection.id}
                            {...this.props} />
                        <Button id="delete-collection-btn" onClick={() => {
                            this.toggleDelete();
                        }}>
                            <FontAwesomeIcon icon="trash-alt" />
                        </Button>
                    </div>
                </Card>

                <Modal isOpen={this.state.deleteModal} toggle={this.toggleDelete} className="delete-modal">
                    <ModalBody>
                        All of the Collectables inside of this Collection will be lost. <br />
                        Are you sure you want to delete this Collection?
                    </ModalBody>
                    <ModalFooter>
                    <Button onClick={() => { this.deleteCollection("collections", this.props.currentCollection.id) }}>Yes</Button>
                    <Button onClick={this.toggleDelete}>No</Button>
                    </ModalFooter>
                </Modal>

            </div>
        )

    }
}

export default CollectionCard