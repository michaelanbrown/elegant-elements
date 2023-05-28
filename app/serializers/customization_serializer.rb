class CustomizationSerializer < ActiveModel::Serializer
  attributes :id, :custom_type, :price

  has_many :products
  has_many :orders
end
