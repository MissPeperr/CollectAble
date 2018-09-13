import React from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const CollectionCard = ({ match, currentCollection}) => {
    // this is creating a page name to show only that collection

    // DON'T FORGET TO ADD A TRASH CAN FOR DELETE IN TOP RIGHT CORNER
    // const collectionPageName = currentCollection.title.split(" ").join("")
    // console.log(match)
    // onClick={()=>{this.props.history.push(`/collection/DisneyPins`)}}
    return (
        <div className="collection-card">
            <Card >
                <Button color="info" >
                        <CardBody >
                            <Link to={`/homepage/collection/${currentCollection.id}`} className="collectable-list-link">
                                <CardTitle className="collection-title">
                                    {currentCollection.title}
                                </CardTitle>
                                <CardSubtitle className="collection-description">{currentCollection.description}
                                </CardSubtitle>
                            </Link>
                        </CardBody>
                    </Button>
            </Card>

        </div>
    )

}

export default CollectionCard