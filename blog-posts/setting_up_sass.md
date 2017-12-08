<meta>
{
    "title": "How to Set Up Sass for Your Workflow",
    "tags": ["professional development", "sass", "web development", "front end development"]
}
</meta>

# How to Set Up Sass for Your Workflow

Today I’m going to be teaching you how to set up Sass in your web development workflow. Sass is an incredibly powerful language for preprocessing websites, and I use it in pretty much every project I work on. But while Sass is fairly straightforward and easy to use, setting it up can be a bit of a pain. When I first tried getting Sass into my work flow, I remember I had tons of questions, and wasn’t really sure where to start. I hope in this video I can answer a lot of the questions you have about setting up Sass for your workflow, so that by the end, you’ll have it ready to go for your next project.

## So What Exactly is Sass?

Sass is a CSS Preprocessor. What that means is that you write Sass into your text editor of choice, and then run compilation on that Sass, and like a butterfly turning back into a caterpillar, you will get a CSS file. See while Sass is amazing, it isn’t readable by any modern web browsers. So you need to output the Sass you write to CSS, or else it’s pretty much unusable.

Now when I first started using Sass, I needed to first set up Ruby, the language that Sass was originally written in, before getting Sass up and running. But that is not necessary any more, and having Ruby Sass is actually not ideal for our workflow. If we were to use Ruby sass for our compilation task, it would take a long time. I’m stating that in terms of computers. You might not notice it at first, but once you get large files and try to compile them with Ruby Sass, it can take several seconds to complete. That might not sound like a lot, but when it’s happening once every few minutes, trust me, it adds up.

