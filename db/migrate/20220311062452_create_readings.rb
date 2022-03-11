class CreateReadings < ActiveRecord::Migration[6.1]
  def change
    create_table :readings do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.integer :level
      
      t.timestamps
    end
  end
end
