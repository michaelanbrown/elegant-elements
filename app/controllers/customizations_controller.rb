class CustomizationsController < ApplicationController

    def index 
        render json: Customization.all, status: :ok
    end

    def show
        render json: @customization, status: :ok
    end
end
