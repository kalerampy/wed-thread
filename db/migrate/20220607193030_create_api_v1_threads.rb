class CreateApiV1Threads < ActiveRecord::Migration[7.0]
  def change
    create_table :message_threads do |t|
      t.string :title
      t.belongs_to :wedding, foriegn_key: true

      t.timestamps
    end
  end
end
