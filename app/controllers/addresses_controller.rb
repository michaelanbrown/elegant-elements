class AddressesController < ApplicationController

    def index 
        render json: Address.all, status: :ok
    end
end