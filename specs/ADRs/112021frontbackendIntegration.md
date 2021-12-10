# Frontend and Backend Integration

* Status: accepted <!-- optional -->
* Deciders: Kyle, Shawn, Laurence, Sam, Robin, Harini
* Date: 11/20/21

## Context and Problem Statement

Backend and frontend have been working seperately for the first part of the development process. Going forward, we need a method for frontend to access the backend 
functions. 

## Considered Options

* Copy over backend functions over the frontend scripts
* Let backend handle all of the scripting functions
* Have a seperate file for frontend and backend, and have frontend scripts access backend functions. 
* … <!-- numbers of options can vary -->

## Decision Outcome

Chosen option: We are creating a hierarchy folder system in which, we have a older for frontend HTML and CSS files; another folder for frontend scripts that will 
integerate between front and backend, it would import all of the functions from backend. Backend has a folder that contains all of the functions to access the
database.

### Positive Consequences <!-- optional -->

This is a more scalable architecture for future iterations that has other needs for other functions

### Negative Consequences <!-- optional -->

It takes time to est up the folder systems. It took some time for us to understand how to import functions.
