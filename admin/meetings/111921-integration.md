# Team Name: Team 14 (Heart Bakers)
## Meeting Type: Integration meeting
## Meeting Subject: Integrating frontend and backend
## Location: Zoom (with half in person at Geisel)
## Starting Time: 12:30p
## Attendance List
### Members Present
            1. Kyle
            2. Milan
            3. Harini
            4. TJ
            5. Mikayla
            6. Maddie
            7. Laurence
### Members Absent
            1. None
## Agenda
### Unfinished Business
        - [Function Planning Doc](https://docs.google.com/document/d/1I_feKU0S8iDBoYG0beQbXIUeXc4EyrlqUrdJ6Eq_Smc/edit?usp=sharing)
        - Pipeline progress
            - waiting on Ashritha for jsdocs but can continue without it
            - will explain pipeline and codacy, linter so people can understand
### Business for Today
        - Minor notes
            - Front end doesn't have any button/event listeners set up
            - backend will only use javascript
            - type of ID to use for user and rec recipes (timestamp?)
        - jquery will have to be put into frontend html
        - Features
            - Homepage
                - one recipe json will be pulled from recommended list
                - clicking on recipe will open recipe pop up with rec page in back
                - **functionA**: return one random json recipe
                - **functionB**: given ID of recipe, can return json
            - **JSONReadingFunctions**
                - functions to retrieve individual info from jsons
            - Recommended Recipe Pop Up
                - same JSON stuff
                - **functionC**: "Add to my own list" button should add recipe to my recipes list
                - will need to transfer from API to local storage
            - Recommended Recipe List Page
                - **functionD**: load all 100 recipes at once
                    - cards are just picture and title
                - **functionE**: search from rec recipes by prefix
            - User Recipe List Page
                - same concept as rec recipe page
                - **functionF**: return all user recipes
                - **functionG**: give ID, return json recipe
                    - specific needs outlined in doc
                - **functionH**: ?
            - Create/Edit 
                - **functionI**: make ingredients array of arrays
                - **functionJ**: create recipe by things detailed on doc
            - Delete Window
                - **functionK**: provided ID, delete recipe from database
            - Grocery List
                - put ingredients on list when "Add to list" pressed
                - Once everything all checked off, list should clear
                - **functionL**: return up to date grocery list
                - **functionM**: update list
            - Tracker
                - when "just made" clicked, tracker is incremented
                - **functionN**: updates tracker and last made date
### For Next Time
        - On doc highlight which features need to be done by Sunday to have CRUD features done by deadline
        - Videos
            - one per sprint (only need first one for now)
            - TJ will make it
            - screen record going through skeleton of app
            - frontend, backend, pipeline, challenges
            - look at retrospective file in meeting notes
## Decisions Made
    - Kyle, TJ, and Laurence will meet in person today to collaborate on the recipe cards.
    - add linter to other branches so front and back end can make those fixes before merging to main
    - TJ will take the lead on the video because he is most familiar with the skeleton 
## Ending Time: 1:58pm
