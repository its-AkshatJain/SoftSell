# SoftSell Assistant - Chat Widget

A modern and interactive chat widget designed for the SoftSell platform using React, Framer Motion, and Cohere's API for AI text generation. This widget allows users to interact with a virtual assistant to get help with selling their software licenses, featuring dynamic animations, a glass-like effect, and smooth transitions powered by Framer Motion.

## Features Implemented

* **Interactive Chat UI**: A sleek chat interface that supports both user and assistant messages.
* **Cohere API Integration**: Fetches text responses from Cohere's text generation API to answer user queries.
* **Typing Indicator**: Simulates the assistant typing to make the conversation feel more human.
* **Predefined Questions**: Displays a set of example questions that users can click to interact with the assistant.
* **Responsive Design**: The chat widget is responsive and adapts to different screen sizes.
* **Animated Transitions**: Smooth animations for opening/closing the chat widget and message transitions using **Framer Motion**.
* **Dark and Light Mode**: Integrated with a theme context for light/dark mode based on user preference.
* **Icons for Interaction**: The chat widget uses `react-icons` to make the UI more engaging.

## Design Choices

* **Glass-like Effect**: The chat widget has a frosted glass appearance, achieved by using semi-transparent background colors and borders. This effect is intended to give the widget a sleek, modern, and professional look, fitting well with contemporary design trends.
* **Framer Motion**: To add an interactive and fluid user experience, **Framer Motion** is used for animations such as smooth transitions for messages, popups, and button effects.
* **Font Choice**: The project uses **Poppins** as the primary font, which is known for its clean, modern, and professional appearance. This enhances the overall aesthetic of the chat widget.
* **Icons for Visual Appeal**: The use of icons like `FaRobot`, `FiMessageCircle`, and `FiSend` enhances the user interface and provides immediate visual feedback during interactions.

## Time Spent

* **Start Date**: May 9th, 2025
* **End Date**: May 10th, 2025, 2:45 AM
* **Total Time Spent**: Approximately **14 hours**

The project started on May 9th, 2025, and after intense coding and testing, it was completed in the early hours of May 10th, 2025, at 2:45 AM.

## Setup Instructions

### Prerequisites

Before you can run the project, make sure you have the following installed on your system:

* **Node.js** (v14 or later)
* **npm** (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/softsell-assistant.git
   cd softsell-assistant
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variable for Cohere API:

   * Create a `.env` file in the root of the project.
   * Add your Cohere API key to the `.env` file:

     ```
     VITE_COHERE_API_KEY=your-cohere-api-key-here
     ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open the app in your browser at `http://localhost:3000`.

### Deployment

This app is deployed on **Vercel**. If you'd like to deploy the app, you can do so by following these steps:

1. Push your code to GitHub.
2. Go to the [Vercel dashboard](https://vercel.com).
3. Link your GitHub repository to Vercel and deploy.

## Acknowledgments

* **Cohere** for providing the powerful language generation API.
* **Framer Motion** for amazing animation and transitions.
* **React Router** for handling the app’s routing.
---
