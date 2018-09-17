import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Alert } from 'reactstrap';

class CollectionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      title: null,
      description: null
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

  editCollection = () => {
    const collection = {
      title: this.state.title,
      description: this.state.description,
      userId: this.props.user.id
    }
    if (collection.title === null) {
      this.setState({
        visible: true,
      })
    } else {
      this.props.toggle()
      this.setState({
        title: null,
        description: null,
      })
      this.props.editCollection("collections", collection)
    }
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className="add-collection-modal">
          <ModalHeader toggle={this.props.toggle}>Create A New Collection!</ModalHeader>
          <ModalBody>
            {
              this.state.visible &&
              <Alert color="danger" onClick={this.onDismiss}>
                You don't have a name for your Collection!
              </Alert>
            }
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
            <Button color="primary" onClick={this.editCollection}>Create</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CollectionEdit;