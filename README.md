### [View Deployed Website Here](https://colins-capstone-1558565262749.firebaseapp.com/)
<br>
<br>
<br>

<img src="https://firebasestorage.googleapis.com/v0/b/colins-capstone-1558565262749.appspot.com/o/iFeel_Branding-04.png?alt=media&token=418a7273-3eff-4864-bcb7-9842ce9b6108" alt="i-Feel-Branding-08" border="0" width="500px">

# Project Summary
I created Regulate to help both clients and therapists as they work together to improve their mental health. My wife is a therapist and together we realized the need for an intuitive, intelligent application to help clients track data, recall coping techniques, and find support. Over time, this data can make a significant impact in how clients progress and manage their unique situations.
+  A single-page app built in React with full CRUD functionality and dynamically routed via React-Router
+  Uses Firebase for authentication, allowing each feature of the app to be tailored to a specific user
+  Stores user “check-ins” and fetches coping mechanisms from a Firebase REST API based upon user input
+  Utilizes Moment.js and Chartsjs to track entries over time and display data visualization
+  Allows users to search for therapists nearby and display results on a map using Leafletjs and Herejs
+  Incorporated Reactstrap for modal creation and custom CSS styling for all other components.
+  Discreetly sends email notifications to user-selected contacts, telling those contacts to check in on the user after five   	   negative check-ins within one week



## Project Proposal

[View Google Doc](https://docs.google.com/document/d/1hx2exdDvMSnio_MYhV2RXHVlyCpPb_XdiCsZ8tdegUA/edit#)

## Entity Relationship Diagram

[View DBDiagram](https://dbdiagram.io/d/5cf7d48209a99609d6145183)

## Presentation Slide Deck

[View Google Slides](https://docs.google.com/presentation/d/1AIGo8jwkh9_ope02wSmrANzGzXexeoEO2qPqWrn-6lI/edit?usp=sharing)


## Quick overview of Regulate

#### (1/6) Login or Register as a New User
Since everything in this application is confidential and catered to individual users, one can login or register using Firebase Authentication.

<img src="https://firebasestorage.googleapis.com/v0/b/colins-capstone-1558565262749.appspot.com/o/Screen%20Shot%202019-07-01%20at%2010.02.57%20AM.png?alt=media&token=a9dcce2f-d443-4556-b38c-7eaedd08571e" alt="login screen" border="0">

#### (2/6) Checking in
Ideally, a user "checks-in" 4-5 times a day, whenever they encounter either positive or negative emotions.

<img src="https://firebasestorage.googleapis.com/v0/b/colins-capstone-1558565262749.appspot.com/o/Screen%20Shot%202019-07-01%20at%209.54.44%20AM.png?alt=media&token=98547273-1f1e-4692-ba1e-9249aa23f0d2" alt="checkin screen" border="0">

#### (3/6) All Check-ins
This log of all of the user's checkins serves two purposes: It helps remind the client of talking points in their therapy sessions, and it helps inform the statistical portion of the application.

<img src="https://firebasestorage.googleapis.com/v0/b/colins-capstone-1558565262749.appspot.com/o/Screen%20Shot%202019-07-01%20at%209.55.00%20AM.png?alt=media&token=b692919d-a6af-43f4-81c2-bfa087c06b25" alt="view all checkins screen" border="0">

#### (4/6) Coping Mechanisms
Based upon the most recent check-in from the user, this page conditionally renders coping mechanisms that the client and therapist have worked to identify. There is also the ability to upvote or downvote the coping technique in order to show what is working or not working over time.

<img src="https://firebasestorage.googleapis.com/v0/b/colins-capstone-1558565262749.appspot.com/o/Screen%20Shot%202019-07-01%20at%209.55.15%20AM.png?alt=media&token=acd48e8f-f77e-43d8-be7e-e895dd6a2795" alt="coping mechanisms screen" border="0">

#### (5/6) Statistics
One of the most important features of the app is the ability to track data over time to see if the client is progressing. 

<img src="https://firebasestorage.googleapis.com/v0/b/colins-capstone-1558565262749.appspot.com/o/Screen%20Shot%202019-07-01%20at%209.55.31%20AM.png?alt=media&token=2908c0a6-942b-4a6d-ac13-11575aa00ab9" alt="statistics screen" border="0">

#### (6/6) Support
The support page allows the user to view their personalized safety plan (required by law) and search for Mental Health Counselors within 20 miles.

<img src="https://firebasestorage.googleapis.com/v0/b/colins-capstone-1558565262749.appspot.com/o/Screen%20Shot%202019-07-01%20at%209.56.21%20AM.png?alt=media&token=a2c0bf15-25ee-4fe8-a3c6-399b82938bf6" alt="statistics screen" border="0">
