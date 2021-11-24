# Storing images on Imgur, then storing the URL into localStorage

* Status: accepted <!-- optional -->
* Deciders: Kyle, Shawn, Laurence, Sam, Robin, Harini
* Date: 11/18/21

## Context and Problem Statement

We need to store images for the users, the most direct approach using our current localStorage to store the information in the browser. However, the space on 
localStorage is limited.

## Considered Options

* Directly store images into localStorage
* Set up a server to store images
* Store just the URL of where the image can be found
* … <!-- numbers of options can vary -->

## Decision Outcome

Chosen option: We can use Imgur API for users to upload their images, then the URL generated would be used to display the image. 
### Positive Consequences <!-- optional -->

It is space efficient for localStorage.

### Negative Consequences <!-- optional -->

We would need to rely on third party API to store images, instead of directly storing the images somewhere that we have control over. 
