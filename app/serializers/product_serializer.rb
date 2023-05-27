class ProductSerializer < ActiveModel::Serializer
  attributes :id, :type, :price, :quantity, :customization_id, :order_id

  has_one :order
  has_one :customization
end
