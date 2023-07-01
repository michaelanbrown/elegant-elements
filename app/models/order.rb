class Order < ApplicationRecord
    has_many :products
    has_many :customizations, through: :products

    belongs_to :customer
    belongs_to :address

    validates :shipping, presence: true, numericality: { equal_to: 7.00 }
    validates :status, presence: true
    validate :order_cannot_update, on: :update
    validate :in_progress
    validate :admin, on: :update

    private

    def order_cannot_update
        return if (status == "in progress" || (status == "submitted" && Time.at(created_at.to_i) > Time.at(Time.now-1.day.to_i)))

        if (status == "fulfilled")
            errors.add(:status, "the order has been fulfilled")
        end
    end

    def in_progress
        orders = Order.where(customer_id: customer_id)
        return if (status == "in progress" && orders.find_by(status: "in progress").to_s.length == 0)

        if (status == "in progress" && orders.find_by(status: "in progress").to_s.length > 0)
            errors.add(:status, "You already have an order in progress")
        end
    end

    def admin
        return if(status == "fulfilled" && customer.admin)

        if(customer.admin == false)
            errors.add(:status, "You do not have permissions")
        end
    end
end