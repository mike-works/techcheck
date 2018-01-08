<p align='center'>
  <a href="https://mike.works" target='_blank'>
    <img height=40 src='https://assets.mike.works/img/login_logo-33a9e523d451fb0d902f73d5452d4a0b.png' />
  </a> 
</p>

<p align='center'>
  <a href="https://travis-ci.org/mike-works/workshops" title="Build Status">
    <img title="Build Status" src="https://travis-ci.org/mike-works/workshops.svg?branch=solutions"/>
  </a>
  <a title='GreenKeeper'>
    <img title='GreenKeeper' src='https://badges.greenkeeper.io/mike-works/workshops.svg'>
  </a>
</p>

<p align='center'>
<b>TechCheck</b> is a utility that we use for <a title="Mike.Works" href="https://mike.works">Mike.Works</a> <a href='https://mike.works/courses'>software engineering training</a> to help guide students toward getting set up with the proper dependencies.
</p>

## How it works

Most of techcheck requires [Node.js](https://nodejs.org/en/) to run, but to ensure that node itself is installed, we have users run a shell script (or poweshell script for windows users)

##### Linux, OS X, Windows 10 w/ Linux Subsystem

```sh
curl -o- https://raw.githubusercontent.com/mike-works/workshops/master/packages/techcheck/shell/check-node.sh | bash
```

If you want, you can see some details describing what's going on by setting the `DEBUG_SHELL` environment variable as the script is run

```sh
curl -o- https://raw.githubusercontent.com/mike-works/workshops/master/packages/techcheck/shell/check-node.sh | DEBUG_SHELL=true bash
```

&copy; 2018 [Mike.Works](https://mike.works), All Rights Reserved
