# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

u1 = Customer.create!(name: "Carla Jones", email: "carla.jones@gmail.com", username: "carla.jones", password: "carla1234!", admin: false)
u2 = Customer.create!(name: "Vanessa", email: "ness1234@yahoo.com", username: "nessa", password: "nessaabcd", admin: false)
u3 = Customer.create!(name: "Jack Crane", email: "jc@gmail.com", username: "jcraneee", password: "crane", admin: false)
u4 = Customer.create!(name: "Michaela Brown", email: "m_brownbrown@yahoo.com", username: "michaelanbrown", password: "mnb", admin: true)

c1 = Customization.create!(custom_type: "phrase", price: 4.00, personalization: "Life is a gift")
c2 = Customization.create!(custom_type: "word", price: 2.00, personalization: "Smiles")
c3 = Customization.create!(custom_type: "date", price: 2.00, personalization: "01.26.2021")

a1 = Address.create!(name: "Carla Jones", street: "1234 Main St", unit: nil, city: "Sacramento", state: "CA", zip: "93642", customer_id: u1.id)
a2 = Address.create!(name: "Vanessa Atkins", street: "589 Real Dr", unit: "4A", city: "New York City", state: "NY", zip: "00512", customer_id: u2.id)
a3 = Address.create!(name: "Jack Crane", street: "654 Beach Cir", unit: nil, city: "Myrtle Beach", state: "SC", zip: "36542", customer_id: u3.id)

o1 = Order.create!(customer_id: u1.id, address_id: a1.id, total: 20.00, shipping: 7.00, status: "completed")
o2 = Order.create!(customer_id: u2.id, address_id: a2.id, total: 19.00, shipping: 7.00, status: "canceled")
o3 = Order.create!(customer_id: u3.id, address_id: a3.id, total: 39.00, shipping: 7.00, status: "completed")

p1 = Product.create!(jewelry: "necklace", price: 10.00, quantity: 1, customization_id: c3.id, order_id: o2.id, stripe_key: "price_1NMelzK92FCM7B9ESclbtm6w")
p2 = Product.create!(jewelry: "bracelet", price: 9.00, quantity: 1, customization_id: c1.id, order_id: o1.id, stripe_key: "price_1NMemOK92FCM7B9Ebm7PmymW")
p3 = Product.create!(jewelry: "keychain", price: 8.00, quantity: 2, customization_id: c2.id, order_id: o3.id, stripe_key: "price_1NMeneK92FCM7B9Eh0250qlD")
p4 = Product.create!(jewelry: "necklace", price: 10.00, quantity: 1, customization_id: c2.id, order_id: o3.id, stripe_key: "price_1NMelRK92FCM7B9EWIZECJV3")