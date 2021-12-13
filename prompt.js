const inquirer = require('inquirer');

const data = require('./data');
const writeComment = require('./writeComment');
let postComment = require('./postComment');


async function prompt() {
    await inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: 'Enter your instagram username (email): ' 
        }
    ]).then(async answer => {
        data.username = answer.username;
    
        await inquirer.prompt([
            {
                type: 'password',
                name: 'password',
                message: 'Enter your instagram password: '
            } 
        ]).then(async answer => {
            data.password = answer.password;
    
            await inquirer.prompt([
                {
                    type: 'input',
                    name: 'url',
                    message: 'Enter instagrams post url (Ex: https://www.instagram.com/p/postid): '
                }
            ]).then(async answer => {
                data.url = answer.url;
    
                await writeComment();
            })
        });
    });
    postComment();

}

module.exports = prompt;