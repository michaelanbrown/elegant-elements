class Order < ApplicationRecord
    has_many :products
    has_many :customizations, through: :products

    belongs_to :customer

    validates :total, numericality: { greater_than: 0 }
    validates :discount, numericality: { less_than: 1 }
    validates :shipping, presence: true
    validates :status, presence: true
    validate :within_24_hours, on: :update

    private

    def within_24_hours
        return if Time.at(created_at.to_i) > Time.at(Time.now-1.day.to_i)

        if Time.at(created_at.to_i) < Time.at(Time.now-1.day.to_i)
            errors.add(:status, "must be within 24 hours of order")
        end
    end
end