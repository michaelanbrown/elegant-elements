# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

u1 = Customer.create(name: "Carla Jones", email: "carla.jones@gmail.com", username: "carla.jones", password:)

c1 = Customization.create(type: "necklace", price: 10)
c2 = Customization.create(type: "bracelet", price: 9)
c2 = Customization.create(type: "keychain", price: 8)