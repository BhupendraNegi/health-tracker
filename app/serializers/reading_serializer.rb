class ReadingSerializer
  include FastJsonapi::ObjectSerializer
  attributes :level, :created_at
end
