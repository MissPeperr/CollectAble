import React, { Component } from 'react';
import CollectionList from '../collection/collectionList'


class HomePage extends Component {
    render() {
        return (
            <div>
                <h5>CollectAble</h5>
                <CollectionList />
            </div>
        )
    }
}

export default HomePage