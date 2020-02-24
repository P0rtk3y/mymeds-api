class AddUserToMedications < ActiveRecord::Migration[5.2]
  def change
    add_reference :medications, :user, index: true
    add_foreign_key :medications, :users
  end
end
