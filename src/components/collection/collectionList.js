import React, { Component } from 'react';
import { Button, CardTitle, CardText} from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import CollectionCard from './collectionCard'
import CollectionAdd from './collectionAdd'
import 'bootstrap/dist/css/bootstrap.min.css';
import './collection.css'
library.add(faPlus)





class CollectionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);

    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }




    render() {
        return (
            <div className="collection-list-container">
                            <Button className="add-collection-btn" onClick={this.toggle}>
                                <CardTitle className="plus-btn"><FontAwesomeIcon icon="plus" /></CardTitle>
                                <CardText>Create a new Collection</CardText>
                                <CollectionAdd
                                    modal={this.state.modal}
                                    toggle={this.toggle}
                                    user={this.props.user}
                                    addCollection={this.props.addCollection} {...this.props} />
                            </Button>
                    {
                        this.props.collections.map(collection =>
                            <CollectionCard
                                key={collection.id}
                                currentCollection={collection}
                                getCollections={this.props.getCollections}
                                editCollection={this.props.editCollection}
                                collections={this.props.collections}
                                collectables={this.props.collectables}
                                {...this.props} />
                        )

                    }

            </div>
        )
    }
}

export default CollectionList;