class Address < ApplicationRecord
    belongs_to :customer

    validates :street, presence: true
    validates :city, presence: true
    validates :state, presence: true, length: { is: 2 }
    validates :zip, presence: true
    validate :zip_code_length_and_format

    private
    def zip_code_length_and_format
        return if (zip.to_s.size == 5)
    end
end