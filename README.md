SingAlongWithMe
========

Description
-----------
Karaoke Description


Getting Started
---------------

### Download and Install Git ###
You need git to push and pull from this repo. Install git from (http://git-scm.com/downloads) or use Homebrew:

    $ brew install git

### Install Node.JS ###
Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices. Download it here (http://nodejs.org/) - Current version 0.8.19. Using Homebrew:

    $ brew install node

If you already have node, upgrade it to the latest version:

    $ brew upgrade node

### Install NPM ###
Node.js 0.8+ comes with a package manager for installing node packages. Using npm to install packages on your machine will allow for faster development.

### Verify your Path ###
Ensure that node and npm are in your path.

    $ echo $PATH

If you don't see the folder which contains where Node.js was installed to open your .bashrc file and enter in (assuming your installation of node/npm are in these folders):

    $ export PATH=$PATH:/opt/node/bin:/usr/local/share/npm/bin

### Download and Install Heroku ###
Heroku will be out free deployment system. We are currently alloted 750 hours of "dyno" time per month. Think of a dyno like a process. If you don't currently have Heroku installed on your machine create an account and follow the instructions here to do that (https://toolbelt.heroku.com/). You can test if you have the heroku toolbelt installed by simply typing in heroku into your command line.

  $ heroku


Download Code
-------------

### Clone this Repo ###
Find a directory where you want to store this code and clone this repo in there.

    $ git clone https://github.com/RepublicOfKids/SingAlongWithMe.git && cd SingAlongWithMe

### Install NPM Modules ###
In order to run the server we need to install some NPM package dependencies. This will install these packages locally to folder youre currently in. If you want to install them globally add the argument -g to the npm command.

- Express.js - Express is a minimal and flexible node.js web application framework, providing a robust set of features for building single and multi-page, and hybrid web applications. (http://expressjs.com)
- Socket.IO - Socket.IO aims to make realtime apps possible in every browser and mobile device, blurring the differences between the different transport mechanisms. It's care-free realtime 100% in JavaScript. (http://socket.io)
- Less.js - Less CSS is a templating language for CSS which adds various object oriented programming paradigms to CSS. (http://lesscss.org)
- Jade - Haml inspried HTML rendering for node.js. Ideally this should make typing HTML faster and more efficient. (http://jade-lang.com/)

Thankfully theres only one call you need to make to install all of this.

    $ npm install

### Initalize Heroku ###
In order to start your local server and push to production you will want to intialize Heroku.

    $ heroku git:remote -a singalongwithme

### Start the server ###
After installing all the modules your project should be good to go. Assuming you've installed heroku you can start your server locally with:

    $ foreman start

Your personal sandbox should be located at (http://localhost:5000)
