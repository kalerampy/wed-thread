class CreateApiV1Permissions < ActiveRecord::Migration[7.0]
  def change
    create_table :permissions do |t|
      t.string :access
      t.belongs_to :wedding, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
