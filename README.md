# ConUHacks-IV-2019

## ConUHacks 2019 project: Real-time chat application 

This is a web-based chat application built with React and Chatkit. 

#### Features included

typing indicators, online presence list, chat history(all previous messages can be seen by the new user joined to the room)

### React - A JavaScript library for building user interfaces

https://reactjs.org/

#### Declarative
React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

#### Component-Based
Build encapsulated components that manage their own state, then compose them to make complex UIs.

React can also render on the server using Node and power mobile apps using React Native.

React components implement a render() method that takes input data and returns what to display. This example uses an XML-like syntax called JSX. Input data that is passed into the component can be accessed by render() via this.props.

### Chatkit - The Most Extensible API To Build In-App Messaging

Chatkit is a hosted API that helps to build awesome chat features for application.

Link to Chatkit API: https://pusher.com/chatkit?utm_source=github&utm_campaign=build-a-slack-clone-with-react-and-pusher-chatkit

#### Create an instance

#### Integrate into App

There will be public and private rooms with simple authentication mechanism.

The "online presence" feature will display which users are online or offline in rooms or across whole chat application.

The "read cursors" feature displays to users how far they have read the conversation.

The "typing indicators" feature shows users when someone else is typing in room. 

Using cross-platform SDKs, all chat data is sent to hosted API where we manage chat state and broadcast it.

### Create Chatkit Instance

To create a Chatkit instance, go to:https://dash.pusher.com/authenticate?utm_source=github&utm_campaign=build-a-slack-clone-with-react-and-pusher-chatkit&redirectTo=%2F%3Futm_source%3Dgithub%26utm_campaign%3Dbuild-a-slack-clone-with-react-and-pusher-chatkitand At dashboard hit 'Create new'.

Remember: Instance Locator and Secret Key in the Keys tab.

### Set up Node server

Since most interactions will happen on the client, Chatkit needs a server counterpart to create and manage users.

Installing @pusher/chatkit-server: npm install --save @pusher/chatkit-server 

#### Update server.js 

1. import Chatkit from @pusher/chatkit-server

2. instantiate chatkit instance using the Instance Locator and Key.

3. In the /users route, create a Chatkit user through our chatkit instance.

4. When someone first connects to Chatkit, a request will be sent to /authenticate to authenticate them. The server needs to respond with a token (returned by chatkit.authenticate) if the request is valid.
