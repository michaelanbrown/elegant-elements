class Customization < ApplicationRecord
    has_many :products
    has_many :orders, through: :products
end