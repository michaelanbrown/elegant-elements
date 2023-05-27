class OrdersController < ApplicationController

    def index 
        render json: Order.all, status: :ok
    end

    def show
        render json: @order, status: :ok
    end
end
