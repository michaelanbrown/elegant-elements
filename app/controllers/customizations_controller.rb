class CustomizationsController < ApplicationController
    before_action :find_customization, only: [:show]

    def index 
        render json: Customization.all, status: :ok
    end

    def show
        render json: @customization, status: :ok
    end
end
