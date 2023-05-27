class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :username, :password

  has_many :orders
end
