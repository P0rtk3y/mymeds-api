class MedicationSerializer 
    def initialize(medication)
        @medication = medication
    end

    def to_serialized_json
        @user.to_json(only: [:id, :name, :className, :photo, :info])
    end

end