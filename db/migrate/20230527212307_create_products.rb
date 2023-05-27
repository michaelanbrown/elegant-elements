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
  end
end
