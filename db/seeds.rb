# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

user1 = User.new
user1.first_name = "John"
user1.last_name = "Doe"
user1.email = 'test1@example.com'
user1.password = 'password'
user1.password_confirmation = 'password'
user1.save!

user2 = User.new
user2.first_name = "Jimmy"
user2.last_name = "Smith"
user2.email = 'test2@example.com'
user2.password = 'password'
user2.password_confirmation = 'password'
user2.save

user3 = User.new
user3.first_name = "Jane"
user3.last_name = "Doe"
user3.email = 'test3@example.com'
user3.password = 'password'
user3.password_confirmation = 'password'
user3.save

wed1 = Wedding.create!(name: "John & Kate's Wedding", location: "San Diego", date: "2020-01-01", info_url: "https://www.google.com", unique_id: Faker::Internet.uuid)
wed2 = Wedding.create!(name: "Jimmy & Lauren's Wedding", location: "San Fransico", date: "2020-02-02", info_url: "https://www.google.com", unique_id: Faker::Internet.uuid)
wed3 = Wedding.create!(name: "Jane & Mike's Wedding", location: "San Juan", date: "2020-02-02", info_url: "https://www.google.com", unique_id: Faker::Internet.uuid)

thread1 = MessageThread.create!(title: 'Q & A', wedding_id: wed1.id)
thread2 = MessageThread.create!(title: 'Day Before Wedding Info', wedding_id: wed2.id)
thread3 = MessageThread.create!(title: 'Directions to Venue', wedding_id: wed3.id)
thread7 = MessageThread.create!(title: 'Wedding Hotel Activities', wedding_id: wed3.id)
thread8 = MessageThread.create!(title: 'Things to Do In The Area', wedding_id: wed3.id)
thread9 = MessageThread.create!(title: 'Wedding Morning Get Together', wedding_id: wed3.id)

mes1 = Message.create!(body: "Hello, I'm John", user_id: user1.id, message_thread_id: thread1.id)
mes2 = Message.create!(body: "Hello, I'm Jimmy", user_id: user2.id, message_thread_id: thread2.id)
mes3 = Message.create!(body: "Hello, I'm Jane", user_id: user3.id, message_thread_id: thread3.id)

perm1 = Permission.create!(access: 'host', user_id: user1.id, wedding_id: wed1.id)
perm2 = Permission.create!(access: 'atendee', user_id: user2.id, wedding_id: wed1.id)
perm3 = Permission.create!(access: 'atendee', user_id: user3.id, wedding_id: wed1.id)
perm1 = Permission.create!(access: 'atendee', user_id: user1.id, wedding_id: wed2.id)
perm2 = Permission.create!(access: 'host', user_id: user2.id, wedding_id: wed2.id)
perm3 = Permission.create!(access: 'atendee', user_id: user3.id, wedding_id: wed2.id)
perm1 = Permission.create!(access: 'atendee', user_id: user1.id, wedding_id: wed3.id)
perm2 = Permission.create!(access: 'atendee', user_id: user2.id, wedding_id: wed3.id)
perm3 = Permission.create!(access: 'host', user_id: user3.id, wedding_id: wed3.id)

pp "Seeded"