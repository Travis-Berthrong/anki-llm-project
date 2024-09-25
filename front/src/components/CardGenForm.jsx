import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Card } from "@/components/ui/card"
import { useState } from "react";

export default function CardGenForm({ decknames, submitHandler }) {
    const levelOptions = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const [selectedDeck, setSelectedDeck] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [prompt, setPrompt] = useState('');

    return (
        <div className="w-full px-4">
            <Card className="mx-auto mt-8 shadow-md bg-slate-100 rounded-lg p-4 w-full max-w-md">
                <h1 className="text-xl font-semibold text-center pb-2">Add a card</h1>
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4">
                        <Select onValueChange={(value) => setSelectedDeck(value)} className="flex-grow">
                            <SelectTrigger>
                                <SelectValue placeholder="Select a deck" />
                            </SelectTrigger>
                            <SelectContent>
                                {decknames.map((deckname) => (
                                    <SelectItem value={deckname} key={deckname}>
                                        {deckname}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(value) => setSelectedLevel(value)} className="flex-grow">
                            <SelectTrigger>
                                <SelectValue placeholder="Select a level" />
                            </SelectTrigger>
                            <SelectContent>
                                {levelOptions.map((level) => (
                                    <SelectItem value={level} key={level}>
                                        {level}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter prompt" />
                    <Button onClick={() => submitHandler(selectedDeck, selectedLevel, prompt)} className="flex-shrink-0">
                        Get a card
                    </Button>
                </div>
            </Card>
        </div>
    )
}
