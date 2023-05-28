class OrdersController < ApplicationController
    before_action :find_order, only: [:show, :update]

    def index 
        render json: Order.all, status: :ok
    end

    def show
        render json: @order, status: :ok
    end

    def create
        order = Order.create!(order_params)
        render json: order, status: :created
    end

    def update
        @order.update!(update_order_params)
        render json: @order, status: :accepted
    end

    private

    def order_params
        params.permit(:total, :discount).merge(customer_id: current_customer.id)
    end

    :customer_id, :total, :discount, :shipping

    # def update_order_params
    #     params.permit(:name, :year, :duration)
    # end
end
