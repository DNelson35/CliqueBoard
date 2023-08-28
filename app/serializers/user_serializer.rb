class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :email_address, :age, :img, :password_digest, :groups
end
