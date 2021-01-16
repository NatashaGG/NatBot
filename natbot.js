// require config file for token
const { prefix, token } = require('./config.json');

// require the discord.js module
const Discord = require('discord.js');

// creates a new Discord client
const client = new Discord.Client();

// when the client is ready, run the code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

// listing to logged messages
client.on('message', message => {
	console.log(message.content);
});

// send pong if ping
client.on('message', message => {
	if (message.content.startsWith(`${prefix}ping`)) {
		message.channel.send('pong');
	}
	else if (message.content.startsWith(`${prefix}Ping`)) {
		message.channel.send('Pong');
	}
	else if (message.content.startsWith(`${prefix}ding`)) {
		message.channel.send('dong');
	}
	else if (message.content.startsWith(`${prefix}Ding`)) {
		message.channel.send('Dong');
	}
});

// outputing server info
client.on('message', message => {
	if (message.content === `${prefix}server`) {
		message.channel.send(`This server's name is: ${message.guild.name}`);
	}
	else if (message.content === `${prefix}memberCount`) {
		message.channel.send(`This server has ${message.guild.memberCount} members`);
	}
});

// outputing member info
client.on('message', message => {
	if (message.content === `${prefix}user-info`) {
		message.channel.send(`Your username is ${message.author.username} and id is ${message.author.id}`);
	}
});

client.on('message', message => {
	if (message.content == '!roles') {
		let rolemap = message.guild.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(r => r)
			.join(',');
		if (rolemap.length > 1024) rolemap = 'To many roles to display';
		if (!rolemap) rolemap = 'No roles';
		const embed = new Discord.MessageEmbed()
			.addField('Role List', rolemap);
		message.channel.send(embed);
		console.log(embed);
	}
});

// login to Discord with natbot's token
client.login(token);