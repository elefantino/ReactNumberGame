This is a simple number game app built with React

It uses ES6 and Bootstrap. It is implemented as a study project during the course 
https://app.pluralsight.com/library/courses/react-js-getting-started in order to learn 
how to get started with React and ES6. You can use the code to familiarize yourself 
quickly with building apps with React.

The game layout contains a few frames where every frame is a separate React component. 
The goal of the game is to select all the available numbers in the number frame. A player 
is to count the stars in the left frame and select the numbers from the number frame so 
that their sum is equal to the number of stars. If there are no numbers that can be 
selected and summed to become equal to the number of shown stars, the refresh button can 
be used up to 5 times to generate a new number of stars.   

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
