The following is the overall status for our CICD pipeline.

[pipeline image](/admin/cipipeline/phase1.png)

From the diagram above we have completed the JSDocs portion for the Documentation Generation for our code. This will produce in the index.html file a documentation of all the function in every javascript file in our repository after we git push the changes/code.
We have also completed the codacy portion which will produce a review analysis of the code quality of the pushed javascript code files. Codacy also use to manage information about the files, issues, pull request, code patterns, etc. There will be human code reviews in addition to codacy once the code has been pushed.
We are currently working on linting, specifically using the ESlint application on VSCode. We are facing troubles with this application, so we may look into using another tool for linting.
In the future for the next phase we will be working on automating the unt testing process potentially using Jest. We will incorporate automating Merging with production and deployment into github actions. We also plan on creating multiple iterations in the pipeline after git push, i.e. we have code review and unit testing then a pull request for staging, then merge with staging, then code review and unit testing, then deployment to staging then the same cycle over again but with production rather than staging.