class ProductSerializer < ActiveModel::Serializer
  attributes :id, :type, :price, :quantity, :customization_id, :order_id
end
