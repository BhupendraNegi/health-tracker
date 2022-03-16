class ReadingSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :level, :created_at
end
