class ProductsController < ApplicationController

    def index 
        render json: Product.all, status: :ok
    end

    def show
        render json: @product, status: :ok
    end
end