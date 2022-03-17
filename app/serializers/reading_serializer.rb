require 'date'
class ReadingSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :level
  attribute :created_at do |object|
    object.created_at.strftime("%e %b %Y, %I:%M %p")
  end

end
