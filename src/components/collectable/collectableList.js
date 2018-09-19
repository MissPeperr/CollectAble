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
    }
    collectionId = parseInt(this.props.match.params.collectionId, 0)

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            title: null,
            description: null,
            imageURL: null,
            boughtPrice: null
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
