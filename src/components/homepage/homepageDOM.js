import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import DataManager from '../modules/DataManager';
import Register from '../login/registerDOM';
import CollectionList from '../collection/collectionList';
import CollectablePage from '../collectable/collectableList';

class HomePage extends Component {
    state = {
        user: {},
        collections: [],
        collectables: [],
        groups: []
    }

    // gonna have to write something for local/session storage
    componentDidMount() {
        let newState = {};
        let localUser = JSON.parse(localStorage.getItem("user"));
        newState.user = localUser;
        DataManager.getUserData("collections", localUser.id)
            .then((collections) => { newState.collections = collections })
            // .then(() => DataManager.getAll("collectables"))
            // .then((collectables) => { newState.collectables = collectables })
            .then(() => DataManager.getAll("users"))
            .then(users => { newState.allUsers = users })
            .then(() => {
                this.setState(newState)
            });
        console.log("mounted", newState.user)
    }
    
    getCollectables = (string, collectionId) => {
        let newState = {};
        DataManager.getCollectables(string, collectionId)
            .then((collectables) => {newState.collectables = collectables})
            .then(() => {
                this.setState(newState)
            })
    }

    addCollection = (string, collection) => {
        DataManager.add(string, collection)
            .then(() => DataManager.getUserData("collections", this.state.user.id))
            .then(collections =>
                this.setState({
                    collections: collections
                }))
    }

    // the getCollectables function needs to get the CURRENT collection id
    // right now it's just going to the state and grabbing all of them
    addCollectable = (string, collectable) => {
        DataManager.add(string, collectable)
            .then(() => this.props.getCollectables("collectables", this.props.collection))
            .then(collectables => {
                this.setState({
                    collectables: collectables
                })
            })
    }


    render() {
        console.log("render homepage")

        return (
                <React.Fragment>
                        <Route exact path="/collectionlist" render={(props) => {
                            return <CollectionList {...props}
                                user={this.state.user}
                                collections={this.state.collections}
                                collectables={this.state.collectables} 
                                addCollection={this.addCollection}
                                getCollectables={this.getCollectables}
                                />
                        }} />
                        <Route exact path="/collection/:collectionId(\d+)" render={(props) => {
                            return <CollectablePage {...props}
                                collectables={this.state.collectables}
                                collections={this.state.collections}
                                addCollectable={this.addCollectable}
                                getCollectables={this.getCollectables} />
                        }} />
                        <Route exact path="/register" render={(props) => {
                        return <Register {...props} />
                    }} />
                </React.Fragment>
        )
    }
}


export default HomePage