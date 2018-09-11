import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from 'reactstrap';

class CollectionAdd extends Component {


  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>Make a new Collection</ModalHeader>
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
                required=""
                name="text"
                onChange={this.handleFieldChange}
                placeholder="Description" />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.toggle}>Create</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CollectionAdd;