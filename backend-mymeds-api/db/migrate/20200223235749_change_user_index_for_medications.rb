class ChangeUserIndexForMedications < ActiveRecord::Migration[5.2]
  def change
    change_column :medications, :user_id, :integer, null: false
  end
end
