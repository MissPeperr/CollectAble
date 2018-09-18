import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import CollectionEdit from './collectionEdit';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons'
library.add(faTrashAlt, faEdit)

class CollectionCard extends Component {
    // DON'T FORGET TO ADD A TRASH CAN FOR DELETE IN TOP RIGHT CORNER
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);

    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
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
                        <Button id="edit-collection-btn" onClick={this.toggle}>Edit <FontAwesomeIcon icon="edit" /></Button>
                            <CollectionEdit key={this.props.currentCollection.id}
                                toggle={this.toggle}
                                modal={this.state.modal}
                                currentCollection={this.props.currentCollection.id}
                                {...this.props} />
                        <Button id="delete-collection-btn"><FontAwesomeIcon icon="trash-alt" /></Button>
                        </div>
                </Card>

            </div>
        )

    }
}

export default CollectionCard