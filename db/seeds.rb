
damien = User.create!(username: 'nelson13', name: 'Damien', email_address: 'example@example.com', age: 30, password: 'test', password_confirmation: 'test')

felesia = User.create!(username: 'wife', name: 'Felesia', email_address: 'example@example', age: 27, password: 'test', password_confirmation: 'test')

group = damien.groups.create!(admin_id: damien.id, name: 'testGroup', description: 'this is for testing purposes')