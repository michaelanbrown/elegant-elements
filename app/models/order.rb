class Order < ApplicationRecord
    has_many :products
    has_many :customizations, through: :products

    belongs_to :customer
end