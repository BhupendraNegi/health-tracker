require 'date'
class ReadingSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :level
  attribute :created_at do |object|
    object.created_at.strftime("%a, %e %b %Y")
  end

end
