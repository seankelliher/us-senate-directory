[![MIT License on GitHub](https://img.shields.io/github/license/seankelliher/us-senate-directory?style=flat-square)](/LICENSE.txt)
## US Senate Directory

Searchable directory of current US Senators, filterable by state, gender, party, re-election date, or any combination of these. There is also a search bar to search by a Senator's first, last, or full name, with some "fuzzy logic." For example, people can search for Bob or Robert Casey, Dick or Richard Durbin. Built with Vue.js with data stored locally. [View working component](https://sean-kelliher-us-senate-directory.netlify.app).

## Project Status

Project meets general accessibility (WACG) and cross-browser requirements. More testing with a dedicated services (e.g., Sauce Labs) would be helpful if deploying to production.

## Project Screen Shots

* Starting view - all Senators.
![screen shot of project](/screenshots/us-senate-directory-screenshot1.png?s=600)

* Pop-up menu for filtering.
![screen shot of project](/screenshots/us-senate-directory-screenshot2.png?s=600)

* Female Republicans, up for re-election in November 2026.
![screen shot of project](/screenshots/us-senate-directory-screenshot3.png?s=600)

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`  

To Run Vue:

`npm run dev`   

To Visit App:

Visit the localhost port displayed in the terminal after running `npm run dev`.

## Acknowledgments

* Senate roster from [US Senate](https://www.senate.gov/senators/index.htm).
* Photographs of Senators are from each Senator's office.
* US Senate seal from [Wikipedia](https://commons.wikimedia.org/wiki/File:Seal_of_the_United_States_Senate.svg).
* Readme guidance from [Brenna Martenson](https://gist.github.com/martensonbj/6bf2ec2ed55f5be723415ea73c4557c4).
* Helpful information on filtering from [Stackoverflow users](https://stackoverflow.com/questions/11076067/finding-matches-between-multiple-javascript-arrays).
* Design guidance from Google's [Material Design](https://material.io/design).
* Fonts and icons from [Google Fonts](https://fonts.google.com).
* WACG guidance from [Firefox's Developer Tools](https://firefox-source-docs.mozilla.org/devtools-user/#).
* Shields from [Shields](https://shields.io).