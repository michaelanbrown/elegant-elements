class OrdersController < ApplicationController
    before_action :find_race, only: [:show, :update]

    def index 
        render json: Order.all, status: :ok
    end

    def show
        render json: @order, status: :ok
    end
end
