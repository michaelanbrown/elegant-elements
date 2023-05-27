class Customization < ApplicationRecord
    has_many :products
    has_many :orders, through: :products

    validates :custom_type, presence: true, inclusion: { in: %w(phrase word date) }
    validates :price, numericality: { greater_than: 0 }, inclusion: { in: %w(2.00 4.00) }
    validates :personalization, presence: true
end