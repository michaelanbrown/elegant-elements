class AddressSerializer < ActiveModel::Serializer
  attributes :id, :street, :unit, :city, :state, :zip, :customer_id

  belongs_to :customer
end
