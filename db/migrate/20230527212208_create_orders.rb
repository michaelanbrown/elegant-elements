class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.integer :customer_id
      t.float :total
      t.float :discount
      t.float :shipping, default: 7.00
      t.string :status, default: "in progress"

      t.timestamps
    end

    add_foreign_key :orders, :customers, column: :customer_id
    add_index :orders, :customer_id

  end
end
