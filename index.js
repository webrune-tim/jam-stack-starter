#! /usr/bin/env node
"use strict";

const { Input, Select } = require("enquirer");
const shell = require("shelljs");

const frameworks = [
  "React",
  "Svelte",
  "Vue",
  // "Polymer",
  // "Angular"
];

const reactFrameworks = ["create-react-app", "Next", "Preact"];

const svelteFrameworks = ["Svelte Kit", "Svelte", "Sapper"];

const vueFrameworks = ["Nuxt"];

const mainPrompt = new Select({
  name: "value",
  message: "Which framework group are you look'in for?",
  choices: frameworks,
});

const reactPrompt = new Select({
  name: "value",
  message: "What React framework do you want to use?",
  choices: reactFrameworks,
});

const sveltePrompt = new Select({
  name: "value",
  message: "What Svelte framework do you want to use?",
  choices: svelteFrameworks,
});

const vuePrompt = new Select({
  name: "value",
  message: "What Vue framework do you want to use?",
  choices: vueFrameworks,
});

const prompt = new Input({
  message: "What would you like to name the Project",
  initial: "Cool Project",
});

let path;

function slugify(string) {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

console.clear();

prompt
  .run()
  .then((answer) => (path = slugify(answer)))
  .then(() => {
    console.clear();

    mainPrompt
      .run()
      .then((framework) => {
        switch (framework) {
          case "React":
            reactPrompt.run().then((framework) => {
              switch (framework) {
                case "create-react-app":
                  if (shell.exec(`npx create-react-app ${path}`).code !== 0) {
                    shell.echo('Error: "create-react-app" failed');
                    shell.exit(1);
                  }
                  break;
                case "Next":
                  if (shell.exec(`npx create-next-app ${path}`).code !== 0) {
                    shell.echo("Error: Next failed");
                    shell.exit(1);
                  }
                  break;
                case "Preact":
                  if (
                    shell.exec(`npx preact-cli create default ${path}`).code !==
                    0
                  ) {
                    shell.echo("Error: Preact failed");
                    shell.exit(1);
                  }
                  break;
                default:
                  console.log("You didn't select a valid React framework");
                  break;
              }
            });
            break;
          case "Svelte":
            sveltePrompt.run().then((framework) => {
              switch (framework) {
                case "Svelte Kit":
                  if (shell.exec(`npm init svelte@next ${path}`).code !== 0) {
                    shell.echo("Error: Svelte Kit failed");
                    shell.exit(1);
                  }
                  break;
                case "Svelte":
                  if (
                    shell.exec(`npx degit sveltejs/template ${path}`).code !== 0
                  ) {
                    shell.echo("Error: Svelte failed");
                    shell.exit(1);
                  }
                  break;
                case "Sapper":
                  if (
                    shell.exec(
                      'npx degit "sveltejs/sapper-template#webpack" ${path}'
                    ).code !== 0
                  ) {
                    shell.echo("Error: Sapper failed");
                    shell.exit(1);
                  }
                  break;
                default:
                  console.log("You didn't select a valid React framework");
                  break;
              }
            });
            break;
          case "Vue":
            vuePrompt.run().then((framework) => {
              switch (framework) {
                case "Nuxt":
                  if (shell.exec(`npx create-nuxt-app ${path}`).code !== 0) {
                    shell.echo("Error: Nuxt failed");
                    shell.exit(1);
                  }
                  break;
                default:
                  console.log("You didn't select a valid React framework");
                  break;
              }
            });
            break;
          default:
            console.log("You didn't select a valid framework");
        }
      })
      .catch(console.error);
  })
  .catch(console.log);
