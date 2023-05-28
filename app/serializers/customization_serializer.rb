class CustomizationSerializer < ActiveModel::Serializer
  attributes :id, :custom_type, :price, :personalization

  has_many :products
  has_many :orders
end
