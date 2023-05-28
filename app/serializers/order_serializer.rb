class OrderSerializer < ActiveModel::Serializer
  attributes :id, :customer_id, :total, :discount, :shipping, :status

  has_many :products
  has_many :customizations

  belongs_to :customer
end
