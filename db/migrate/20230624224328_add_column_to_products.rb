class AddColumnToProducts < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :stripe_key, :string
  end
end
