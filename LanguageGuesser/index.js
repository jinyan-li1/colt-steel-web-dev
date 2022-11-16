import {franc, francAll} from 'franc'
import langs from 'langs'
import 'colors'

const input = process.argv[2];

const langCode = franc(input);

if (langCode === "und") {
    console.log("Sorry, couldn't figure it out! Tyr with more sample text.".red)
} else {
    const language = langs.where("3", langCode);

    console.log(`Our best guess is: ${language.name}`.green);
}
