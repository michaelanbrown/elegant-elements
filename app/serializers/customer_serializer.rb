class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :username, :password_digest

  has_many :orders
  has_many :addresses
end
