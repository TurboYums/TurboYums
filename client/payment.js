import React, { Component } from 'react';
import { View, Button } from 'react-native';
import stripe from 'tipsi-stripe';

stripe.setOptions({
  publishableKey: 'YOUR_STRIPE_PUBLIC_KEY',
});

export default class Payment extends Component {
  requestPayment = () => {
    return stripe
      .paymentRequestWithCardForm()
      .then(stripeTokenInfo => {
        console.warn('Token created', { stripeTokenInfo });
      })
      .catch(error => {
        console.warn('Payment failed', { error });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Make a payment"
          onPress={this.requestPayment}
          disabled={this.state.isPaymentPending}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};