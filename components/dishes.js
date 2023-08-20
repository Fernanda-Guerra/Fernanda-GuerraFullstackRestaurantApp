import {useRouter} from "next/router"
import {gql,useQuery} from '@apollo/client';
import {useState, useContext} from 'react'
import AppContext from "./context"
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col} from "reactstrap";
function Dishes({restId}){
  const [restaurantID, setRestaurantID] = useState()
  const {addItem} = useContext(AppContext)

const GET_RESTAURANT_DISHES = gql`
query ($id: ID!) {
  restaurant(id: $id) {
    data {
      id
      attributes {
        name
        dishes {
          data {
            id
            attributes {
              name
              description
              price
              image {
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
    }
  }
}
`;

  const router = useRouter();

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: restId},
    fetchPolicy: "no-cache" 
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR here</p>;
  if (!data) return <p>Not found</p>;

  

  if (restId > 0){
    let dishes = data.restaurant.data.attributes.dishes.data.map((dish) => {
      const flatDish = new Object();
        flatDish.id = dish.id
        flatDish.name = dish.attributes.name
        flatDish.description = dish.attributes.description
        flatDish.price = dish.attributes.price
      const image = new Object()
      image.url = dish.attributes.image.data.attributes.url
        flatDish.image = image
        return flatDish
  });
    console.log("restaurants: " + JSON.stringify(dishes[0]))
  
    
    return (
      <>
          {dishes.map((dish) => (
            <Col xs="6" sm="4" style={{ padding: 0 }} key={dish.id}>
              <Card style={{ margin: "0 10px" }}>
                <CardImg
                  top={true}
                  style={{ height: 150, width:150 }}
                  src={dish.image.url }
                />
                <CardBody>
                  
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Button colors="info"
                    outline
                    color="primary"
                    onClick = {()=> addItem(dish)}
                  >
                    + Add To Cart
                  </Button>
                  
                </div>
              </Card>
            </Col>
          ))}
        </>
        )}
        else{
          return <h1> No Dishes</h1>
        }
    }
    export default Dishes