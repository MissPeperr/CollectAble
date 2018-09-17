import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardHeader, CardFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import CollectionEdit from './collectionEdit';

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
                    <CardFooter>
                        <Button onClick={this.toggle}>Edit</Button>
                        <div>
                            <CollectionEdit key={this.props.currentCollection.id}
                                toggle={this.toggle}
                                modal={this.state.modal}
                                currentCollection={this.props.currentCollection.id}
                                {...this.props} />
                        </div>
                    </CardFooter>
                </Card>

            </div>
        )

    }
}

export default CollectionCard