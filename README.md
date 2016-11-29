This is a simple number game app using React.

It uses ES6 and Bootstrap. It has been implemented as a study project during the course 
https://app.pluralsight.com/library/courses/react-js-getting-started in order to learn 
how to get started with React and ES6. You can use the code to familiarize yourself 
quickly with the basics of building apps with React.

The game layout contains a few frames, which of them is a separate React component. 
The goal of the game is to select all available numbers in the number frame. A player 
is to count the stars in the left frame and select numbers from the number frame so 
that the sum of selected numbers is equal to the number of stars shown. If there are no 
numbers that can be selected and summed to become equal to the number of the stars, the 
refresh button can be used up to 5 times to generate stars.   

Requirements:
- git
- Node v6
- npm v3
- bootstrap v3

Running the app locally, execute the following commands:
	git clone https://github.com/elefantino/ReactNumberGame.git
	cd ReactNumberGame
	npm install
	npm start
