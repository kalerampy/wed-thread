class WeddingSerializer < ActiveModel::Serializer

  attributes :id, :name, :info_url, :date, :location

  has_many :message_threads

end
