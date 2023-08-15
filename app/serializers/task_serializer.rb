class TaskSerializer < ActiveModel::Serializer
  attributes :id, :task_description, :task_status
end
