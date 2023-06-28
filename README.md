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

The Users model validates:
1. validates :name, presence: true
2. validates :username, presence: true, uniqueness: true
3. validates :email, presence: true, uniqueness: true

#### Orders

The Races model validates:
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

The Lengths model validates:
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

### Customizations

### Addresses

### Schemas

#### User

The Runner schema contains all pertinent information about each user including name, age, username, email, and password.

#### Races

The Race schema contains all pertinent information about each race including the name, year, and a duration which defaults to TBD. They connect to their coach and event via the columns below:

```bash
t.integer "length_id"
```
```bash
t.index ["length_id"], name: "index_races_on_length_id"
```
```bash
t.integer "user_id"
```
```bash
t.index ["user_id"], name: "index_races_on_user_id"
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