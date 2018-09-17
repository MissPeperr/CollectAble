import React from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const CollectionCard = ({ currentCollection }) => {
    // DON'T FORGET TO ADD A TRASH CAN FOR DELETE IN TOP RIGHT CORNER
    return (
        <div className="collection-card">
            <Card>

                {/* This button won't work with the history.push */}
                {/* <Button color="info" onClick={()=>{this.props.history.push(`/collection/${currentCollection.id}`)}}> */}

                        <CardBody >
                            <Link to={`/collection/${currentCollection.id}`} 
                                    className="collectable-list-link">
                                <CardTitle className="collection-title">
                                    {currentCollection.title}
                                </CardTitle>
                                <CardSubtitle className="collection-description">{currentCollection.description}
                                </CardSubtitle>
                            </Link>
                        </CardBody>
                    {/* </Button> */}
            </Card>

        </div>
    )

}

export default CollectionCard