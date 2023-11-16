# CliqueBoard


## About
I built CliqueBoard based off a discussion with my wife. We had talked about having a tool to help the family all stay on the same page, whether this be travel plans, family events, our children's activities, or Other things. With that idea we came up with an idea for an app that we could use personally to solve this problem in our life. So with that idea I thought of what my family might need to make this happen and now we have cliqueBoard.

## What it Does

To solve this problem I thought of four things I would need. First I needed separate accounts, Second We would need to separate our family into groups and what we would share in each group. and third I need a place for the user to be able to track what is happening in their groups. Fourth I wanted the family to be able to discuss plans directly withing the application.

Solution for Separate Accounts I built out the backend to handle having multiple users and User Authentication. I wanted to give users the ability to create and share their own groups so I created a join table to the group so groups could have an admin user and group members.

Solution to Groups having their own data. The group should have its own data for the a calendar represented in the table. so I set up a relationship from the group to widget data that is a joins to the calendar widget or the widget table and the calendar relationship to the calendar is built by default when the group is created. I also wanted the group data to update in real time for all the users so I set up action cables to handle broadcasting data to the subscribed users to be updated on the frontend in real time, when changes are made to the group. 

Solution for tracking whats happing in your groups. I wanted there to be a dashboard for a user to see updates in there groups in one spot. So for example if a user logged into on of the groups you are a member of I wanted you to be able to see all the logged in users in your Dashboard. I also wanted this to be the landing page for when you log into the app. So setting this up I had to make use of my action cables and relationships. On the dashboard you can see all past, present, and future events as they are created. If a user in group one post a new event to the calendar you will see that change in your dashboard in real time, if a user logs in to group 2 you will see that user is now logged in in real time. On the dashboard you can also see how many groups you are in, how many notifications, and how many future events you have in your groups.

solution for communicating in the application. I built a real time messenger to handle this. I wanted there to be a group chat for every group the user is in. So when you create a group or join a group that groups group chat will already be available to you. The group chat is created at the same time the group is created. You can also message other users of the application. So if you want to message another user you simply type the username of the person you want to message into the search bar and then you can send a message that will create a conversation between you and the other user. all messages and the creation of the conversation happen real time so the moment you send the message the other user will get the conversation and the message. They can then send messages back to you through this conversation.


