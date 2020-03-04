class AddTimeOfDayToMedications < ActiveRecord::Migration[5.2]
  def change
    add_column :medications, :time_of, :string
  end
end
