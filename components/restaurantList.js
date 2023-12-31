import { gql, useQuery } from '@apollo/client';
import Dishes from "./dishes"
import { useContext, useState } from 'react';


import AppContext from "./context"
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";

function RestaurantList(props) {
  const [restaurantID, setRestaurantID] = useState(0)
  const { cart } = useContext(AppContext);
  const [state, setState] = useState(cart)
  const GET_RESTAURANTS = gql`
  query {
    restaurants {
      data {
        id
        attributes {
          name
          description
          Image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

  const { loading, error, data } = useQuery(GET_RESTAURANTS)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  console.log(`Query Data: ${data.restaurants}`)


  let searchQuery = data.restaurants.data.filter((res) => {
    console.log(res);
    return res.attributes.name.toLowerCase().includes(props.search)
  }) || [];
  
  let restId = searchQuery[0] ? searchQuery[0].id : null;

  // definet renderer for Dishes
  const renderDishes = (restaurantID) => {
    return (<Dishes restId={restaurantID}> </Dishes>)
  };
  if (searchQuery.length > 0) {
  
    const restList = searchQuery.map((res) => (
      <Col xs="6" sm="4" key={res.id}>
        <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
          <CardImg
            top={true}
            style={{ height: 200 }}
            src={
              res.attributes.Image.data.attributes.url
            }
          />
          <CardBody>
            <CardText>{res.attributes.description}</CardText>
          </CardBody>
          <div className="card-footer">

            <Button color="info" onClick={() => setRestaurantID(res.id)}>{res.attributes.name}</Button>

          </div>
        </Card>
      </Col>
    ))
    

    return (

      <Container>
        <Row xs='3'>
          {restList}
        </Row>

        <Row xs='3'>
          {renderDishes(restaurantID)}
        </Row>

      </Container>

    )
  } else {
    return <h1> No Restaurants Found</h1>
  }
}
export default RestaurantList