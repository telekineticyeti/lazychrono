let request = require('request');
let auth = require('./config');
let main_url = 'https://chrono.gg';

var options = { 
	uri: 'https://api.chrono.gg/quest/spin',
	method: 'GET',
	headers: {
		'Authorization': auth.token
	},
	followAllRedirects: true
};

request(options, function (error, response, body) {
	if (!error) {
		if (response.statusCode === 420) {
			console.error("Error 420: You have already collected your coins for today.");
		}

		if (response.statusCode === 200) {
			let json = JSON.parse(body);
			let coins = json.quest.value;
			let bonus = json.quest.bonus;
			let output = "Coins collected! You recieved " + (coins + bonus) + " total coins.";

			// Handle bonus chest output message
			if (json.chest.hasOwnProperty('base')) {
				let chest = json.chest.base;
				let chest_bonus = json.chest.bonus;
				let streak = json.chest.kind;
				output += " You also recieved a bonus of " + (chest + chest_bonus) + " coins for a " + streak + " day streak!"
			}

			// If a callback is specified, execute it
			if (auth.hasOwnProperty('on_success')) {
				auth.on_success();
			}

			console.log(output);
			process.exit(0);
		}
	} else {
		if (response.statusCode === 401) {
			console.error("Error 401: Unauthorized. Check your config.json file to ensure that your JWT token is in place. View https://github.com/telekineticyeti/lazychrono for details.");
			if (auth.hasOwnProperty('on_fail')) {
				auth.on_fail();
			}
			process.exit(1);
		}
	}
});