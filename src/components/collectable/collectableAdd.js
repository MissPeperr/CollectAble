import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Alert } from 'reactstrap';

class CollectableAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            visible: false,
            file: null,
            title: null,
            description: null,
            image: null,
            boughtPrice: null,
            soldPrice: null,
            isSold: false
        };
        this.onDismiss = this.onDismiss.bind(this);
        this.handleChange = this.handleChange.bind(this)

    }
    //changes state whenever an input field has changed
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    createNewCollection = evt => {
        evt.preventDefault()
        const collection = {
            title: this.state.title,
            description: this.state.description,
            image: this.state.image,
            userId: this.props.user.id
        }
        if (collection.title === null) {
            this.setState({
                visible: true
            })
        } else {
            this.setState({
                modal: !this.state.modal,
                title: null,
                description: null,
                image: null
            })
            this.props.addCollection("collections", collection)
        }
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.toggle} className="add-collection-modal">
                    <ModalHeader toggle={this.props.toggle}>Create A New Collection!</ModalHeader>
                    <ModalBody className="collectable-modal-body">
                        {
                            this.state.visible &&
                            <Alert color="danger" onClick={this.onDismiss}>
                                You don't have a name for your Collectable!
                            </Alert>
                        }
                        <FormGroup>
                            <Label>Name of your Collectable:</Label>
                            <Input id="title"
                                className="form-control mb-2"
                                type="text"
                                onChange={this.handleFieldChange}
                                placeholder="Title" />
                            <Label for="description">A short description about your Collectable:</Label>
                            <Input id="description"
                                className="form-control mb-2"
                                type="textarea"
                                name="text"
                                onChange={this.handleFieldChange}
                                placeholder="Description" />
                            <Label for="image">Upload an image</Label>
                            <input type="file" onChange={this.handleChange} />
                            <img className="user-input-img" src={this.state.file} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.createNewCollection}>Create</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default CollectableAdd;