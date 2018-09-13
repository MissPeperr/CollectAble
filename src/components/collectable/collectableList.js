import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import CollectableCard from './collectableCard';
import CollectableAdd from './collectableAdd'
import 'bootstrap/dist/css/bootstrap.min.css';
import './collectable.css'

export default class CollectablePage extends Component {
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


    render(){
        const collection = this.props.collections.find(a => a.id === parseInt(this.props.match.params.collectionId, 0)) || {}

        return (
            <div className="collectable-list-container">
            <h4>{collection.title}</h4>
                    <Row>
                        <Col sm="6">
                            <Card className="add-collectable-card">
                            <Button className="add-collectable-btn" onClick={this.toggle}>
                                <CardTitle>+</CardTitle>
                                <CardText>Create a new Collectable</CardText>
                                <CollectableAdd modal={this.state.modal} toggle={this.toggle} addCollectable={this.props.addCollectable} {...this.props}/>
                            </Button>
                            </Card>
                        </Col>
                    </Row>
                    <section className="collectable-card-container">
                    {
                        this.props.collectables.map(collectable =>
                            <CollectableCard key={collectable.id} currentCollectable={collectable} collections={this.props.collections} collectables={this.props.collectables} {...this.props}/>
                        )
                        
                    }
                    </section>

            </div>
        )
    }
}
