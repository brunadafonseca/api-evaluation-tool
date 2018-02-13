# Evaluation tool

This project was the final assignment for Codaisseur Academy.

![main page](http://bit.ly/2o4oBG9)

![student page](http://bit.ly/2EZXhRl)

The app is intended for teachers to keep track of students performances everyday.

### User stories for this project:

+ As a Teacher I can sign into the tool with my email and password to start using it
+ As a Teacher, after I signed in, I see a (list of) current classes, identifiable by their Batch number, start date, and end date.
+ As a Teacher, I can create a new class by giving it a Batch number, start date, and end date.
+ As a Teacher I can add, edit, remove students in a class. To add a student I need to provide: 1) their full name, 2) (a link to) their profile picture.
+ As a Teacher, I can click on a class, after which I see a grid of all the students by their name and photo, and the last color code given to them. Above the students grid, I see a bar with 1-3 segments, showing me the percentage (%) of students evaluated GREEN, YELLOW, and RED.
+ As a Teacher, when I click on a photo or name, I can click on GREEN, YELLOW, or RED, fill in the date (defaults to today), and a remark. When I click “Save” it saves my evaluation, and takes me back to the student overview, when I click “Save and Next” it saves and shows me the next student.
+ As a Teacher, when I look at a student’s page, I can only fill in one evaluation per student per day. I can edit my own evaluations.
+ ALGORITHM PART! As a Teacher, from the class view I can click a button “ASK A QUESTION”. It shows me the name and picture of a random student to ask a question. Not entirely random though: RED students get ~47% of the questions YELLOW students ~32%, and GREEN students ~21%.

Make sure you have [MongoDB](https://www.mongodb.com/)

```bash
git clone git@github.com:brunadafonseca/api-evaluation-tool.git
cd api-evaluation-tool
yarn install
yarn run seed
yarn start
```

For the front end:

```bash
git clone git@github.com:brunadafonseca/react-redux-evaluation-tool.git
cd react-redux-evaluation-tool
yarn install
yarn start
```
