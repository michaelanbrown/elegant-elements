class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :username, :password_digest, :products

  has_many :orders
  has_many :addresses

  def products
    @order_ids = object.orders.map{ |o| o.id}
    @order_ids.map { |o| Order.find(o).products}
  end
end
