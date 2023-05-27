class Product < ApplicationRecord
    belongs_to :order
    belongs_to :customization

    validates :jewelry, presence: true, inclusion: { in: %w(necklace bracelet keychain) }
    validates :price, numericality: { greater_than: 0 }
    validates :quantity, numericality: { greater_than: 0 }
end