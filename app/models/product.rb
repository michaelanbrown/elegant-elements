class Product < ApplicationRecord
    belongs_to :order
    belongs_to :customization

    validates :jewelry, presence: true, inclusion: { in: %w(necklace bracelet keychain) }
    validates :price, numericality: { greater_than: 0 }, inclusion: { in: %w(8.00 9.00 10.00) }
    validates :quantity, numericality: { greater_than: 0 }
    validate :within_24_hours

    private

    def within_24_hours
        errors.add(:created_at, "must be within 24 hours of order") unless order.created_at > Time.now-1.day
    end

end