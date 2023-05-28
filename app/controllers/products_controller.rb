class ProductsController < ApplicationController
    before_action :find_product, only: [:show, :update, :destroy]

    def index 
        render json: Product.all, status: :ok
    end
    
    def show
        render json: @product, status: :ok
    end
end