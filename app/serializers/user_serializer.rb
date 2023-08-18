class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :email_address, :age, :password_digest, :groups
end
