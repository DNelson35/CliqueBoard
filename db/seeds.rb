
damien = User.create!(username: 'nelson13', name: 'Damien', email_address: 'example@example.com', age: 30, password: 'test', password_confirmation: 'test')

felesia = User.create!(username: 'wife', name: 'Felesia', email_address: 'example@example', age: 27, password: 'test', password_confirmation: 'test')

damien.groups.create!(admin_id: damien.id, name: 'Nelson Family', description: 'family planning')
damien.groups.create!(admin_id: damien.id, name: 'extended Family', description: 'whole family planner')

felesia.groups.create!(admin_id: felesia.id, name: 'jenkins Family', description: 'family planning')