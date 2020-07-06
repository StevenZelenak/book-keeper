# NSS Frontend Capstone: "Book Keeper"

### Requirements:

- [x] React - *C.R.U.D and Routing*
- [x] Firebase - *Authentication, Database, and Hosting*
- [x] Github - *Version Control and Project Planning*
- [x] Display comprehension and mastery of technologies from the first 6 months of frontend developer bootcamp

### Technologies Used:
> - [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)
> - [CSS](https://developer.mozilla.org/en-US/docs/Glossary/CSS), [Sass](https://sass-lang.com/)
> - [JavaScript](https://developer.mozilla.org/en-US/docs/Glossary/JavaScript), [JSX]()
> - [Bootstrap](https://getbootstrap.com/), [Reactstrap](https://reactstrap.github.io/), [React-Bootstrap](https://react-bootstrap.github.io/components/dropdowns/)

### Description:
##### "Your Digital Library"
> Book Keeper is a digital library where users can log in via Google-Login and store all their books digitally. The users upon login are shown an empty screen, from here they can add books and update or delete those books. The purpose behind creating this app was to keep the users informed of what books they owned no matter where they went. You go to a flea market and not sure if you own that book well now you can just pull up your library on your phone and check.

#### Landing Page for Unauthenticated Users
<img src="https://i.imgur.com/yWTt3iP.png">

#### Dashboard for Authenticated Users
<img src="https://i.imgur.com/3OtUAMP.png">

#### Update page
<img src="https://i.imgur.com/hqtZWj2.png">

#### Create Page
<img src="https://i.imgur.com/1Z3Milv.png">


### Instructions to Run:

[Click here to view the deployed web app](https://book-keeper-5e44c.web.app/)

Or, Run Locally:
1. If you do not have npm http-server installed, follow instuctions [here](https://www.npmjs.com/package/http-server) to install on your device
1. Use GitHub's [Cloning Feature](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) to download a local copy of the files for this project
1. In your command line interface, change directory into the folder that contains your copied files
1. Enter command: `npm install` and wait for completion
1. After updating your files you will need to head over to firebase and setup a project
1. Once your project is created you need to grab some info from firebase under the `firebase SDK snippet`
1. This info is inserted into the a file called `apiKeys.json` which there is an example of in src/helpers
1. The very last things you need to do is make sure google authentication is on in your firebase project and upload your data from the `db folder` to firebase
1. Enter command: `npm start`
1. The project will automatically render in your browser at url: `http://localhost:8080`

