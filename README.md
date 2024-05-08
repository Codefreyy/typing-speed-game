# Typing Speed

**Typing Speed** is a lightweight and fun typing test game designed to help users improve their typing speed and accuracy.

<img width="654" alt="typing-speed" src="https://github.com/Codefreyy/typing-speed-game/assets/104683968/35501801-6a77-4d65-abab-b6e02af1ded9">


## Features

1. **Choose Test Time**: Users can select 30s, 60s, or 90s as the test duration. Once chosen, typing on the keyboard immediately starts the game.
   
2. **Real-time Accuracy Feedback**: Correct and incorrect letters and spaces are displayed in different colors to help users understand their current accuracy.
   
4. **Random Word Groups**: Once a word group is fully typed, a new group is randomly generated using `faker-js` for the next typing session.
   
5. **Countdown and Results**: A countdown timer is shown in the top-left corner, and when time runs out, users can see their results including WPM, accuracy percentage and total typed etc.
   
6. **Restart Button**: Clicking the "Restart" button allows users to start a new game.

## User Experience Design

1. **Tooltip Hints**: Hovering over the "Choose Time" button and the question mark icon displays helpful tooltip hints for users to understand the game rules.
   
2. **Dark/Light Mode**: The sun and moon icons in the top-right corner allow switching between dark and light modes. By default, it follows the system setting.
   
3. **Sound Effects**: Typing produces typing sound effects, and incorrect letters trigger error sounds.
   
4. **Animated Results**: The results gradually fade in using the Framer Motion library, enhancing visual appeal.

## How to Use

To run Typing Speed locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Codefreyy/typing-speed-game.git
    ```
   
2. Install dependencies:
    ```bash
    npm i
    ```
   
3. Start the development server:
    ```bash
    npm run dev
    ```
   
4. Open a browser and navigate to [http://localhost:3000](http://localhost:3000).

## Live Demo

The game is deployed on Vercel. Try it out here:
[https://joy-typing-speed-game.vercel.app/](https://joy-typing-speed-game.vercel.app/)

## Acknowledgments

This game was initially inspired by the basic functionalities demonstrated in a [YouTube tutorial](https://www.youtube.com/watch?v=oc7BMlIU3VY). I have expanded on these foundations to enhance the game's features and user experience and fixed several bugs. The expansions include the customizable test durations, more typing speed measurement, and various user experience improvements such as tooltips, theme toggling, sounding effects. 


## Contributions

Contributions and suggestions are welcome! Feel free to submit issues or pull requests to help improve and expand this game.
