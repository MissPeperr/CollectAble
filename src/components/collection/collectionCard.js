import React, { Component } from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

class CollectionCard extends Component {

    render() {
        console.log(this.props.currentCollection.id)
        console.log("card",this.props.currentCollection.title)
        return(
            <div className="collection-card">
                        <Card>
                            <Button color="info">
                                <CardBody>
                                <CardTitle className="collection-title">{this.props.currentCollection.title}</CardTitle>
                                <CardSubtitle className="collection-description">{this.props.currentCollection.description}</CardSubtitle>
                                </CardBody>
                            </Button>
                        </Card>
            </div>
        )
    }
}

export default CollectionCard