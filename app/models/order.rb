class Order < ApplicationRecord
    has_many :products
    has_many :customizations, through: :products

    belongs_to :customer
    belongs_to :address

    validates :total, numericality: { greater_than: 0 }, on: :update
    validates :discount, numericality: { less_than: 1 }
    validates :shipping, presence: true, numericality: { equal_to: 7.00 }
    validates :status, presence: true
    validate :within_24_hours, on: :update
    validate :order_cannot_update, on: :update
    validate :in_progress

    private

    def within_24_hours
        return if object.status == "in progress" || (object.status == "pending" && Time.at(created_at.to_i) > Time.at(Time.now-1.day.to_i))

        if object.status == "completed"
            errors.add(:status, "the order has been fulfilled")
        end
    end

    def order_cannot_update
        return if object.status == "in progress" || (object.status == "pending" && Time.at(created_at.to_i) > Time.at(Time.now-1.day.to_i))

        if object.status == "completed" || object.status == "canceled"
            errors.add(:status, "the order has been fulfilled or canceled")
        end
    end

    def in_progress
        orders = Order.where(customer_id: customer_id)
        return if (status == "in progress" && orders.find_by(status: "in progress").to_s.length == 0)

        if (status == "in progress" && orders.find_by(status: "in progress").to_s.length > 0)
            errors.add(:status, "You already have an order in progress")
        end
    end
end