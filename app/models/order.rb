class Order < ApplicationRecord
    has_many :products
    has_many :customizations, through: :products

    belongs_to :customer
    belongs_to :address

    validates :total, numericality: { greater_than: 0 }
    validates :discount, numericality: { less_than: 1 }
    validates :shipping, presence: true, numericality: { equal_to: 7.00 }
    validates :status, presence: true
    validate :within_24_hours, on: :update
    validate :in_progress

    private

    def within_24_hours
        return if Time.at(created_at.to_i) > Time.at(Time.now-1.day.to_i)

        if Time.at(created_at.to_i) < Time.at(Time.now-1.day.to_i)
            errors.add(:status, "must be within 24 hours of order")
        end
    end

    def in_progress
        orders = Order.where(customer_id: current_customer.id)
        return if (status == "in progress" && orders.find_by(status: "in progress") == false)

        if (status == "in progress" && orders.find_by(status: "in progress"))
            errors.add(:status, "You already have an order in progress")
        end
    end
end