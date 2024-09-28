# A - Innovation

I consider this project to be innovative as it expands upon the general concept of utilizing language models for flashcard generation to address a more specific use case of Anki-using french language learners. 

## Existing Solutions
The current solutions for integrating language models with Anki are primarily based around adapting pre-existing content into flashcards.
Some examples include:
- [AnkiBrain:](https://ankiweb.net/shared/info/1915225457) While this project does provide a similar web-app interface between Anki and a language model with learning level based customization, it is not tailored to language learning. Instead the feature set is focused around document analysis and explanation of existing flashcards.
- [anki-quick-ai:](https://github.com/chuanqixu/anki-quick-ai/blob/main/README.md) One of the few solutions I found tailored to language learning, this project uses a language model to generate an example text from the existing flashcards that the user has studied in Anki.
- [obsidian-auto-anki: ](https://github.com/cadrianxyz/obsidian-auto-anki)
    This project utilizes a language model to generate flashcards from the user's notes in Obsidian.
- [matrixbrain:](https://www.reddit.com/r/Anki/comments/th4um3/automatically_generating_of_anki_decks_with/) As with obsidian-auto-anki this project is focused on parsing existing documents, providing a cli tool to generate flashcards from pdfs.
- [EasyVocab: ](https://ankiweb.net/shared/info/203110167) This project is focused on generating flashcards from a given list of words, but does not utilize a language model, instead making use of the google translate api.

## Unique Features
- **Tailored to French Language Learning**: My project is specifically designed to generate French vocabulary flashcards, making it more accessible to French language learners and allowing for increased optimization of the LLM prompts.
- **Ease of Use**: The project is designed to be user-friendly, with a simple web interface that allows users to generate flashcards with just a few clicks. This usage of a web interface is rare among existing solutions which primarily integrate with Anki via plugins and provides a more accessible experience.
- **Customization**: The project allows users to customize the generated flashcards based on their level and a general prompt instead of relying upon pre-existing documents, making it much easier to target specific areas of interest.
