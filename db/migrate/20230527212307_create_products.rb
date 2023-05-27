class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :type
      t.float :price
      t.integer :quantity
      t.integer :customization_id
      t.integer :order_id

      t.timestamps
    end

    add_foreign_key :products, :customizations, column: :customization_id
    add_index :products, :customization_id

    add_foreign_key :products, :orders, column: :order_id
    add_index :products, :order_id

  end
end
