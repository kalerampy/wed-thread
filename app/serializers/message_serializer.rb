class MessageSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :body, :created_at, :user_id
end
