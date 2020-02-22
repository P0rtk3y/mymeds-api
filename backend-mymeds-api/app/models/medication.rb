class Medication < ApplicationRecord
    belongs_to :user
    validates :name, presence: true 
    validates :name, uniqueness: {case_sensitive: false}
end
