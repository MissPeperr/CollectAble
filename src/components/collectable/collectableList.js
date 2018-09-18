import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import DataManager from '../modules/DataManager';
import CollectableCard from './collectableCard';
import CollectableAdd from './collectableAdd'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import './collectable.css'
library.add(faRedo)

export default class CollectablePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            collection: {},
            collectables: [],
            isLoaded: false
        };
        
        this.toggle = this.toggle.bind(this);
    }
    collectionId = parseInt(this.props.match.params.collectionId, 0)

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    addCollectable = (string, collectable) => {
        DataManager.add(string, collectable)
            .then(() => DataManager.getCollectables("collectables", this.collectionId))
            .then(collectables => {
                this.setState({
                    collectables: collectables
                })
            })
        }

    componentDidMount() {
        DataManager.getCollectables("collectables", this.collectionId)
            .then((collectables) => {
                this.setState({
                    collectables: collectables,
                    isLoaded: true
                })
            })
    }


    render() {
        // need this here so when user refreshes, the information about the collection is still there
        const collection = this.props.collections.find(a => a.id === parseInt(this.props.match.params.collectionId, 0)) || {}
        return (
            <div className="collectable-list-container">
                <h4>{collection.title}</h4>
                {this.state.isLoaded ?
                    <div>
                        <Row>
                            <Col sm="6">
                                <Card className="add-collectable-card">
                                    <Button className="add-collectable-btn" onClick={this.toggle}>
                                        <CardTitle>+</CardTitle>
                                        <CardText>Create a new Collectable</CardText>
                                        <CollectableAdd
                                            modal={this.state.modal}
                                            toggle={this.toggle}
                                            collectionId={this.collectionId}
                                            addCollectableFunc={this.addCollectable}
                                            {...this.props} />
                                    </Button>
                                </Card>
                            </Col>
                        </Row>
                        <section className="collectable-card-container">
                            {
                                this.state.collectables.map(collectable =>
                                    <CollectableCard
                                        key={collectable.id}
                                        currentCollectable={collectable}
                                        collectables={this.state.collectables} {...this.props} />
                                )

                            }
                        </section>
                    </div>

                    : <FontAwesomeIcon icon="redo" className="fa-spin"/>}
            </div>
        )
    }
}
