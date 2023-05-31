class Customization < ApplicationRecord
    has_many :products
    has_many :orders, through: :products

    validates :custom_type, presence: true, inclusion: { in: %w(phrase word date) }
    validates :price, numericality: { greater_than: 0 }
    validates :personalization, presence: true
    validate :word_personalization
    validate :phrase_personalization

    private
    
    def word_personalization
        return if (custom_type == "word" && personalization.index(" ").to_i < 0)

        if (custom_type == "word" && personalization.index(" "))
            errors.add(:personalization, "Cannot be multiple words")
        end
    end

    def phrase_personalization
        return if (custom_type == "phrase" && personalization.index(" ").to_i > 0)

        if (custom_type == "phrase" && personalization.index(" ").to_i <= 0)
            errors.add(:personalization, "Needs to be multiple words")
        end
    end
end