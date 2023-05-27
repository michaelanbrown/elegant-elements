class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.integer :customer_id
      t.float :total
      t.float :discount
      t.float :shipping

      t.timestamps
    end
  end
end
