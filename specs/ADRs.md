Architectural Decision Records

1. Storage for User Receipes
    We have explored the options of using indexedDB and creating a server for storing user recipes, but we have decided to just use localStoage, although 
    it is limited in space, it is rather easy to implement for our current proof of concept. In response to this, we would have to upload user images to 
    other third party services, and store the link to the image in the recipe object.
2. Receipe Searching
    We want to implement a tag system in which the user would be able to filter out the recipes by tags; at first we want to store these tags into the
    as an attribute for the recipe. But in order to retrieve them, we would have to iterate through all of the recipes one at a time which is not  
    efficient. Thus we have decided to create a key that access a JSON object with a list of all of the tags, within those tags are stored a list of all of
    the recipes that share that tag.
3. 
    
