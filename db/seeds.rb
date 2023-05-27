# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

u1 = Customer.create(name: "Carla Jones", email: "carla.jones@gmail.com", username: "carla.jones", password: "carla1234!")
u2 = Customer.create(name: "Vanessa", email: "ness1234@yahoo.com", username: "nessa", password: "nessaabcd")
u3 = Customer.create(name: "Jack Crane", email: "jc@gmail.com", username: "jcraneee", password: "crane")

c1 = Customization.create(custom_type: "phrase", price: 4.00, personalization: "Life is a gift")
c2 = Customization.create(custom_type: "word", price: 2.00, personalization: "Smiles")
c3 = Customization.create(custom_type: "date", price: 2.00, personalization: "01.26.2021")

o1 = Order.create(customer_id: u1.id, total: 20.00, discount: 0.00, shipping: 7.00)
o2 = Order.create(customer_id: u2.id, total: 19.00, discount: 0.00, shipping: 7.00)
o3 = Order.create(customer_id: u3.id, total: 39.00, discount: 0.00, shipping: 7.00)

p1 = Product.create(jewelry: "necklace", price: 10.00, quantity: 1, customization_id: c3.id, order_id: o2.id)
p2 = Product.create(jewelry: "bracelet", price: 9.00, quantity: 1, customization_id: c1.id, order_id: o1.id)
p3 = Product.create(jewelry: "keychain", price: 8.00, quantity: 2, customization_id: c2.id, order_id: o3.id)
p4 = Product.create(jewelry: "necklace", price: 10.00, quantity: 1, customization_id: c2.id, order_id: o3.id)