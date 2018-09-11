import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Alert } from 'reactstrap';

class CollectionAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      title: undefined,
      description: undefined
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
  
  createNewCollection = evt => {
    evt.preventDefault()
    const collection = {
      title: this.state.title,
      description: this.state.description,
      // userId: this.props.user.id
    }
    if (collection.title === undefined){
      return (
        <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
          I am an alert and I can be dismissed!
        </Alert>
        )     
      } else {
      this.setState({
        title: undefined,
        description: undefined,
      })
      this.props.addCollection("collections", collection)
    }
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.toggle} className="add-collection-modal">
          <ModalHeader toggle={this.props.toggle}>Create A New Collection!</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Name of your Collection:</Label>
              <Input id="title"
                className="form-control mb-2"
                type="text"
                onChange={this.handleFieldChange}
                placeholder="Title" />
              <Label for="description">A short description about your Collection:</Label>
              <Input id="description"
                className="form-control mb-2"
                type="textarea"
                name="text"
                onChange={this.handleFieldChange}
                placeholder="Description" />
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

export default CollectionAdd;