So we are going to be using [libSass](http://sass-lang.com/libsass), which is Sass written in C++. The main difference between normal Sass and libSass is that libSass is a lot faster. And I mean a lot. [Benchmarks show compilation speeds to be about 25x faster with libSass](https://www.solitr.com/blog/2014/01/css-preprocessor-benchmark/). So that saves us time with installation, and time with our compilation.

In order for us to use Sass seamlessly in our workflow, we’re going to want to integrate it with a task runner of some sort. The reason for that is while I could show you how to simply compile Sass, that isn’t really setting it up. You aren’t going to want to run a command every time you want to compile your Sass, to see the results. So instead, let’s set up a task in a task runner that will compile our Sass for us, and will compile again every time we save our file.

## Setting Up Our Taskrunner

Now if you’ve never used a task runner, or npm, or node, or you’ve never even heard of such things, well this will be a crash course in all of those. You might be asking yourself, why do I have to install all of this other garbage just to write Sass. Trust me, this is the right way to go.

The first step we’re going to want to do is install Node. You’re going to want to go to this link [here](https://nodejs.org/en/), and follow the directions to install it. Now Node is basically just javascript that doesn’t have to run in a web browser. It’s a great tool for web developers, since web developers already know javascript for the most part. It also is the language used to run the largest package distribution network. NPM.

## What's NPM

NPM stands for Node Package Manager, sort of. I remember reading somewhere that it doesn’t actually stand for that, kind of like how KFC is just KFC, but most people will refer to it as that, or just npm. Now NPM comes prebundled with Node, so you don’t have to go out and get it anywhere.

PM let’s developers share projects, called packages, so that other developers can use them fop their projects. It is also what my task runner of choice, and the software we are going to use to get Sass up and running, runs on.

Grunt is an awesome tool for web developers. It is the backbone of your workflow. It let’s you create and execute “tasks”, which are basically jobs that you want done automatically, so that you don’t have to think about them.

We need to use NPM to install grunt, along with sass. We’re going to need to jump into our command line application to get this running. If you’ve never used a command line tool before, don’t worry, it won’t bite. It’s something you should learn how to use eventually. and this is as good a time as any to get started.

## Working in the Command Prompt

If you’re on windows, open command prompt, open terminal. For windows, all you have to do is go to your start screen or tab, and type in command prompt. click it and you should see this black box pop up.

On mac, terminal can be found under applications, and then utilities. Click it to open it and you should see something similar to windows.

Now we’re going to want to set up a folder for our project we’re going to use Sass on. If you’re command line doesn’t say that you’re on the desktop, then navigate to it by typing cd, and the address of your desktop. To get this, you can go to either explorer or finder, and copy it from the address bar at the top. We can make this folder pretty much anywhere, but since it’s your first time, doing it on the desktop will just let you access and see your work more easily. But feel free to make your folder elsewhere. To make your folder, type

```
mkdir {the name of the directory your want to create}
```

then type
```
cd {name of the directory you created}
```

This is where we are going to set up our project. To set up an NPM project, type
```
npm init
```

You’ll get a bunch of prompts here for your project name, and a lot of other stuff. feel free to fill these out as you please, but a lot of it isn’t necessary. You’d want to make this as robust as possible for a production level project, but for now, it’s fine.

Now we’re going to open that folder in our text editor to see what we just did. If you drag your folder to your text editor, in this case I’m using sublime text 2, you’ll see a file called package.json. This is where all of the information on your project is going to be, including the dependencies needed for this project. This is where we are going to declare our dependency for grunt and Sass. but we don’t have to type it out here, there’s an easier way to do it. Let’s go back to our command line and start installing our dependencies. The first thing we’re going to want to install is grunt. It’s really easy to install. Type

```
npm install grunt --save-dev
```

to install. All that command is doing is telling npm, to install, a package, in this case grunt, and save it as a development dependency. You can also do just --save instead, but that will save it as a normal dependency, and since grunt is something we will be using in our development workflow, rather than our production level deployment, it’s better to leave it as a devDependency.

So you’ll see a lot of stuff come up. As long as stuff doesn’t look horrible and red, it means that it worked ok. If you got some sort of error message, make sure you installed node properly in the last step.

## Downloading Sass

Now we’re going to download Sass. Finally right? In your command prompt, type

```
npm install grunt-sass --save-dev
```

Now you’re probably thinking, grunt sass? I thought we were just going to be using normal sass, and then you mentioned libSass. Well grunt sass is a wrapper around libSass that we’ll use in our grunt tasks. We’re going to want to install one last dependency for our Sass compilation worflow, and that’s watch. Watch will let grunt automatically do our tasks when we save our files, so that we can just have it run in the background while we work. To install watch, type

```
npm install grunt-contrib-watch --save-dev
```

If you go back to your text editor, and look at that package.json file, you’ll notice that it has those dev dependencies written out, along with the version number of the software you just downloaded. Because of this, you won’t have to do the steps we just did when you want to make a new project. Instead, you can just take this package.json file, bring it to a new project, edit the information about the project, and simply type

```
npm install
```

in the command prompt. in the command prompt. The stuff we just downloaded will then automatically be added to the new project. Now we’re going to want to configure grunt for our workflow. Grunt needs to be told what to do via a javascript file called gruntfile.js. Below is the file that you would use for what we want to do

```
//Gruntfile.js
```

## Last Steps

Now we have just one last step before Sass is fully functional in our project. Back in the command line, we’re going to want to install the grunt command line interface, or CLI, or cli, so that we can just run grunt and forget about it. to do this type

```
npm install grunt-cli -g
```

The -g means it will be installed globally on your machine. If you’d prefer, you can also just install it on your project, and save it with --save-dev instead of -g, but if you are going to be using grunt a lot in the future, it may be beneficial to have it installed globally, to save you a step in the future.

And that is that. Grunt and sass are now ready to go on our projects. Simply type grunt into your command line, and your task runner will start working. Let’s test it out with writing some Sass.

## Conclusion

Alright guys I hope this was informative and gives you started with Sass in your workflow. Lot’s of developers have similar set ups to this for writing styles for web sites. Some people prefer a different task runner called Gulp, but it is very similar to grunt.

Until next time!