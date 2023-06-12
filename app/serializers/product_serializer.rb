class ProductSerializer < ActiveModel::Serializer
  attributes :id, :jewelry, :price, :quantity, :customization_id, :order_id

  has_one :order
  has_one :customization

  def jewelry
    @jewelry = object.jewelry.capitalize
  end

  def price
    @price = object.price * object.quantity
  end
end
