# z-presentation

Code for the talk given at Sthlm.js 25 February 2014.



### Promises in and out

The code in the folder `promises-in-out` demonstrates five different ways of writing code to achieve the same task. We assume that we can communicate with a blogging API via POST and GET requests and then do the following:

- Create a blog
- Create two blog entries
- Create some users
- Create some comments from those users, on the two posts
- Request the stats for the blog and check if the given number of entries and comments are correct

The code also contains a method called `concatUrl` which simply combines the given strings into an url path.



### Promises between

In the folder `promises-between` there are examples on how Z does deep resolution, wraps functions to accept promises and enables mixins.


### The Z-library itself

Go here: [Z](https://github.com/jakobmattsson/z-core)


