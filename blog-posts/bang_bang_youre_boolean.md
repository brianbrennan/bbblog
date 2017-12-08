<meta>
{
    "tags": ["Javascript", "js", "es2015"],
    "title": "Bang Bang, You're Boolean"
}
</meta>

# Boolean evalulation in non-strictly typed JavaScript

JavaScript typing is a topic of debate that is currently raging in the world of frameworks. How should things be typed in JS? Should it mimic strongly typed languages? Or should some of the weirdness of JS be embraced and expanded upon with its own syntactic sugar. Well, the jury is still out on that one, but its easy to see for our little runtime-language-that-could has a future involving a much stricter rule-set. But if you don't feel like picking up something like TypeScript or ES6, then there's some cool nuances that are good to have in your back pocket.

## You're just not my type

Boolean typing in JS is a bit weird. And it mainly has to do with how values are read in and subsequently evaluated. If you don't know what truthy and falsey values in JS are, they're basically values that are getting evaluated to a boolean without actually changing the value of the operand. The following values are falsey:

* `false`,
* `0` (zero),
* `''` (empty string),
* `null`,
* `undefined`,
* `NaN`

And here's the values that are truthy

* *Literally everything else*

Seems fairly simple right? If something is "bad" or "doesn't exist", it's `false`. Something that is "good" or "does exist" is `true`. Simple! Well, not quite. Boolean values in JS have some weird nuances involving declaration statements and implementations. Here's a list of some of the annoying ones and how to deal with them.

## -1 is true, even in 0 indexed arrays

This one is a personal pet peeve. I know that there is probably a deeply ingrained reason for this, but it doesn't make it any less annoying. As you can see from the list above of falsey values, the only numerical one is `0` (okay technically `NaN` is as well but shush). If you have some sort of equation or output that equals `0`, then it is considered `false`. This can become problematic when dealing with positioning within arrays. When you want to find the `indexOf` an item in an array, the returned value is `-1` if the item doesn't exist in the array. Remember how I said that things that are "bad" or "don't exist" are falsey? Whelp, not in this case. If you try to search for the letter `"k"` in the word `"fabric"`, and try to evaluate the boolean nature of that statement, it will come out as true. But there's more. If you try to find the position of `"f"` in the word `"fabric"`, you will get the correct position of `0`, the first item in a zero-indexed array, and that statement evaluates as false. Again, I'm sure there's a reason that the gods of programming decided to keep this the way it is, but wouldn't it be much easier if you could just just say

```javascript
if(array.indexOf(1)) {
    //some statement based on truthiness
} else {
   //some statement based on falsiness
}
```

## NaN does not equal itself

A feature of most boolean values is that they have a property of identity. If you were to compare most values to itself within a boolean operation, you'd get `true`. Want to see if something evaluates to `true`? Just compare it to `true`. Trying to check if a property is `undefined`? Just write `property === undefined`. There is a notable exception to this rule, and its name is `NaN`. Not-a-Number is a special Numerical value that is somewhat rarer than other problem children like `undefined` and `null`, but that doesn't mean it isn't tricky to evaluate via `boolean`. Lets say you wanted to do and error check for a specific input that a user has given you. Lets say that by the most perfect storm of terrible inputting, they get a value of `NaN`. How do you check for that? Well surely you should be able to just write `inputValue === NaN`, right? Wrong. `NaN === NaN` evaluates to `false`. It doesn't equal itself. Now, again, I know there's a perfectly good reason as to why this is the case, and relying on `NaN` for error checking is pretty terrible programming, but nonetheless, having weirdness with fundamental values can certainly lead to some hair pulling if you aren't careful.

## Bang Bang, you're a boolean

This nuance is probably my favorite, and its really just because I read the best comment about it when I was trying to figure it out. JavaScript not being strongly typed can definitely lead to comedy. Lets say you have a value, and you want to return its truthiness or falsiness. But what if you're using some sort of linting program that prevents non-strict comparisons? And what if you don't want to return `true` if the value is `undefined`, but `false` if its `null`. Well, there's a slightly obscured, amazing way to say "no, this is a true blue boolean, not some of that pseudo boolean evaluation stuff".

```javascript
!!(x)
```

A `!` character in boolean context basically means "take whatevers after this and make it opposite". The double-bang operator can quickly be described as NOT NOT. As well all know from 3rd grade english class, double negatives aren't the best way to write things, but they do get the job done in this case.

This expression will return true, or false depending on the value of `x`. I'm going to have to give credit to Gus on stack overflow for coming up with the best jingle for this. http://stackoverflow.com/questions/784929/what-is-the-not-not-operator-in-javascript. "Bang Bang, you're boolean". It works bests if you point finger-guns at your screen and make guns noises while running your code by the way.
