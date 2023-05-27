class Order < ApplicationRecord
    has_many :products
    has_many :customizations, through: :products

    belongs_to :customer

    validates :total, numericality: { greater_than: 0 }
    validates :discount, numericality: { lass_than: 1 }
    validates :shipping, presence: true
    validates :status, presence: true
    validate :within_24_hours

    private

    def within_24_hours
        errors.add(:status, "must be within 24 hours of order") unless created_at > Time.now-1.day
    end
end