class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :users
end
