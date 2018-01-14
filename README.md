<p align='center'>
  <a href="https://mike.works" target='_blank'>
    <img height=40 src='https://assets.mike.works/img/login_logo-33a9e523d451fb0d902f73d5452d4a0b.png' />
  </a> 
</p>

<p align='center'>
  <a href="https://travis-ci.org/mike-works/techcheck?branch=master" title="Build Status">
    <img title="Build Status" src="https://travis-ci.org/mike-works/techcheck.svg?branch=master"/>
  </a>
  <a href="https://ci.appveyor.com/project/mike-north/techcheck" title="Build Status">
    <img title="Build Status" src="https://ci.appveyor.com/api/projects/status/13gtmp1ha2dvjfyp?svg=true"/>
  </a>

  <a title='GreenKeeper'>
    <img title='GreenKeeper' src='https://badges.greenkeeper.io/mike-works/techcheck.svg'>
  </a>
</p>
<p align='center'>
<b>TechCheck</b> is a utility that we use for <a title="Mike.Works" href="https://mike.works">Mike.Works</a> <a href='https://mike.works/courses'>software engineering training</a> to run pre-flight checks, ensuring attendees are set up with the right versions of the right software.

<img width="557" alt="screen shot 2018-01-13 at 6 22 33 pm" src="https://user-images.githubusercontent.com/558005/34912169-c8db2ea8-f88e-11e7-9361-5c8cdb1f9630.png">
</p>

---

## How it works

Most of techcheck requires [Node.js](https://nodejs.org/en/) to run, but to ensure that node itself is installed, we have users run a shell script (or poweshell script for windows users)

##### Linux, OS X, Windows 10 w/ Linux Subsystem

```sh
curl -o- https://raw.githubusercontent.com/mike-works/techcheck/master/packages/techcheck/shell/check-node.sh | bash
```

If you want, you can see some details describing what's going on by setting the `DEBUG_SHELL` environment variable as the script is run

```sh
curl -o- https://raw.githubusercontent.com/mike-works/techcheck/master/packages/techcheck/shell/check-node.sh | DEBUG_SHELL=true bash
```

&copy; 2018 [Mike.Works](https://mike.works), All Rights Reserved
