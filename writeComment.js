const inquirer = require('inquirer');
const { iterations } = require('./data');

const data = require('./data');

comments = data.comments;

async function writeComment() {
    await inquirer.prompt([
        {
            type: 'input',
            name: 'comment',
            message: 'Write down your comment: '
        }
    ]).then(async answer => {
        comments.push(answer.comment);

        await inquirer.prompt([
            {
                type: 'confirm',
                name: 'addComment',
                message: 'Do you want to add another comment?'
            }
        ]).then(async answer => {
            if (answer.addComment === true) {
                await writeComment();
            } else {
                await inquirer.prompt([
                    {
                        type: 'number',
                        name: 'iterations',
                        message: 'How many times do you want your comments to be posted? (write 0 to post one time each comment)',
                        default: 0
                    }
                ]).then(answer => {
                    data.iterations = answer.iterations;
                    console.log(data);
                })
            }
        })
    })
}

module.exports = writeComment;