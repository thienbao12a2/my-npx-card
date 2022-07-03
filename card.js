#!/usr/bin/env node
"use strict";

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require("fs");
const request = require("request");
const path = require("path");
const ora = require("ora");
const cliSpinners = require("cli-spinners");
clear();

const prompt = inquirer.createPromptModule();

const questions = [
	{
		type: "list",
		name: "action",
		message: "What would you like to do?",
		choices: [
			{
				name: `Send me an ${chalk.green.bold("email")}?`,
				value: () => {
					open("mailto:bton1@student.gsu.edu");
					console.log("\nShoot me an email and I will reply ASAP.\n");
				},
			},
			{
				name: `Download my ${chalk.magentaBright.bold("Resume")}?`,
				value: () => {
					// cliSpinners.dots;
					const loader = ora({
						text: " Downloading Resume...",
						spinner: cliSpinners.material,
					}).start();
					let pipe = request(
						"https://bao-ton.s3.amazonaws.com/Bao+Ton-+Resume+PDF.pdf",
						(err, res, body) => {
							if (err) {
								loader.fail("Something went wrong! :(");
								process.exit();
							}
						}
					).pipe(fs.createWriteStream("./BaoTon-Resume.pdf"));
					pipe.on("finish", function () {
						let downloadPath = path.join(
							process.cwd(),
							"BaoTon-Resume.pdf"
						);
						loader.succeed(
							`Resume Downloaded at ${downloadPath}\n`
						);
						open(downloadPath);
					});
				},
			},
			{
				name: `Schedule a ${chalk.redBright.bold("Meeting")}?`,
				value: () => {
					open("https://calendly.com/baoton93/30min");
					console.log("\n See you at the meeting :D \n");
				},
			},
			{
				name: "Just quit.",
				value: () => {
					console.log("Hope to see you again.\n");
				},
			},
		],
	},
];

const data = {
	name: chalk.bold.green("               Bao Ton"),
	// handle: chalk.white("@baoton"),
	work: `${chalk.white("Software Engineer Intern at")} ${chalk
		.hex("#2b82b2")
		.bold("Skipli")}`,
	facebook:
		chalk.gray("https://www.facebook.com/") + chalk.cyan("StevenTon19"),
	github: chalk.gray("https://github.com/") + chalk.green("thienbao12a2"),
	linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue("bao-ton"),
	web: chalk.cyan(""),
	npx: chalk.red("npx") + " " + chalk.white("baoton"),

	labelWork: chalk.white.bold("       Work:"),
	labelFacebook: chalk.white.bold("    Facebook:"),
	labelGitHub: chalk.white.bold("     GitHub:"),
	labelLinkedIn: chalk.white.bold("   LinkedIn:"),
	labelWeb: chalk.white.bold("        Web:"),
	labelCard: chalk.white.bold("       Card:"),
};

const me = boxen(
	[
		`${data.name}`,
		``,
		`${data.labelWork}  ${data.work}`,
		``,
		`${data.labelFacebook}  ${data.facebook}`,
		`${data.labelGitHub}  ${data.github}`,
		`${data.labelLinkedIn}  ${data.linkedin}`,
		// `${data.labelWeb}  ${data.web}`,
		``,
		`${data.labelCard}  ${data.npx}`,
		``,
		`${chalk.italic("I am currently looking for new opportunities,")}`,
		`${chalk.italic("my inbox is always open. Whether you have a")}`,
		`${chalk.italic("question or just want to say hi, I will try ")}`,
		`${chalk.italic("my best to get back to you!")}`,
	].join("\n"),
	{
		margin: 1,
		float: "center",
		padding: 1,
		borderStyle: "single",
		borderColor: "green",
	}
);

console.log(me);
const tip = [
	`Tip: Try ${chalk.cyanBright.bold("cmd/ctrl + click")} on the links above`,
	"",
].join("\n");
console.log(tip);

prompt(questions).then((answer) => answer.action());
