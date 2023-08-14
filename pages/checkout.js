/* pages/checkout.js */

import React, { useContext } from "react";
import { Row, Col } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/checkoutForm";
import AppContext from "../components/context";
import Cart from "../components/cart";
import {useState} from 'react';

function Checkout() {
  // get app context
  const {isAuthenticated} = useContext(AppContext);
  // isAuthenticated is passed to the cart component to display order button
  //const isAuthenticated  = true;
  
  // load stripe to inject into elements components
  /*const stripePromise = loadStripe(
    "pk_test_51NNcLkGDgtrTSdbUX8Z5CC3TwaUnJ2aC5ywe8pAtAwNryynwfD7lMUFgeMGyPTnWnuxFrbIoyfM2bhxZcIqJ8oNe00PS8pe5eh"
  );*/
  const [stripePromise, setStripePromise] = useState(() => 
    loadStripe("pk_test_51NNcLkGDgtrTSdbUX8Z5CC3TwaUnJ2aC5ywe8pAtAwNryynwfD7lMUFgeMGyPTnWnuxFrbIoyfM2bhxZcIqJ8oNe00PS8pe5eh"
    ));

  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
        <h1 style={{ margin: 20 }}>Checkout</h1>
        <Cart isAuthenticated={isAuthenticated} />
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Col>
    </Row>
  );
  // }
}
export default Checkout;
