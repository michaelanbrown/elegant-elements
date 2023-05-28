class ProductsController < ApplicationController
    before_action :find_product, only: [:show, :update, :destroy]

    def index 
        render json: Product.all, status: :ok
    end

    def show
        render json: @product, status: :ok
    end

    def create
        product = Product.create!(product_params)
        render json: product, status: :created
    end

    def update
        @product.update!(update_product_params)
        render json: @product, status: :accepted
    end

    def destroy
        @product.destroy
        head :no_content 
    end 

    private

    def product_params
        params.permit(:jewelry, :price, :quantity, :customization_id, :order_id)
    end
    
    def update_product_params
        params.permit(:jewelry, :price, :quantity)
    end
end