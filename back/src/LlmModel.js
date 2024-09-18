const { createCompletion, loadModel } = require ("gpt4all");
const logger = require('../middleware/logger');
const fs = require('fs');
const appRoot = require("app-root-path");

class LlmModel {
    constructor() {
        this.model = null;
        this.systemPrompt = null;
        this.chatSession = null;
        Promise.all([this.loadSystemPrompt(), this.loadModel()]).then(() => {
            this.createChatSession().then(() => {
                logger.info("Model loaded and chat session created");
            });
        });
    }

    async loadSystemPrompt() {
        if (this.systemPrompt) {
            return;
        }
        try {
            this.systemPrompt = await fs.promises.readFile(`${appRoot}/src/config/systemPrompt.txt`, 'utf8');
        } catch (error) {
            logger.error(error.message);
        }
    }

    async loadModel() {
        if (this.model) {
            return;
        }
        try {
            this.model = await loadModel("Meta-Llama-3-8B-Instruct.Q4_0.gguf", {
                verbose: true,
                device: "gpu",
                nCtx: 2048,
            });
        } catch (error) {
            logger.error(error.message);
        }
    }

    async createChatSession () {
        if (this.chatSession) {
            return;
        }
        try {
            this.chatSession = await this.model.createChatSession({
                systemPrompt: this.systemPrompt,
            })
        } catch (error) {
            logger.error(error.message);
        }
    }

    async createCompletion(prompt) {
        try {
            const completion = await createCompletion(this.model, prompt);
            return completion;
        } catch (error) {
            logger.error(error.message);
            return null;
        }
    }
}

const modelInstance = new LlmModel();
module.exports = modelInstance;