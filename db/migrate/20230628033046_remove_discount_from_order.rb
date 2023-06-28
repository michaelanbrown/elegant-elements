class RemoveDiscountFromOrder < ActiveRecord::Migration[6.1]
  def change
    remove_column :orders, :discount, :float
  end
end
