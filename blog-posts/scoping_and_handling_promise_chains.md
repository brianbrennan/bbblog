<meta>
{
    "title": "Scoping and Handling Promise Chains",
    "tags": ["javascript", "es5", "es6", "web development",  "node"],
    "publishDate": "2015-12-16T00:00:00-05:00"
}
</meta>

If you're a developer that uses JavaScript regularly, you've most likely come across the joy and sometimes headache of promises. There's pretty much no way to get around using them in today's day and age. You need data from somewhere else. That's going to take time. Promises needed. blah blah blah. Well, once you've wrapped your head around HOW THEY WORK (which I'm not really going to go into in this article), you're probably wondering what the best way to write them is. I mean, it's pretty easy to get bogged down in super nested syntax, unsure of what is actually happening in what order. Libraries like Q are built to make this a lot easier. They have chaining built in, so that  you can list out in your code what order things should execute in. So if you want to call a weather api, read the results, compile some data, and then write it to your own api, you might be able to do that like this

``` JavaScript
     const  Q = require('q'),
               Forecast = require('forecast'); //Forecast is an npm library

     //blah blah some set up stuff

     //set up a promise based on a request we want to make
     let getWeatherStuff = new Q(forecast.get(...));

     getWeatherStuff
          .then(_privates.readResults())
          .then(_privates.compileData())
          .then(_privates.writeToDB());
```

Pretty easy and straight forward right? Actually, no. This won't work. Or at least not as intended. Even though our then blocks are chained appropriately, they need to have function references, not calls, in order to work as intended. We can't guarantee the order of our calls succeeding this way. It's likely that readResults, compileData, and writeToDB will finish before our very first call. Well that's not at all what we want. Well, how about we use references instead? That should be easy

``` JavaScript
     getWeatherStuff
          .then(_privates.readResults)
          .then(_privates.compileData)
          .then(_privates.writeToDB);
```

Cool! This will work as intended. Functions will be called in the order that they are listed in the chain. Awesome... except this method has a limitation. Notice how our functions originally had no params needed? Well, the reason that these functions need to be chained together is because they will be touching the same data, presumably. Well that should work, we can just set a variable in whatever module we're in, and our functions can just access it and manipulate it when needed. But what if you're running this on a node server. You don't want the same variable being set by multiple people using your server at the same time. Uh oh, things are beginning to get a bit complicated. Well that's alright, what we can do is just wrap our function calls inside of anonymous functions.

``` JavaScript
     getWeatherStuff
          .then((weatherStuff) => {
               return _privates.readResults(weatherStuff );
          })
          .then((readResults) => {
               return _privates.compileData(readResults );
          })
          .then(((compiledData) => {
               _privates.writeToDB(compiledData );
          });
```

So this would work, but... it looks pretty ugly and cumbersome. It also doesn't cover the fact that we don't want our functions to be so reliant on each other. They can only be called in a particular order in this case, and are very reliant on their previous calls. Overall, it gets the job done, but doesn't seem like the best solution. One way to make it a bit prettier, is to use something that I've seen called a "resultBag". What this effectively is, is a temporary data object that's meant to be the store for all data in your chain. Each function will have access to the resultBag through it's params, and returns it to the next link in the chain. You could effectively write it the same as the code two iterations ago, but the logic inside your functions would have to be reliant on the result bag.

``` JavaScript
     getWeatherStuff
          .then(_privates.readResults)
          .then(_privates.compileData)
          .then(_privates.writeToDB);

     function readResults(resultBag) {
          //manipulates the resultBag by adding some params, and passing it along
          return resultBag;
     }
```

Do you see the problem with this? We've seemingly decoupled our functions from being in a particular order, except not really. The resultBag is just an abstraction level that is hiding our data being set inside of it. So to reference particular data, we still need to be sure that our functions are being called in the correct order. On top of that, we've limited the amount of obvious purpose that our code should convey, by making our function parameters fairly arbitrary. I can say from experience, that this also makes debugging a pain, since you can only really see what's inside the resultBag during runtime. It also makes your code less reusable, because it expects to be dealing with a resultBag that matches what it's original purpose was. Same thing for testing; you'd need to mock out a full resultBag or each individual unit test. Turns out this issue isn't really as straightforward as it would seem.

This is where binding becomes very useful. We are going to want to bind the context of the current request, so that we know that every request gets treated special, and won't overlap with each other. There's a bunch of ways that this can be done. One way is instancing a class during every request, and scoping all needed information to said class. In this way, each function actually doesn't need any parameters, and can instead access variables scoped to 'this';

```JavaScript
class WeatherHandler {
     constructor() {
          this.weatherStuff = null;
          this.results= null;
          this.compiledResults = null;
     }

     readResults() {
          //manipulate this.results
     }
}

//and then within each request, instance WeatherHandler
router
.get((req, res, next) => {
       let weatherHandler = new WeatherHandler();
       weatherHandler.getWeatherStuff()
               .then(weatherHandler.readResults);
 });
```

This should take care of all the issues that we had beforehand. It looks much better, it behaves how we want it, it scopes our requests well, and handles our promises. Obviously this is an ES6 solution. And this might not be something you can implement in your project. I've worked on large Node projects where implementing ES6 features (which were slightly less adopted at the time) wasn't an option. Is there a way to implement this in ES5, or maybe even just without classes. well, you can scope  your functions to a local variable via the bind function. It has a similar issue as the resultbag, but it allows you to have the benefit of seeing your params when your function is called, and allows you to have different parameters for all your functions.

```JavaScript
     var scope = {};
 getWeatherStuff
          .then(_privates.initializeScope.bind(scope))
          .then(_privates.readResults.bind(scope, scope.results))
          .then(_privates.compileData.bind(scope, scope.dataToCompile))
          .then(_privates.writeToDB.bind(scope, scope.dataToWriteToDB));
```
This should (roughly) also accomplish the same thing. It's not quite as elegant as the previous ES6 version, but it effectively is doing the same thing. Every call of your function can be bound to have `scope` set to `this`. It also allows your functions, like readResults, to only have a parameter for what it actually care about. The point of all of this is to show that this isn't a super straight forward thing to solve, and that promises in general are hard to deal with, even after you understand how they function.


