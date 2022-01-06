Chatter Box Chat <br>Application<br>ReadME

Connecting to Database
<br>Instructions:<br>

- Open the ‘chatter-box-project folder in Visual Studio Code.
- Navigate to the app.js file.
- Copy/paste in your database connection string.
- The program is set to run on port 3000. Can change to which ever
port you’d like.

Running the Program:<br>
Instructions:<br>
- Open a terminal
- Run node app.
- If an error occurs that says missing dependencies end program
(cntr c) 

Downloading Dependencies<br>
Instructions:<br>

- Navigate to the package.json file.
- Open a terminal and type in npm install followed by the missing
dependencies names then enter.
- Download them one at a time.
- Then run the program again.
- Open your favorite browser and enter http://localhost:3000 in the
address bar.

Navigating Site<br>
Instructions:<br>

- Once the page loads you will be greeted with a login page.
- If this is your first visit you will have to sign up. There is a signup
button located at the top right of the page.

Signing up<br>
Instructions:<br>

- All fields are mandatory. Empty fields will display an error message.
- If you try to enter an invalid email address an error message will be
displayed.
- If an email already exists in the database, you will be greeted with
an error message stating that email already exists.
- Emails must be valid and passwords a minimum of 8 characters
long.
- After successful sign/up you will be directed to the main room.

Log in Errors<br>
Instructions:<br>

- If you try to log in with empty fields an error message will be
displayed.
- Incorrect email and/or password will display an error message.
- Emails are not case sensitive.
- Passwords are case sensitive.
- Passwords are hashed for security.
- Successful log in directs you to the main page.

Successful Signup / Login / Home Page<br>
Instructions:<br>

- A cookie will be added to your browser allowing access to the site
for 24hrs. After logging out the cookie expires and will require a log
in to access the chat again.
- At the top of the sidebar on the left of the page displays online
users. Below that is a list of all contacts in the database.
- While typing the rest of the users are notified with a message.
- To view your own profile, press the View Profiles button top right.
- All messages sent in this room are stored in the database.
- The last message a user sends will be displayed under their name.

Viewing Personal Profile<br>
Instructions:<br>

- While viewing your own profile you have to options to edit and
delete your own profile.
- if you select the edit button you will be directed to the edit page
where you can edit your information.
- If you select the delete button you will be prompt with a message
to confirm the deleting of your account. If you select ok all your data will be deleted from the database and will not be recoverable.

Viewing contacts profiles / access private chat<br>
Instructions:<br>

- To view a contacts profile, click on their name in the contact list
and select view profile. Same layout as viewing your own profile
without the options to edit and delete.
- To enter in private chat where the conversations are not stored in
the data base select private chat and you will be directed to the direct message chat room.

Private chat.<br>
Instructions:<br>

- The private chat room where the user’s conversations are
not recorded to the database.
- This room has the same functionality as the main room.
