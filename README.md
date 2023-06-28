# Elegant Elements
## Adding a touch of inspiration and elegance to your every day life

### Description

Elegant Elements started with a passion for mental health. Michaela Brown started this company as a tribute to not only those struggling with every day life, but also to those that promote and pursue a positive lifestyle and good mental health.

The pieces of jewelry behind Elegant Elements are meant to contain postiive words, phrases, and dates of happy memories to encourage each individual as they go about their day.

Once the idea came to life, Michaela decided to expand to all words, phrases, etc. that her clients wanted to put on the jewelry, but she will always hope and strive for positivity and a happy head space for her clients.

### Models

I have incldued five models:
1. Customer
2. Order
3. Product
4. Customization
5. Address

#### Customers

The Customers model has_many :orders and has_many :addresses.

#### Orders

The Orders model has_many :products, has_many :customizations through: :products, belongs_to :customer, and belongs_to :address.

#### Products

The Products model belongs_to :order and belongs_to :customization.

#### Customizations

The Customizations model has_many :products and has_many :orders through: :products.

#### Addresses

The Addresses model belongs_to :customer and has_many :orders.


### Validations

#### Customers

The Customers model validates:
1. validates :name, presence: true
2. validates :username, presence: true, uniqueness: true
3. validates :email, presence: true, uniqueness: true

#### Orders

The Orders model validates:
1. validates :discount, numericality: { less_than: 1 }
2. validates :shipping, presence: true, numericality: { equal_to: 7.00 }
3. validates :status, presence: true
4. validate :order_cannot_update, on: :update
    - order_cannot_update is a custom validation that will only allow the order to be updated if the status is in progress or the status is submitted and the order was created within 24 hours.
    - If the order status is fulfilled, then an error message will be rendered that states "the order has been fulfilled"
    - This validation only runs when an order is updated (i.e. a PATCH request)
5. validate :in_progress
    - in_progress is a custom validation that only allows one order to be in the in progress status at a time

#### Products

The Products model validates:
1. validates :jewelry, presence: true, inclusion: { in: %w(necklace bracelet keychain) }
2. validates :price, numericality: { greater_than: 0 }, on: :update
3. validates :quantity, numericality: { greater_than: 0 }
4. validate :within_24_hours, on: [:update, :destroy]
    - within_24_hours is a custom validation that will only allow the product to be updated or deleted if the order status is in progress or the order status is submitted and the order was created within 24 hours.
    - If the order status is submitted and the product was not created within the last 24 hours, then an error message will be rendered that states "must be within 24 hours of order".
5. validate :product_cannot_update, on: [:update, :destroy]
    - product_cannot_update is a custom validation that will only allow the product to be updated or deleted if the order status is in progress or the order status is submitted and the order was created within 24 hours.
    - If the order status is fulfilled, then an error message will be rendered that states "the order has been fulfilled".
    - This validation only runs when a product is updated (i.e. a PATCH request) or deleted (i.e. a DESTROY request).

#### Customizations

The Customizations model validates:
1. validates :custom_type, presence: true, inclusion: { in: %w(phrase word date) }
2. validates :price, numericality: { greater_than: 0 }, on: :update
3. validates :personalization, presence: true
4. validate :word_personalization
    - word_personalization is a custom validation that ensures that if the custom_type is a word, then the personalization does not include a space
5. validate :phrase_personalization
    - phrase_personalization is a custom validation that ensures that if the custom_type is a phrase, then the personalization does include a space
6. validate :date_personalization
    - date_personalization is a custom validation that ensures that if the custom_type is a date, then the personalization does include a dot at the 3rd and 6th characters.

#### Addresses

The Addresses model validates:
1. validates :name, presence: true
2. validates :street, presence: true
3. validates :city, presence: true
4. validates :state, presence: true, length: { is: 2 }
5. validates :zip, presence: true, length: { is: 5 }

### Schemas

#### Customer

The Customer schema contains all pertinent information about each customer including name, email, username, and password.

#### Order

The Order schema contains all pertinent information about each order including the customer, total, shipping, address, and status. They connect to their customer and address via the columns below:

```bash
t.integer "customer_id"
```
```bash
t.index ["customer_id"], name: "index_orders_on_customer_id"
```
```bash
t.bigint "address_id", null: false
```
```bash
t.index ["address_id"], name: "index_orders_on_address_id"
```

#### Product

The Product schema contains all pertinent information about each product including the type of jewelry, price, quantity, customization, order, and stripe key. They connect to their customization and order via the columns below:

```bash
t.integer "customization_id"
```
```bash
t.index ["customization_id"], name: "index_products_on_customization_id"
```
```bash
t.integer "order_id"
```
```bash
t.index ["order_id"], name: "index_products_on_order_id"
```

#### Customization

The Customization schema contains all pertinent information about each customization including the customization type, personalized message, and price.

#### Address

The Address schema contains all pertinent information about each address including the shipped to's name, street, unit (if applicable), city, state, zip code, amd customer. They connect to their customization and order via the columns below:

```bash
t.integer "customer_id"
```
```bash
t.index ["customer_id"], name: "index_addresses_on_customer_id"
```

### Method Examples

```python
# Index
  def index 
      render json: Customer.all, status: :ok
  end
```

```python
# Show
  def find_customization
    @customization = Customization.find(params[:id])
  end

  def show
      render json: @customization, status: :ok
  end
```

```python
# Create Request
  def order_params
    params.permit(:total).merge(customer_id: @current_customer.id, address_id: Address.where(customer_id: @current_customer.id).first.id)
  end

  private
    
  def create
      order = Order.create!(order_params)
      render json: order, status: :created
  end
```

```python
# Update Request
  def find_product
    @product = Product.find(params[:id])
  end

  def update
      @product.update!(update_product_params)
      render json: @product, status: :accepted
  end

  private

  def update_product_params
      params.permit(:jewelry, :price, :quantity)
  end
```

```python
# Delete Request
  def find_address
    @address = Address.find(params[:id])
  end

  def destroy
      @address.destroy
      head :no_content 
  end
```

### Routes

```python
# All Used Routes
  resources :addresses
  resources :products, only: [:index, :show, :create, :update]
  resources :orders, only: [:index, :show, :create, :update]
  resources :customizations, only: [:index, :show, :create]
  resources :customers, only: [:index, :show, :create]

  post "/login", to: "sessions#create" 
  delete "/logout", to: "sessions#destroy"
  get "/authorized_user", to: "customers#show"
```

### Aknowledgements

These images are not mine. The necklace and keychain images were taken from Shopify, and the bracelet image was taken from Etsy.