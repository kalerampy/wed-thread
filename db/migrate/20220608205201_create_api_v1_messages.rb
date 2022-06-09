class CreateApiV1Messages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.string :body
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :message_thread, null: false, foreign_key: true

      t.timestamps
    end
  end
end
