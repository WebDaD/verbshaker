# Verbshaker
A Multilanguage / Multi-PROGRAMMING-language verbshaking Project.

We have different branches with different code-languages.

- [Verbshaker](#verbshaker)
	- [What is a Verbshaker?](#what-is-a-verbshaker)
	- [List of Languages](#list-of-languages)
	- [List of Branches](#list-of-branches)
	- [Resources](#resources)
	- [How to Support this](#how-to-support-this)
	- [License](#license)
	- [Install and Start the App](#install-and-start-the-app)
		- [OneLiner](#oneliner)
		- [Native](#native)
		- [Docker](#docker)
	- [Testing / docs](#testing-docs)
	- [TODO:](#todo)


## What is a Verbshaker?
This is simple:
We found out, that in many languages, proverbs consist of two halfes. If you mixe them up, the result can be pretty nice and funny

## List of Languages
* [German](https://raw.githubusercontent.com/WebDaD/verbshaker/master/proverbs/de.csv)
* [English](https://raw.githubusercontent.com/WebDaD/verbshaker/master/proverbs/en.csv)
* [French](https://raw.githubusercontent.com/WebDaD/verbshaker/master/proverbs/fr.csv)
* [Spanish](https://raw.githubusercontent.com/WebDaD/verbshaker/master/proverbs/es.csv)
* ...

## List of Branches
* [master](https://github.com/WebDaD/verbshaker) => node.js + Angular
* mmm (tbd) => MagicMirror² Module
* php (tbd) => Website based on php
* bash (tbd) => Simple BashCommand for Linux
* dpkg (tbd) => installer for Ubuntu with commandline tool
* electron (tbd) => simple app for different architectures
* android (tbd) => native android app
* ios (tbd) => native ios app
* ...

## Resources
Many Thanks to the developers of the Following Stuff:
* [Bootstrap](http://getbootstrap.com/)
* [Angular](https://angularjs.org/)
* [node.js](https://nodejs.org/en/)
* [font-awesome](http://fontawesome.io/)
* [flag-icon-css](http://flag-icon-css.lip.is/)
* [MaterialPalette](https://www.materialpalette.com/green/amber)
* [AndroidAssetStudio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html)
* [RealFaviconGenerator](http://realfavicongenerator.net/)
* [TWBSColor](http://work.smarchal.com/twbscolor/)

## How to Support this
Just checkout something and send a pull-request.  
Or send me a single-language file if you prefer that.  
Or create a nice Logo :-)
Or even buy me a Coffee

## License
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>

---
This is the master-Branch.
For other Branches, see Link above

## Install and Start the App

### OneLiner
1. `wget https://raw.githubusercontent.com/WebDaD/verbshaker/master/install.sh | sh`

### Native
1. `git clone https://github.com/WebDaD/verbshaker.git`
2. `cd verbshaker`
3. `npm run deploy`
4. `npm start`

### Docker
1. `git clone https://github.com/WebDaD/verbshaker.git`
2. `cd verbshaker`
3. `docker build -t verbshaker .`
4. `docker run verbshaker`

## Testing / docs
Testing is done automatically uring deploy.
You may see the Results at `http://<ip>:<port>/docs`
---
## TODO:
* tests
  * proverbCollection
* routes
  * JSDOC proverbs
* libs
  * JSDOC proverbCollection
* docs
  * raml -> models: http://json-schema.org/example1.html
* assets
  * html
    * index
      * solid background with selector (cookie)
      * font in middle with selector (cookie)
      * http://stackoverflow.com/questions/14741988/twitter-bootstrap-navbar-with-angular-js-collapse-not-functioning
