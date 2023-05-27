class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :username, :password
end
