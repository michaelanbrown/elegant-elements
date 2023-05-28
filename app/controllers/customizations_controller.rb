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
        render json: customization, status: :created
    end

    private

    def customization_params
        params.permit(:custom_type, :price, :personalization)
    end
end