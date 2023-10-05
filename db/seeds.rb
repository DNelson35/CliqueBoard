
# users
damien = User.create!(username: 'nelson13', name: 'Damien', email_address: 'example@example.com', age: 30, password: 'test', password_confirmation: 'test')

felesia = User.create!(username: 'wife', name: 'Felesia', email_address: 'example@example', age: 27, password: 'test', password_confirmation: 'test', status: 'Online')

# groups
family = damien.groups.create!(admin_id: damien.id, name: 'Nelson Family', description: 'family planning', access_code: 'test')
extended = damien.groups.create!(admin_id: damien.id, name: 'extended Family', description: 'whole family planner', access_code: 'test2')
jenkins = felesia.groups.create!(admin_id: felesia.id, name: 'jenkins Family', description: 'family planning', access_code: 'test3')

groups = [family, extended, jenkins]

# group members
family.group_members.create!(user_id: damien.id, group_id: family.id)
family.group_members.create!(user_id: felesia.id, group_id: family.id)
extended.group_members.create!(user_id: damien.id, group_id: extended.id)
jenkins.group_members.create!(user_id: felesia.id, group_id: jenkins.id)

# group widgets

calendar = Widget.create!(name: 'Calendar')

i=0
groups.each do |group|
    i += 1
    group.widget_data.create!(widget_id: calendar.id, start_date: '2023-09-22', title: "event#{i}" )
end
