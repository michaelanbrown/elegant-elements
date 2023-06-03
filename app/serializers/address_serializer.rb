class AddressSerializer < ActiveModel::Serializer
  attributes :id, :street, :unit, :city, :state, :zip, :customer_id
end
