class MedicationSerializer 
    def initialize(medication)
        @medication = medication
    end

    def to_serialized_json
        @medication.to_json(only: [:id, :name, :className, :photo, :info, :user_id, :time_of])
    end

end