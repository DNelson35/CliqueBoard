
damien = User.create!(username: 'nelson13', name: 'Damien', email_address: 'example@example.com', age: 30, password: 'test', password_confirmation: 'test')

felesia = User.create!(username: 'wife', name: 'Felesia', email_address: 'example@example', age: 27, password: 'test', password_confirmation: 'test')

family = damien.groups.create!(admin_id: damien.id, name: 'Nelson Family', description: 'family planning', access_code: 'test')
extended = damien.groups.create!(admin_id: damien.id, name: 'extended Family', description: 'whole family planner', access_code: 'test2')

family.group_members.create!(user_id: damien.id, group_id: family.id)
extended.group_members.create!(user_id: damien.id, group_id: extended.id)

jenkins = felesia.groups.create!(admin_id: felesia.id, name: 'jenkins Family', description: 'family planning', access_code: 'test3')

jenkins.group_members.create!(user_id: felesia.id, group_id: jenkins.id)