// sk_test_51NMeYtK92FCM7B9Ee0AlRZsplGSXOjRB8Oe32bo5p779yweLtzp9W8xRm84zD0B7uA4v3LtfBZyhQ7KBjKI7Lm6F006xcRE91U

// Necklace with phrase: price_1NMeklK92FCM7B9EdlbTp7Cs
// Necklace with word: price_1NMelRK92FCM7B9EWIZECJV3
// Necklace with date: price_1NMelzK92FCM7B9ESclbtm6w
// Bracelet wtih phrase: price_1NMemOK92FCM7B9Ebm7PmymW
// Bracelet wtih word: price_1NMemiK92FCM7B9EF5BKE0ge
// Bracelet wtih date: price_1NMen0K92FCM7B9EKmpf3Gfj
// Keychain with phrase: price_1NMenLK92FCM7B9Evqz9gwyi
// Keychain with word: price_1NMeneK92FCM7B9Eh0250qlD
// Keychain with date: price_1NMenxK92FCM7B9EDMnruaBL
// Shipping: price_1NMftNK92FCM7B9EsdMaHKOW
const express = require('express');
var cors = require('cors');
const stripe = require('stripe')('sk_test_51NMeYtK92FCM7B9Ee0AlRZsplGSXOjRB8Oe32bo5p779yweLtzp9W8xRm84zD0B7uA4v3LtfBZyhQ7KBjKI7Lm6F006xcRE91U');

const app = express()
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
    const items = req.body.items;
    const email = req.body.email
    let lineItems = [];
    items.forEach((item) => {
        lineItems.push(
            {
                price: item.stripe_key,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:4000/success",
        cancel_url: "http://localhost:4000/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));

});

app.listen(4001, () => console.log("Listening on port 4001!"));