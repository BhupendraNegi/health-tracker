class GlucoseReadingSerializer
  include FastJsonapi::ObjectSerializer
  attributes :level, :created_at
end
