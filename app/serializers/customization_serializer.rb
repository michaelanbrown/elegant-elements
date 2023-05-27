class CustomizationSerializer < ActiveModel::Serializer
  attributes :id, :type, :price

  has_many :products
  has_many :orders
end
