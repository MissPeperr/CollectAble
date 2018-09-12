import React, { Component } from 'react';
import DataManager from '../modules/DataManager'
import NavBar from '../navbar/navbar'
import CollectionList from '../collection/collectionList'


class HomePage extends Component {
    state = {
        users: [],
        collections: [],
        collectables: [],
        groups: []
    }

    // gonna have to write an if/else for local/session storage
    componentDidMount(){
        let newState = {};
        let localUser = JSON.parse(localStorage.getItem("credentials"));
        newState.user = localUser;
        DataManager.getAll("collections")
        .then((collections) => {newState.collections = collections})
        .then(() => {
            this.setState(newState)
        });
    }

    addCollection = (string, collection) => {
        DataManager.add(string, collection)
        .then(() => DataManager.getAll("collections"))
        .then(collections => 
            this.setState({
                collections: collections
        }))
    }

    render() {
        return (
            <div>
                <NavBar />
                <CollectionList collections={this.state.collections} addCollection={this.addCollection}/>
            </div>
        )
    }
}


export default HomePage