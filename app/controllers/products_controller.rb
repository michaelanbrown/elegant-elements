class ProductsController < ApplicationController
    before_action :find_product, only: [:show, :update, :destroy]
    before_action :authorize_customer_on_product, only: [:show, :update, :destroy]

    def index 
        render json: Product.all, status: :ok
    end

    def show
        render json: @product, status: :ok
    end

    def create
        product = Product.create!(product_params)
        if product.jewelry == "necklace"
            product.update(price: 10.00)
        elsif product.jewelry == "bracelet"
            product.update(price: 9.00)
        elsif product.jewelry == "keychain"
            product.update(price: 8.00)
        end
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
        params.permit(:jewelry, :quantity, :customization_id).merge(order_id: Order.find_by(status: "in progress", customer_id: current_customer.id).id)
    end
    
    def update_product_params
        params.permit(:jewelry, :price, :quantity)
    end
end