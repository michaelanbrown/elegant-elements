class OrderSerializer < ActiveModel::Serializer
  attributes :id, :customer_id, :total, :discount, :shipping
end
