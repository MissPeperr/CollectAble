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
            modal: false,
            collection: {}
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    // checkout react-router-dom about using URL param to make sure it's not delaying when loading
    componentDidMount(){
        const collection = this.props.collections.find(a => a.id === parseInt(this.props.match.params.collectionId, 0)) || {}
        this.setState({
            collection: {...collection}
        }, () => {
            this.props.getCollectables("collectables", collection.id)
            console.log("collection id:", this.state.collection)
        })
    }
    
    render(){
        // need this here so when user refreshes, the information about the collection is still there
        // const collection = this.props.collections.find(a => a.id === parseInt(this.props.match.params.collectionId, 0)) || {}
        console.log("collectable list render")
        return (
            <div className="collectable-list-container">
                <h4>{this.state.collection.title}</h4>
                <Row>
                    <Col sm="6">
                        <Card className="add-collectable-card">
                            <Button className="add-collectable-btn" onClick={this.toggle}>
                                <CardTitle>+</CardTitle>
                                <CardText>Create a new Collectable</CardText>
                                <CollectableAdd
                                    modal={this.state.modal}
                                    toggle={this.toggle}
                                    collection={this.state.collection.id}
                                     {...this.props} />
                                     {/* addCollectable={this.props.addCollectable} */}
                            </Button>
                        </Card>
                    </Col>
                </Row>
                <section className="collectable-card-container">
                    {
                        this.props.collectables.map(collectable =>
                            <CollectableCard
                                key={collectable.id}
                                currentCollectable={collectable}
                                collectables={this.props.collectables} {...this.props} />
                        )

                    }
                </section>

            </div>
        )
    }
}
