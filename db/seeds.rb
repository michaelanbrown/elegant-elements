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

c1 = Customization.create(type: "phrase", price: 4)
c2 = Customization.create(type: "word", price: 2)
c3 = Customization.create(type: "date", price: 2)

o1 = Order.create(customer_id: u1.id, total: , discount: 0.00, shipping: 7.00)
o2 = Order.create(customer_id: u2.id, total: , discount: 0.00, shipping: 7.00)
o3 = Order.create(customer_id: u3.id, total: , discount: 0.00, shipping: 7.00)

p1 = Product.create(type: "necklace", price: 10.00, quantity: 1, )