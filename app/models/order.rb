class Order < ApplicationRecord
    has_many :products
    has_many :customizations, through: :products

    belongs_to :customer

    validates :total, numericality: { greater_than: 0 }
    validates :discount, numericality: { lass_than: 1 }
    validates :shipping, presence: true
    validates :status, presence: true
end