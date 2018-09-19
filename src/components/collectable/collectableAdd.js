import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Alert } from 'reactstrap';

const uploadPreset = 'collectable';
const uploadURL = 'https://api.cloudinary.com/v1_1/midstone-collectable/image/upload';

class CollectableAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            visible: false,
            file: null,
            uploadURL: null,
            title: null,
            description: null,
            imageURL: '',
            boughtPrice: "$0.00",
            soldPrice: null,
            collectionId: this.props.collectionId,
            isSold: false
        };
        this.onDismiss = this.onDismiss.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    // this is the functionality for react-dropzone to upload images
    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });
        this.handleImageUpload(files[0]);
    }

    // changes state whenever an input field has changed
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // setting the state to the file the user uploaded
    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }

    // reactstrap alert functionality
    onDismiss() {
        this.setState({ visible: false });
    }

    // this uploads the image to cloudinary, and sends a URL to the image back in its place
    handleImageUpload(file) {
        let upload = request.post(uploadURL)
            .field('upload_preset', uploadPreset)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    imageURL: response.body.secure_url
                });
            }
        });
    }


    createNewCollectable = evt => {
        evt.preventDefault()
        const collectable = {
            title: this.state.title,
            description: this.state.description,
            imageURL: this.state.imageURL,
            boughtPrice: this.state.boughtPrice,
            soldPrice: null,
            isSold: false,
            collectionId: this.props.collectionId
        }
        if (collectable.title === null) {
            this.setState({
                visible: true
            })
        } else {
            this.setState({
                modal: !this.state.modal,
                title: null,
                description: null,
                imageURL: '',
                boughtPrice: "$0.00"
            })
            this.props.toggle();
            this.props.addCollectableFunc("collectables", collectable)
        }
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.toggle} className="add-collectable-modal">
                    <ModalHeader toggle={this.props.toggle}>Create A New Collectable!</ModalHeader>
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
                            <Label for="boughtPrice">If you would like to keep track of how much this collectable was purchased/sold for, input the purchased price here:</Label>
                            <Input id="boughtPrice"
                                className="form-control mb-2"
                                type="text"
                                onChange={this.handleFieldChange}
                                placeholder="$0.00" />
                            <div id="dropzone-div">
                                <Dropzone
                                    multiple={false}
                                    accept="image/*"
                                    onDrop={this.onImageDrop.bind(this)}>
                                    <p>Drop an image or click to select a file to upload.</p>
                                </Dropzone>
                                <div>
                                    <div className="FileUpload" style={{ width: "100%" }}>
                                        ...
                                    </div>

                                    <div>
                                        {this.state.imageURL === '' ? null :
                                            <div>
                                                <p>{this.state.title}</p>
                                                <img className="preview-img" alt={this.state.title} style={{ width: "100%" }} src={this.state.imageURL} />
                                            </div>}
                                    </div>
                                </div>
                            </div>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.createNewCollectable}>Create</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default CollectableAdd;