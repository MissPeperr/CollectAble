import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import CollectionCard from './collectionCard'
import CollectionAdd from './collectionAdd'
import 'bootstrap/dist/css/bootstrap.min.css';
import './collection.css'

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

    render(){
        console.log(this.props.collections)
        return (
            <div className="collection-list-container">
                <h3>Collection List</h3>
                    <Row>
                        <Col sm="6">
                            <Card className="add-collection-card">
                            <Button className="add-collection-btn" onClick={this.toggle}>
                                <CardTitle>+</CardTitle>
                                <CardText>Create a new Collection</CardText>
                                <CollectionAdd modal={this.state.modal} toggle={this.toggle}/>
                            </Button>
                            </Card>
                        </Col>
                    </Row>
                    <section className="collection-card-container">
                    {
                        this.props.collections.map(collection =>
                            <CollectionCard key={collection.id} currentCollection={collection} {...this.props}/>
                        )

                    }
                    </section>

            </div>
        )
    }
}

export default CollectionList;