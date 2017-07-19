import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

class Checkout extends Component {
  constructor(){
    super()
    this.state = {
    }

    // this.onMarkerClick = this.onMarkerClick.bind(this);
  }




  render(){

    const CURRENCY = 'USD';

    const fromEuroToCent = amount => amount * 100;

    const successPayment = data => {
      this.props.backToMainScreen();
    };

    const errorPayment = data => {
      console.log(data)
      alert('Payment Error');
    };
    const onToken = (amount, description) => token =>
      axios.post('/checkout',
        {
          description,
          source: token.id,
          currency: CURRENCY,
          amount: fromEuroToCent(amount)
        })
        .then(successPayment)
        .catch(errorPayment);


    return (
      <StripeCheckout
        name={this.props.name}
        description={this.props.description}
        amount={fromEuroToCent(this.props.amount)}
        token={onToken(this.props.amount, this.props.description)}
        currency={CURRENCY}
        stripeKey={'pk_test_isqamEERLx0pQJVekIgO9Njy'}
        shippingAddress={true}
        billingAddress={true}
      >
    </StripeCheckout>
    )
  }
}


export default Checkout;
