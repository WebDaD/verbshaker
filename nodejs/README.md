
# Node.js
This is the node.js-Branch.
For other Languages, see [The Main List](https://github.com/WebDaD/verbshaker/#list-of-code-languages)

[Demo is running here](http://)

## Install and Start the App

### OneLiner
1. `wget https://raw.githubusercontent.com/WebDaD/verbshaker/nodejs/install.sh | sh`

### Native
1. `git clone https://github.com/WebDaD/verbshaker.git .`
2. `cd verbshaker`
3. `npm run deploy` (or `npm run deploy:dev` for additional stuff)
4. `npm start`

### Copy to different Machine from DEV Machine
1. `git clone https://github.com/WebDaD/verbshaker.git .`
2. `cd verbshaker`
3. `npm run deploy`
4. `npm run publish -- <user:password@server> <path>`

### Docker
1. `git clone https://github.com/WebDaD/verbshaker.git .`
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
	"show_docs":true,
	"default": {
		"backgroundcolor": "#000000",
		"fontcolor": "#FFFFFF",
		"fontsize": 12,
		"fontfamily": "Neue Helvetica",
		"hiddenNav": false,
		"proverbbutton": true,
		"autoupdate": 0,
		"shareButton": true,
		"unhideNavButton": true,
		"introjs": true,
		"image_width": "1280",
		"image_height": "1024",
		"image_text": "Verbshaker!!!",
		"position_vertical": "middle",
		"position_horizontal": "center"
	},
	"changeable": {
		"language": true,
		"backgroundcolor": true,
		"fontcolor": true,
		"fontsize": true,
		"fontfamily": true,
		"hideNav": true,
		"proverbbutton": true,
		"autoupdate": true,
		"textposition": true

}
}
```
* **port**: the Web-Port where the app will be found
* **proverbs**: The path where the csv-files with the proverbs live
* **show_docs**: if set to false, the docs-path will not be avaiable (good for production)
* **default**: Here are the Default Setting for the Website
* _backgroundcolor_: Default Color of the Background (HEX)
* _fontcolor_: Default Color of the Font (HEX)
* _fontsize_: Default Size of the Font (in vmin)
* _fontfamily_: Default Family of the Font
* _hiddenNav_: Is the Navbar Hidden (bool)
* _proverbbutton_: Is the proverbbutton shown (bool)
* _autoupdate_: AutoUpdate Value for Proverbs (0 = off)
* _shareButton_: Is the ShareButton shown (bool)
* _unhideNavButton_: Is the Button to show the Navbar shown (bool)
* _introjs_: Use intro.js to show new users around (bool)
* _image_width_: Default Width of the image generated
* _image_height_: Default Height of the image generated
* _image_text_: Default Text of the image generated (should never be used)
* _position_vertical_: Default position of the Text (vertically, can be top, middle, bottom)
* _position_horizontal_: Default position of the Text (horizontally, can be left, center, right)
* **changeable**: Here is set what can be customized by the user
* _language_: Change the language (bool)
* _backgroundcolor_: Change the Color of the Background (bool)
* _fontcolor_: Change the Color of the Font (bool)
* _fontsize_: Change the Size of the Font (bool)
* _fontfamily_: Change the Family of the Font (bool)
* _hideNav_: Allow to Hide the Navbar (bool)
* _proverbbutton_: Toggle proverb-Button (bool)
* _autoupdate_: Change the Autoupdate Value (bool)
* _textposition_: Allow to Change Text Position (bool)

## Testing / docs
Testing is done automatically during `npm run deploy:dev`.  
You may see the Results at `http://<server>:<port>/docs`.
Alternatively just call `npm run test && npm run doc` on the commandline to perform the tests and create the results.

---
## TODO:
* tests
* selenium test gui http://nightwatchjs.org/guide#using-mocha
* api_images
* imageGenerator
* improvements
* image generator for sharing
* Link to Image from Main (Button bottom right)
* add to share-modal (autocreated)
  * share-modal -> edit image options (width, height, colors, ...)
* use intro.js to explain stuff, show button only with no cookie
* background
* use image instead of color:
  * meme
  * upsplash
  * Linked image somewhere
* positioning of Text
* textposition(editable)
  * cookies
  * Loading
  * menu
    * top middle bottom
    * left center right
