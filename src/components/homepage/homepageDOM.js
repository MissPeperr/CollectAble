import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import DataManager from '../modules/DataManager';
import NavBar from '../navbar/navbar';
// import Register from '../login/registerDOM';
import CollectionList from '../collection/collectionList';
import CollectablePage from '../collectable/collectableList';

class HomePage extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    state = {
        user: {},
        collections: [],
        collectables: [],
        groups: []
    }
    // }

    // gonna have to write something for local/session storage
    componentDidMount() {
        let newState = {};
        let localUser = JSON.parse(localStorage.getItem("user"));
        newState.user = localUser;
        DataManager.getUserData("collections", localUser.id)
        .then((collections) => { newState.collections = collections })
        .then(() => DataManager.getUserData("collectables", localUser.id))
        .then((collectables) => { newState.collectables = collectables })
        .then(() => DataManager.getAll("users"))
        .then(users => {newState.allUsers = users})
        .then(() => {
            this.setState(newState)
        });
        console.log("mounted", newState.user)
    }

    addCollection = (string, collection) => {
        DataManager.add(string, collection)
            .then(() => DataManager.getUserData("collections", this.state.user.id))
            .then(collections =>
                this.setState({
                    collections: collections
                }))
    }

    render() {
        console.log("render homepage")

        return (
            <React.Fragment>
                <NavBar />
                    <Route exact path="/homepage" render={(props) => {
                        return <CollectionList {...props}
                            user={this.state.user}
                            collections={this.state.collections}
                            addCollection={this.addCollection}
                            collectables={this.state.collectables} />
                    }} />
                    <Route exact path="/homepage/collection/:collectionId(\d+)" render={(props) => {
                        return <CollectablePage {...props}
                            collectables={this.state.collectables}
                            collections={this.state.collections} />
                    }} />
                    {/* <Route exact path="/login/register" render={(props) => {
                        return <Register {...props} />
                    }} /> */}
            </React.Fragment>
        )
    }
}


export default HomePage