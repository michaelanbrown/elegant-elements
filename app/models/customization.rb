class Customization < ApplicationRecord
    has_many :products
    has_many :orders, through: :products

    validates :custom_type, presence: true, inclusion: { in: %w(phrase word date) }
    validates :price, numericality: { greater_than: 0 }
    validates :personalization, presence: true
    # validates :personalization, format: { without: /\s/ }, scope: { :word_personalization }
    validate :word_personalization

    private
    
    def word_personalization
        return if (custom_type == "word" && personalization.index(" ").to_i < 0)

        if (custom_type == "word" && personalization.index(" "))
            errors.add(:status, "Cannot be multiple words")
        end
    end
end