


# {Receipe Searching Being implemented with an additional JSON file}

* Status: {accepted} <!-- optional -->
* Deciders: Kyle, Shawn, Laurence, Sam, Robin, Harini
* Date: 11/14/21

## Context and Problem Statement


{We want to implement a tag system in which the user would be able to filter out the recipes by tags; 
at first we want to store these tags into the as an attribute for the recipe. 
But in order to retrieve them, we would have to iterate through all of the recipes one at a time which is not
efficient. Thus we have decided to create a key that access a JSON object with a list of all of the tags, 
within those tags are stored a list of all of the recipes that share that tag.
}

## Considered Options

* {Iterat through all of the recipes to look for tags}
* {Create boolean tags for all of the recipes}
* {create seperate JSON file for the tags}
* … <!-- numbers of options can vary -->

## Decision Outcome

Chosen option: "Create seperate JSON file for the tags", because it would cut the run time to be as short as possible.

### Positive Consequences <!-- optional -->

We cannot get any faster with retrieving recipes with those tags

### Negative Consequences <!-- optional -->

Added space complexity for the localStorage
