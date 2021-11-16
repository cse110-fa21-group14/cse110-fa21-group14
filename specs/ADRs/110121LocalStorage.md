

# LocalStorage to store userRecipes

* Status: accepted <!-- optional -->
* Deciders: Kyle, Shawn, Laurence, Sam, Robin, Harini
* Date: 11/1/21

## Context and Problem Statement

Storage for User Receipes We have explored the options of using indexedDB and creating a server for storing user recipes, 
but we have decided to just use localStoage, although it is limited in space, it is rather easy to implement for our 
current proof of concept. In response to this, we would have to upload user images to other third party services, and 
store the link to the image in the recipe object.


## Considered Options

* IndexedDB
* Server
* LocalStorage
* … <!-- numbers of options can vary -->

## Decision Outcome

Chosen option: "localStorage", because it would be the simpliest to implemented for proof of concept
### Positive Consequences <!-- optional -->

Access to localStorage would be very direct, and we could implement store and edit very easily. Could support any many users as possible

### Negative Consequences <!-- optional -->

Limited space in localStorage and we need to look for other ways to store images.
