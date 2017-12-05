# lazychrono
Chrono.gg coin grabber for lazy folk

![Crono](https://i.imgur.com/MFT6uhi.png)

Lazychrono is a node app that automatically grabs your daily coins from [chrono.gg](http://chrono.gg).


## Configure the app

Configuration is handled via the config.js file. Simply paste your [JWT token](#get_jwt) after the token key.
```js
module.exports = {
	token: ""
}
```

### Callbacks
You can optionally specify callbacks to be executed if the app succeeds or fails to complete it's task. These are expressed in the config file as ```on_success``` and ```on_fail``` respectively.
```js
module.exports = {
	token: "Paste_your_JWT_token_here",
	on_success: function() {
		console.log('Yes');
	},
	on_fail: function() {
		console.error('Nope');
	}
};
```
Potential uses for these callbacks can be to provide feedback to the operator when the app is running unattended (i.e. to send a network message or a [pushbullet](https://www.pushbullet.com/).)


### Retrieving your JWT token <a name="get_jwt"></a>
The JSON web token (JWT) is the method that chrono.gg uses to authenticate you when you access their API. To use this app you must provide your JWT token in the config file.

Follow these steps to retrieve your JWT token in Chrome and Firefox:

- Log in to chrono.gg
- Open your inspector tool 
	- **Chrome**: CMD + SHIFT + I in OSX, or CTRL + I on Windows
	- **Firefox**: CMD + ALT + I in OSX, or CTRL + I in Windows
- Select the 'Network' tab, and change the filter type to 'XHR'
- In the browser tool with your inspector open: navigate to https://chrono.gg/account/coins either by clicking the coin total in the upper right, or pasting the url into your browser bar.
- In the inspector tool, you will see several requests populate the list. Select the list item with the name ```Account```, the type ```xhr``` with the initiator ```coins```.

![Network Inspector](https://i.imgur.com/i0BhtzQ.jpg)

- Select '**Headers**'' from the inspection pane and scroll through it until you see  '**Authorization:**' under '**Request headers**'. This is your JWT session token. Select the whole string including the 'JWT' at the start.
- Paste the string into the config file, and you're set.

![Network Inspector Authorization Header](https://i.imgur.com/L61EOiy.jpg)

If you are unable to locate the Authorization header, check any of the other XHR items in the list.