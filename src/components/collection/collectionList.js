import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import './collection.css'

class CollectionList extends Component {
    
    render(){
        return (
            <div className="collection-list-container">
                <h3>Collection List</h3>
                    <Row>
                        <Col sm="6">
                            <Card className="add-collection-card">
                            <Button className="add-collection-btn">
                                <CardTitle>+</CardTitle>
                                <CardText>Create a new Collection</CardText>
                            </Button>
                            </Card>
                        </Col>
                    </Row>
            </div>
        )
    }
}

export default CollectionList;