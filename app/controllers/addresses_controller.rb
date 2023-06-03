class AddressesController < ApplicationController

    def index 
        render json: Address.all, status: :ok
    end

    def create
        order = Address.create!(address_params)
        render json: order, status: :created
    end

    def update
        address = Address.find_by(id: params[:id])
        address.update!(address_params)
        render json: address, status: :accepted
    end

    private

    def address_params
        params.permit(:street, :unit, :city, :state, :zip).merge(customer_id: current_customer.id)
    end
end