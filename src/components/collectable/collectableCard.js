import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CollectableCard extends Component {
    render() {
        return (
            <div className="collectable-card">
                <Card>
                <CardImg top width="100%" src={this.props.currentCollectable.image} alt={this.props.currentCollectable.title} />
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