# Desk Lights Website

This website allows anyone on the internet to control the color of my RGBW LEDs! This is the second repository for this project. The first repo, [`garyhtou/Desk-Lights`](https://github.com/garyhtou/Desk-Lights), covers the hardware, wiring, and programming the Adafruit Feather Huzzah with ESP8266 that is connected to a strip of Adafruit NeoPixel RGBW LEDs. This repo is solely the website that updates the RGB values on Firebase.

Website built with Next.js (my first Next.js website after working with CRA for a long time). Currently, it's just using the tutorial starter template as I'm starting to learn Next.js.

![lights.gtou.tech website screenshot](https://user-images.githubusercontent.com/20099646/101702755-54c87380-3a36-11eb-92e4-2ca90a9bfdd5.png)

## How It Works!

Any RGB value selected on the [`react-color`](https://casesandberg.github.io/react-color/) color picker is sent to a `Firebase Realtime Database`. The ESP8266 (microcontroller) is connected to this database via WiFi and receives these new RGB values in realtime! Upon receving new values, the ESP8266 (which is connected to the NeoPixel RGBW LEDs via a data pin) tells the LEDs what color to change to.

### Color Picker Issues

Although the strip of LEDs (Adafruit NeoPixel RGBW LEDs) support RGBW (Red, Green, Blue, and White), I only incorporated RGB selection into the color picker for two reason:

1. When the White LED is on, it overpowers the colored LEDs. The light color just becomes white with a slight tint of color. By default, I just have the White value set to 0.
2. It's kinda complicated to rework the default layout of the color picker to seamlessly include a value for White; didn't want to mess with it lol.

Also, the color picker is a little misleading since I can not actually turn the LEDs black. Black would just represent the LEDs being off: `RGB(0, 0, 0)`. Think of the color Saturation as representative of the LEDs Brightness (where max saturation is max brightness and black is off).

![rgb picker](https://user-images.githubusercontent.com/20099646/101702756-55610a00-3a36-11eb-9c55-8e14f0d800db.png)

### Firebase Database
The instructions for setting up the Firebase Database can be found in the other repo at [`garyhtou/Desk-Lights`](https://github.com/garyhtou/Desk-Lights). However, the database will need to be accessible to the public using the rules below (or you can just change it to Test Mode).

**Database Rules**
``` JSON
{
	"rules": {
		".read": false,
		".write": false,
		"rgbw": {
			".read": true,
			".write": true,
			"r": {
				".write": true,
				".validate": "newData.isNumber() && newData.val() >= 0 && newData.val() <= 255",
			},
			"g": {
				".write": true,
				".validate": "newData.isNumber() && newData.val() >= 0 && newData.val() <= 255",
			},
			"b": {
				".write": true,
				".validate": "newData.isNumber() && newData.val() >= 0 && newData.val() <= 255",
			},
			"w": {
				".write": true,
				".validate": "newData.isNumber() && newData.val() >= 0 && newData.val() <= 255",
			},
		}
	}	
}
```

------

*Check out the other repository for this project, [`garyhtou/Desk-Lights`](https://github.com/garyhtou/Desk-Lights), which includes much more information on the hardware, wiring, and programming of the microcontroller connected to LED strip.*
