class CreateApiV1Weddings < ActiveRecord::Migration[7.0]
  def change
    create_table :weddings do |t|
      t.string :name
      t.string :location
      t.datetime :date
      t.string :info_url
      t.string :unique_id

      t.timestamps
    end
  end
end
