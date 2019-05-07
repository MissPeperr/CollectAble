import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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

    getCollectionsById = () => {
        let newState = {};
        if (localStorage.getItem("user")) {
            let localUser = JSON.parse(localStorage.getItem("user"));
            newState.user = localUser;
            DataManager.getUserData("collections", localUser.id)
                .then((collections) => { newState.collections = collections })
                .then(() => DataManager.getAll("users"))
                .then(users => { newState.allUsers = users })
                .then(() => {
                    this.setState(newState)
                });
        } else if(sessionStorage.getItem("user")){
            let sessionUser = JSON.parse(sessionStorage.getItem("user"));
            newState.user = sessionUser;
            DataManager.getUserData("collections", sessionUser.id)
                .then((collections) => { newState.collections = collections })
                .then(() => DataManager.getAll("users"))
                .then(users => { newState.allUsers = users })
                .then(() => {
                    this.setState(newState)
                });
        } else {
            alert("There was an issue with getting the user");
        }
    }

    componentDidMount() {
        this.getCollectionsById();
    }


    addCollection = (string, collection) => {
        DataManager.add(string, collection)
            .then(() => DataManager.getUserData("collections", this.state.user.id))
            .then(collections =>
                this.setState({
                    collections: collections
                }))
    }
    editCollection = (string, id, collection) => {
        DataManager.edit(string, id, collection)
        .then(() => DataManager.getUserData("collections", this.state.user.id))
        .then((collections) => {
            this.setState({
                collections: collections
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <div id="home-container">

                    </div>

                }
                }/>
                <Route exact path="/collectionlist" render={(props) => {
                    return <CollectionList {...props}
                        user={this.state.user}
                        collections={this.state.collections}
                        collectables={this.state.collectables}
                        getCollections={this.getCollectionsById}
                        editCollection={this.editCollection}
                        addCollection={this.addCollection}
                        getCollectables={this.getCollectables}
                    />
                }} />
                <Route exact path="/collection/:collectionId(\d+)" render={(props) => {
                    return <CollectablePage {...props}
                        collectables={this.state.collectables}
                        collections={this.state.collections}
                        addCollectable={this.addCollectable}
                        />
                }} />
                <Route exact path="/register" render={(props) => {
                    return <Register {...props} />
                }} />
            </React.Fragment>
        )
    }
}

export default HomePage;