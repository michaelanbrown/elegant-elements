class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :username, :password_digest, :products

  has_many :orders
  has_many :addresses

  def products
    @order_ids = object.orders.map{ |o| o.id}
    @product_arrays = @order_ids.map { |o| Product.where(order_id: o)}
    @prods = []
    @product_arrays.map{|p| p.map{|p| @prods.push(p)}}
    @prods.each{|p| p.jewelry = p.jewelry.capitalize}.uniq{|p| p.jewelry && p.customization_id}
  end
end
