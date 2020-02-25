class Api::V1::MedicationsController < ApplicationController
    def index 
        @medications = Medication.all
        render json: @medications, status: 200
    end 

    def show 
        @medication = Medication.find(params[:id])
        render json: @medication
    end 

    def new 
        @medication = Medication.new
        render json: MedicationSerializer.new(@medication)
    end 

    def create
        medication = Medication.new(medication_params)
        if medication.save 
            render json: MedicationSerializer.new(medication).to_serialized_json
        else 
            render json: {status: 500}
        end
    end

    def update 
        @medication = Medication.find(params[:id])
        if @medication.update(medication_params)
            render json: MedicationSerializer.new(@medication)
        else 
            render json: {status: 500}
        end 
    end 

    def destroy 
        @medication = Medication.find(params[:id])
        @medication.delete 

        render json: {}
    end 

    private

    def medication_params
        params.require(:medication).permit(:name, :class, :photo, :info, :user_id)
    end


end
