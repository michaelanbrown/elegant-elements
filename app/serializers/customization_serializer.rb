class CustomizationSerializer < ActiveModel::Serializer
  attributes :id, :custom_type, :price, :personalization

  has_many :products
  has_many :orders

  def custom_type
    @custom_type = object.custom_type.capitalize
  end
end