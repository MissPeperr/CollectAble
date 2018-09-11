import React, { Component } from 'react';
import DataManager from '../modules/DataManager'
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
    render() {
        return (
            <div>
                <h5>CollectAble</h5>
                <CollectionList collections={this.state.collections}/>
            </div>
        )
    }
}

export default HomePage