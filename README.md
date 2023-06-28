# Elegant Elements
## Adding a touch of inspiration and elegance to your every day life

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

#### Lengths

The Event schema contains all pertinent information about each length including the distance and unit of measurement.

### Description

Track Zone allows users to connect and display their proud accomplishments through their race listings which include the length and achieved time of each race.

### Method Examples

```python
# Index
  def index 
      render json: User.all, status: :ok
  end
```

```python
# Show
  def show
      render json: current_user, status: :ok
  end
```

```python
# Create Request
  def create
      race = Race.create!(race_params)
      render json: race, status: :created
  end

  private

  def race_params
    params.permit(:name, :year, :length_id).merge(user_id: current_user.id)
  end
```

```python
# Update Request
  def update
    @race.update!(update_race_params)
    render json: @race, status: :accepted
  end

  def update_race_params
    params.permit(:name, :year, :duration)
  end
```

```python
# Delete Request
  def destroy
    @race.destroy
    head :no_content 
  end 
```

### Routes

```python
# All Used Routes
  resources :races
  resources :lengths, only: [:index, :create]
  resources :users, only: [:index, :show, :create]

  post "/login", to: "sessions#create" 
  delete "/logout", to: "sessions#destroy"
  get "/authorized_user", to: "users#show"
```

### Fork and Clone

Feel free to fork and clone this to use as your own!
Be aware of the seeded data.

### Contributing

Suggestions are welcome.