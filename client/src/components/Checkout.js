import React from "react";
import { injectStripe } from "react-stripe-elements";

class Checkout extends React.Component {

    render() {
        return (
            <div>
                <button>Submit Order</button>
            </div>
        )
    }
}

export default injectStripe(Checkout);