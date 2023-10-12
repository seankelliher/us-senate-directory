[![MIT License on GitHub](https://img.shields.io/github/license/seankelliher/us-senate-directory?style=flat-square)](/LICENSE.txt)
## US Senate Directory

Directory of United States Senators built with Vue.js. [View working component](https://sean-kelliher-us-senate-directory.netlify.app).

## Project Status

This project is being developed. Next steps, accessibility and browser testing.

## Project Screen Shots

* Starting view - all Senators, desktop.
![screen shot of project](/screenshots/us-senate-directory-screenshot1.png?s=600)

* Female Democrats up for re-election in 2024, desktop.
![screen shot of project](/screenshots/us-senate-directory-screenshot2.png?s=600)

* Alabama Senators, tablet-sized screen.
![screen shot of project](/screenshots/us-senate-directory-screenshot3.png?s=600)

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`  

To Run Vue:

`npm run dev`   

To Visit App:

Visit the localhost port displayed in the terminal after running `npm run dev`.

## Reflection

My goal was to build a directory so users can easily view members of the US Senate. I included filters so users can narrow their view by state, gender, party, or when Senators are up for re-election. I also included a search feature so users can search for a Senator by first, last, or full name. Since some Senators have less formal and more formal names, I also built the search to try to accommodate these variables. For example, people can search for Bob or Robert Casey; Dick or Richard Durbin. 

A big challenge was ensuring the filters work without error. The other was accommodating smaller viewports, especially mobile phones, where there is a lot of information to display and not much space.

## Acknowledgments

* Senate roster from [US Senate](https://www.senate.gov/senators/index.htm).
* Photographs of Senators are from each Senator's office.
* US Senate seal from [Wikipedia](https://commons.wikimedia.org/wiki/File:Seal_of_the_United_States_Senate.svg).
* Readme guidance from [Brenna Martenson](https://gist.github.com/martensonbj/6bf2ec2ed55f5be723415ea73c4557c4).
* Helpful information on filtering from [Stackoverflow users](https://stackoverflow.com/questions/11076067/finding-matches-between-multiple-javascript-arrays).
* Design guidance from Google's [Material Design](https://material.io/design) and [Adobe Color](https://color.adobe.com/trends).
* Accessibility guidance from [Chrome's](https://www.google.com/chrome/) Lighthouse and [Firefox's](https://www.mozilla.org/en-US/firefox/new/) Accessibility Tools.
* Shields from [Shields](https://shields.io).
