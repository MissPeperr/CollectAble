import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import DataManager from '../modules/DataManager';
import CollectableCard from './collectableCard';
import CollectableAdd from './collectableAdd'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo, faPlus } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import './collectable.css'
library.add(faRedo, faPlus)

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
        this.updateState = this.updateState.bind(this);
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

    editCollectable = (string, id, collectable) => {
        DataManager.edit(string, id, collectable)
        .then(() => DataManager.getCollectables("collectables", this.collectionId))
        .then(collectables => {
            this.setState({
                collectables: collectables
            })
        })
    }

    showArchive = () => {
        // this function should be called when the user clicks on teh "See Archive List" button
        // this function will call ALL the collectables instead of just the ones that have the 'isSold = false'
        // maybe this should be on the previous page?
    }
    
    updateState() {
        DataManager.getCollectables("collectables", this.collectionId)
        .then((collectables) => {
            console.log("collectables", collectables)
            this.setState({
                collectables: collectables,
                isLoaded: true
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
        // need this here so when user refreshes, the information about the collection is still there 👍
        const collection = this.props.collections.find(a => a.id === parseInt(this.props.match.params.collectionId, 0)) || {}
        return (
            <div>
                <h4>{collection.title}</h4>
                <div><Button>See Archived Collectables</Button></div>
                {this.state.isLoaded ?
                    <div className="collectable-list-container">
                        <Button className="add-collectable-btn" onClick={this.toggle}>
                            <CardTitle className="plus-btn"><FontAwesomeIcon icon="plus" /></CardTitle>
                            <CardText>Create a new Collectable</CardText>
                            <CollectableAdd
                                modal={this.state.modal}
                                toggle={this.toggle}
                                collectionId={this.collectionId}
                                addCollectableFunc={this.addCollectable}
                                {...this.props} />
                        </Button>
                        {
                            this.state.collectables.map(collectable =>
                                <CollectableCard
                                    key={collectable.id}
                                    currentCollectable={collectable}
                                    updateState={this.updateState}
                                    editCollectable={this.editCollectable}
                                    collectables={this.state.collectables} {...this.props} />
                            )

                        }
                    </div>

                    : <FontAwesomeIcon icon="redo" className="fa-spin" />}
            </div>
        )
    }
}
