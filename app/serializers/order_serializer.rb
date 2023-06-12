class OrderSerializer < ActiveModel::Serializer
  attributes :id, :customer_id, :total, :discount, :shipping, :status, :editable

  has_many :products
  has_many :customizations

  belongs_to :customer
  belongs_to :address

  def total
    @product_total = object.products.map { |p| p.price * p.quantity }.sum
    @customization_total = object.products.map { |p| p.quantity * p.customization.price }.sum
    @product_total + @customization_total + object.shipping
  end

  def editable
    if object.status == "in progress"
      return true
    elsif object.status == "pending" && Time.at(created_at.to_i) > Time.at(Time.now-1.day.to_i)
      return true
    else
      return false
    end
  end

end