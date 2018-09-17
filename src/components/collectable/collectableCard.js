import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap';
import './collectable.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CollectableCard extends Component {
    render() {
        // const collection = this.props.collections.find(a => a.id === parseInt(this.props.match.params.collectionId, 0)) || {}

        // need to make it return only the collectables that share the collectionId of the current 'match.params'
        return (
            <div className="collectable-card">
                <Card>
                <CardImg className="user-input-img" top width="25%" src={this.props.currentCollectable.imageURL} alt={this.props.currentCollectable.title} />
                    <CardBody>
                        <CardTitle className="collectable-title">
                            {this.props.currentCollectable.title}
                        </CardTitle>
                        <CardSubtitle className="collectable-description">{this.props.currentCollectable.description}
                        </CardSubtitle>
                    </CardBody>
                </Card>

            </div>
        )
    }
}