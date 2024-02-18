
# # users
damien = User.create!(username: 'nelson13', name: 'Damien', email_address: 'example@example.com', age: 30, password: 'test', password_confirmation: 'test', status: 'Online')

felesia = User.create!(username: 'wife', name: 'Felesia', email_address: 'example@example', age: 27, password: 'test', password_confirmation: 'test', status: 'Online')

# # groups
# family = damien.groups.create!(admin_id: damien.id, group_name: 'Nelson Family', description: 'family planning', access_code: 'test')
# extended = damien.groups.create!(admin_id: damien.id, group_name: 'extended Family', description: 'whole family planner', access_code: 'test2')
# jenkins = felesia.groups.create!(admin_id: felesia.id, group_name: 'jenkins Family', description: 'family planning', access_code: 'test3')

# groups = [family, extended, jenkins]

# # group members
# family.group_members.create!(user_id: damien.id, group_id: family.id)
# family.group_members.create!(user_id: felesia.id, group_id: family.id)
# extended.group_members.create!(user_id: damien.id, group_id: extended.id)
# jenkins.group_members.create!(user_id: felesia.id, group_id: jenkins.id)

# # group widgets

calendar = Widget.create!(name: 'Calendar')

# i=0
# groups.each do |group|
#     i += 1
#     group.widget_data.create!(widget_id: calendar.id, start_date: '2023-10-22', title: "event#{i}", event_group: group.group_name )
# end


# # conversations

# me_wife = Conversation.create!(chat_type: 'User', user1_id: damien.id, user2_id: felesia.id, group_id: nil)
# me_extendeGroup = Conversation.create!(chat_type: 'Group', user1_id: damien.id, group_id: extended.id)
# me_familyGroup = Conversation.create!(chat_type: 'Group', user1_id: damien.id, group_id: family.id)
# jenkins_chat = Conversation.create!(chat_type: 'Group', user1_id: felesia.id, group_id: jenkins.id)

# # messages

# to_wife = Message.create!(user_id: damien.id, conversation_id: me_wife.id, body: 'hello wife')

# to_group = Message.create!(user_id: damien.id, conversation_id: me_extendeGroup.id, body: 'hello group')
