## ConUHacks 2019 project: Real-time chat application 

This is a web-based chat application built with React and Chatkit API. 

A discussion and collaboration platform. [Devpost](https://devpost.com/software/conuhacks-iv-2019)

#### Features included

1. typing indicators

2. online presence list

3. chat history(all previous messages can be seen by the new user joined to the room)

### Preview

![jietu20190127-134505](https://user-images.githubusercontent.com/31902939/51805301-d4ca0380-2239-11e9-9e76-dd82609eff60.jpg)

### [React](https://reactjs.org/) - A JavaScript library for building user interfaces

#### Declarative
React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

#### Component-Based
Build encapsulated components that manage their own state, then compose them to make complex UIs.

React can also render on the server using Node and power mobile apps using React Native.

React components implement a render() method that takes input data and returns what to display. This example uses an XML-like syntax called JSX. Input data that is passed into the component can be accessed by render() via this.props.

### [Chatkit](https://pusher.com/chatkit?utm_source=github&utm_campaign=build-a-slack-clone-with-react-and-pusher-chatkit) - The Most Extensible API To Build In-App Messaging

Chatkit is a hosted API that helps to build awesome chat features for application.

Chatkit has a minimal but powerful API that manages all of the chat data.

#### Create an instance

#### Integrate into App

![jietu20190127-135514](https://user-images.githubusercontent.com/31902939/51805437-32ab1b00-223b-11e9-9678-d56be7b69619.jpg)

There will be public and private rooms with simple authentication mechanism.

The "online presence" feature will display which users are online or offline in rooms or across whole chat application.

The "read cursors" feature displays to users how far they have read the conversation.

The "typing indicators" feature shows users when someone else is typing in room. 

Using cross-platform SDKs, all chat data is sent to hosted API where we manage chat state and broadcast it.

## Tasks

Generally speaking, take new messages and update the React state.(Take chat data and render it for the user)

Most of the code involves hooking up Chatkit events and their associated data to React UI components.

### Create Chatkit Instance

To create a Chatkit instance, go to [here](https://dash.pusher.com/authenticate?utm_source=github&utm_campaign=build-a-slack-clone-with-react-and-pusher-chatkit&redirectTo=%2F%3Futm_source%3Dgithub%26utm_campaign%3Dbuild-a-slack-clone-with-react-and-pusher-chatkitand) At the dashboard hit 'Create new'.

Remember: Instance Locator and Secret Key in the Keys tab.

### Set up Node server

Since most interactions will happen on the client, Chatkit needs a server counterpart to create and manage users.

- [x] Installing @pusher/chatkit-server: npm install --save @pusher/chatkit-server 

#### Update server.js 

- [x] 1. import Chatkit from @pusher/chatkit-server

- [x] 2. instantiate chatkit instance using the Instance Locator and Key.

- [x] 3. In the /users route, create a Chatkit user through our chatkit instance.

- [x] 4. When someone first connects to Chatkit, a request will be sent to /authenticate to authenticate them. The server needs to respond with a token (returned by chatkit.authenticate) if the request is valid.

### Identify user

Once the user hit Submit button after entered the username, the system will send the username to the server and create a Chatkit user if one doesn't exist.

- [x] To collect the user's name, create a component called UsernameForm.js in in ./src/components/  

#### Update App.js

- [x] 1. Import the UsernameForm component. It uses a common React pattern called controlled components.

- [x] 2. In the render function, render the UsernameForm and hook up the onUsernameSubmitted event handler.

- [x] 3. When onUsernameSubmitted is called, send a POST request to the /users route we just defined. If the request is successful, update this.state.username to make possible to reference it later. Otherwise, console.error the error.

Run the application using npm start and see if the screen is rendered.

### Render chat screen

Once the username has been submitted, transit to he chat screen. 

- [x] -> Need to create a ChatScreen.js component in ./src

#### Update App.js

Rather than use a router, conditionally render the screen based on this.state.currentScreen

### Connect to Chatkit instance

- [x] Install @pusher/chatkit-client: npm install --save @pusher/chatkit-client

#### Update ChatScreen.js

- [x] 1. Import Chatkit

- [x] 2. Instantiate Chatkit ChatManager with our instanceLocator, userId and a custom TokenProvider. 

- [x] 3. Once ChatManager has been initialised, call connect. connect happens asynchronously and a Promise is returned. 

### Create a Chatkit room

By using Chatkit, all messages will be sent to a Chatkit room.

Rooms can be created programmatically or in the dashboard Inspector.

Important: note the unique Room id 

### Create UI layout

Break down each feature into independent.

#### React components:

- [x] WhosOnlineList.js; MessageList.js; TypingIndicator.js; SendMessageForm.js

### Subscribe new messages

After having a Chatkit connection, continue building chat features.

- [x] Create a stateless MessageList.js component in ./src/components

#### Update ChatScreen.js

- [x] 1. Once connect to Chatkit, will get a currentUser object that represents the current connected user

- [x] 2. Chatkit is "user-driven" -> not all interactions happen on the currentUser, so call subscribeToRoom on the currentUser (currentUser.subscribeToRoom)

- [x] 3. subscribeToRoom takes an event handler called onMessage that is called in real-time each time a new message arrives

- [x] 4. Specified the messageLimit, onMessage is called retroactively for up to 'messageLimit' recent messages, which means after refreshing the page, will see up to 'messageLimit' recent chat messages.

### Send messages

- \[x] To allow users to send messages -> create a SendMessageForm.js component in ./src/components

#### Update ChatScreen.js

The SendMessageForm component should be similar to theWhatIsYourUsernameForm component defined earlier.

- [x] After the SendMessageForm is submitted, access this.state.currentUser and call sendMessage.

ChatScreen is a container component that manages application state and renders the UI using components. 

### Add realtime 'typing indicators' feature

With the help of Chatkit API, will be able to add 'typing indicators' with little effort.

- [x] Create a TypingIndicator.js component in ./src/components

#### Update ChatScreen.js

By using Chatkit API, 'typing indicators' breaks down to two fundamental actions:

1. Calling currentUser.userIsTyping when the current user starts typing.

2. Listening to userStartedTyping and userStoppedTyping events

If the service doesn't receive a userIsTyping event after a few seconds, Chatkit API assumes the currentUser has stopped typing. 

Therefore, there is no need to manually raise an event when someone stops typing.

### Add 'online presence' list

- [x] Use Chatkit's "online presence" feature to render a list of users and their real-time online status.

- [x] Create a WhosOnlineList.js component in /src/components

#### Update ChatScreen.js

- [x] Manage the state of users in currentRoom.users.

As users connect and disconnect, state is dynamically updated. 

- [x] currentRoom.users should always refelect the current state of your chat app.

Therefore, when users come online or go offline (onPresenceChange), or new users join (onUserAdded)

- [x] -> Call forceUpdate which tells React to evaluate currentRoom.users and update the UI.
