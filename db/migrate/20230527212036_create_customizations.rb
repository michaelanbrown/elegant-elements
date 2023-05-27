class CreateCustomizations < ActiveRecord::Migration[6.1]
  def change
    create_table :customizations do |t|
      t.string :type
      t.float :price
      t.string :personalization

      t.timestamps
    end
  end
end
