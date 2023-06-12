class Product < ApplicationRecord
    belongs_to :order
    belongs_to :customization

    validates :jewelry, presence: true, inclusion: { in: %w(necklace bracelet keychain) }
    validates :price, numericality: { greater_than: 0 }, on: :update
    validates :quantity, numericality: { greater_than: 0 }
    validate :within_24_hours, on: [:update, :destroy]
    validate :product_cannot_update, on: [:update, :destroy]

    private

    def within_24_hours
        return if order.status == "in progress" || (order.status == "pending" && Time.at(created_at.to_i) > Time.at(Time.now-1.day.to_i))

        if  order.status == "pending" && Time.at(created_at.to_i) < Time.at(Time.now-1.day.to_i)
            errors.add(:status, "must be within 24 hours of order")
        end
    end

    def product_cannot_update
        return if order.status == "in progress" || (order.status == "pending" && Time.at(created_at.to_i) > Time.at(Time.now-1.day.to_i))

        if order.status == "completed" || order.status == "canceled"
            errors.add(:status, "the order has been fulfilled or canceled")
        end
    end
end