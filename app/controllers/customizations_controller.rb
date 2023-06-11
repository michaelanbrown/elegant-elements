class CustomizationsController < ApplicationController
    before_action :find_customization, only: [:show]

    def index 
        render json: Customization.all, status: :ok
    end

    def show
        render json: @customization, status: :ok
    end

    def create
        customization = Customization.create!(customization_params)
        if customization.custom_type == "phrase"
            customization.update(price: 4.00)
        elsif customization.custom_type == "word" || customization.custom_type == "date"
            customization.update(price: 2.00)
        end
        render json: customization, status: :created
    end

    private

    def customization_params
        params.permit(:custom_type, :personalization)
    end
end