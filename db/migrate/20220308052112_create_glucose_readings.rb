class CreateGlucoseReadings < ActiveRecord::Migration[6.1]
  def change
    create_table :glucose_readings do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.integer :level

      t.timestamps null: false
    end
  end
end
