async function githubProfileDetails(username) {

    try {

        const isUserNameExist = await fetch(`https://github.com/${encodeURIComponent(username)}`);

        if(!isUserNameExist.ok) {
            throw new Error("NotFoundError : \n User Profile doesn't exist");
        }

        const userDetails = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);

        if(!userDetails.ok) {
            throw new Error("InternalServerError : \n Something went wrong");;
        }

        const userData = await userDetails.json();

        console.log(`Name: The ${userData.login}`);
        console.log(`UserName: ${userData.login}`);
        console.log(`Profile: https://github.com/${encodeURIComponent(username)}`);
        console.log(`Public repos: ${userData.public_repos}`);
        console.log(`Followers: ${userData.followers}`);
    } catch (error) {
        console.log(error);
    }
}

// printing the command line arguments which are passed from the terminal
console.log(process.argv);

const processArguments = process.argv;
const noOfArguments = processArguments.length;

/**
 * If the username is not provided, we prompt the user to enter a username.
 */
if(noOfArguments <= 2) {
    console.error(`error: please provide a GitHub username`);
    process.exit(2);
}

const username = processArguments[2];

console.log(`Username is : ${username}`);

githubProfileDetails(username);