class Reading < ApplicationRecord
  belongs_to :user

  validates :level,
            presence: true,
            numericality: { only_integer: true }
  validates :user_id,
            presence: true
  validate :check_max_daily_limit, on: :create

  MAX_DAILY_LIMIT = 4

  scope :of_date, -> (date) { where("DATE(created_at) = ?", date) }

  scope :date_wise_details, -> (date_range) { where("DATE(created_at) >= ? AND DATE(created_at) <= ?", date_range['startDate'].to_date, date_range['endDate'].to_date) }

  # def self.date_wise_details(date_range)
  #   binding.pry
  #   where("DATE(created_at) >= ? AND DATE(created_at) <= ?", date_range['startDate'].to_date, date_range['endDate'].to_date).order(created_at: :desc)
  # end


  def check_max_daily_limit
    unless Reading.where(user_id: self.user.id).of_date(Date.today).count < MAX_DAILY_LIMIT
      self.errors.add(:base, "Your Daily limit to enter glucose level is exceeded")
    end
  end
end
