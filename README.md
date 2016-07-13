[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
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
* perl (tbd) => perl commandline tool
* java-cli (tbd) => java commandline tool
* java-gui (tbd) => java with a gui in qt
* c (tbd) => commandline tool in c
* batch (tbd) => Simple BatchCommand for Windows
* powershell (tbd) => powershell for Windows
* winform (tbd) => C#.NET winform
* dpkg (tbd) => installer for Ubuntu with commandline tool
* electron (tbd) => simple app for different architectures
* android (tbd) => native android app
* firetv (tbd) => app for firetv
* ios (tbd) => native ios app
* jquery (tbd) => jquery plugin
* angular (tbd) => angularjs-plugin
* chrome (tbd) => Extension for chrome
* wordpress (tbd) => plugin for wordpress
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
# MASTER
This is the master-Branch.
For other Branches, see [Links above](#list-of-branches)

[Demo is running here](http://)

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

## Edit the config
The configuration is found in `package.json`  
To change it, simply edit the values and then restart the app via `npm run restart`  
_Example Config_:
```json
"config": {
	"port":8080,
	"proverbs":"proverbs/",
	"show_docs":true
}
```
* **port**: the Web-Port where the app will be found
* **proverbs**: The path where the csv-files with the proverbs live
* **show_docs**: if set to false, the docs-path will not be avaiable (good for production)

## Testing / docs
Testing is done automatically during deploy.  
You may see the Results at `http://<server>:<port>/docs`

---
## TODO:
* tests
	* selenium test gui
* improvements
	* animate hide and show of navbar, modal, Text change (hide, change, show)
	* font-family select
	* font size
	* image generator for sharing
	* use intro.js to explain stuff, show button only with no cookie
	* new Proverb-Button (by cookie, checkbox)
	* use helmet for security reasons
	* check with retire
	* check with nsp
