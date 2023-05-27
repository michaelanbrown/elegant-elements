class CustomersController < ApplicationController

    def index 
        render json: Customer.all, status: :ok
    end

    def create
        customer = Customer.create!(customer_params)
        render json: customer, status: :ok
    end

    private 

    def customer_params
        params.permit(:name, :username, :email, :password)
    end 

end