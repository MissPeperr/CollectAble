import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Alert } from 'reactstrap';

class CollectionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      title: this.props.currentCollection.title,
      description: this.props.currentCollection.description
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
      description: this.state.description
    }
    if (collection.title === null && collection.description === null) {
      this.setState({
        visible: true,
      })
    } else {
      this.props.toggle()
      console.log("currentCollection", this.props.currentCollection.id);
      this.props.editCollection("collections", this.props.currentCollection.id, collection)
      .then(() => {
        this.setState({
            title: this.props.currentCollection.title,
            description: this.props.currentCollection.description,
          })
      })
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
                defaultValue={this.props.currentCollection.title}
                type="text"
                onChange={this.handleFieldChange}
                placeholder="Title" />
              <Input id="description"
                className="form-control mb-2"
                defaultValue={this.props.currentCollection.description}
                type="textarea"
                name="text"
                onChange={this.handleFieldChange}
                placeholder="Description" />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.editCollection}>Save Changes</Button>{' '}
            <Button color="dark" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
    );
  }
}

export default CollectionEdit;