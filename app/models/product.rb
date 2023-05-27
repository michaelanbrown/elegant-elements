class Product < ApplicationRecord
    belongs_to :order
    belongs_to :customization

    validates :jewelry, presence: true, inclusion: { in: %w(necklace bracelet keychain) }
    validates :price, numericality: { greater_than: 0 }, inclusion: { in: %w(8.00 9.00 10.00) }
    validates :quantity, numericality: { greater_than: 0 }
end