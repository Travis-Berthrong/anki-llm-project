# Semester 4 Final Project: anki-llm
By Travis Berthrong
 
 This is a project to create an interface between Anki and a language learning model.
 The goal is to create a tool that can help language learners to seamlessly generate French vocabulary flashcards tailored to their level and interests.

 Table of Contents
=================

   * [Project Overview](#semester-4-final-project-anki-llm)
      * [What is Anki?](#what-is-anki)
      * [Model Used](#model-used)
      * [How to Run](#how-to-run)
   * [A - Innovation](docs/A-Innovation.md)
   * [B - Conception and Organization](docs/B-Conception%20and%20Organization.md)
   * [C, D, & F - Recorded Demonstration](docs/Semester4ProjectDemo%20-%20Travis%20Berthrong.mp4)

### What is Anki?
[Anki](https://apps.ankiweb.net/) is a free and open-source flashcard program that utilizes spaced repetition. The program is designed to help users memorize information through the use of flashcards. Users can create their own flashcards or download pre-made decks from the AnkiWeb website. This project uses the [AnkiConnect](https://foosoft.net/projects/anki-connect/) plugin to interact with the user's Anki application.


### Model Used
Currently this project makes use of the [Meta Llama 3 8B Instruct](https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct) model due to its ease of use via gpt4all and optimization towards dialog-based text generation. While the model is not specifically designed for language learning, it can be fine-tuned to generate French vocabulary flashcards. A potential future improvement would be to train a more lightweight model specifically for this task in order to improve performance.

### How to Run
1. Clone this repository
2. Install dependencies for front end and back end by running `npm install` in the [/front](./front/) and [/back](./back/) directories
3. Install the [Anki Desktop](https://apps.ankiweb.net/) application and the [AnkiConnect](https://foosoft.net/projects/anki-connect/) plugin
4. Define all environment variables for the front end and back end by creating a `.env` file in the [/front](./front/) and [/back](./back/) directories respectively. Each `.env` file should contain the variables indicated in the `.env.template` file in the corresponding directory.
5. Start the Anki application and ensure that the AnkiConnect plugin is installed and running
6. Start the back end server by running `npm start` in the [/back](./back/) directory
7. Start the front end server by running `npm start` in the [/front](./front/) directory
8. Open the front end in your browser to create your account and generate flashcards or use the [API endpoints directly](https://www.postman.com/speeding-shuttle-145414/workspace/public/collection/32573845-e515023b-1e70-4c0d-abe4-7852f063875a?action=share&creator=32573845&active-environment=32573845-d07a5a89-111a-4841-8bb3-8a66d5705e48)



