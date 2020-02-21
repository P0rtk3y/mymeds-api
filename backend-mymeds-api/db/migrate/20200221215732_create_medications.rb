class CreateMedications < ActiveRecord::Migration[5.2]
  def change
    create_table :medications do |t|
        t.string "name"
        t.string "className"
        t.string "photo"
        t.string "info"
        t.datetime "created_at", null: false
    end
  end
end
