import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { useState } from "react";
  

export function SelectDeck({ decknames, submitHandler }) {
    const [selectedDeck, setSelectedDeck] = useState(null);
	return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full px-4">
            <div className="fixed top-0 left-0 right-0 z-50 mx-auto w-72 mt-4 shadow-md bg-slate-100 rounded-lg p-4">
                <h1 className="text-xl font-semibold text-center">Anki Deck</h1>
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
                    <Button onClick={() => submitHandler(selectedDeck)} className="flex-shrink-0">
                        Submit
                    </Button>
                </div>
                <p className="text-sm text-center mt-2 text-gray-600">Cards will be added to this deck</p>
            </div>
        </div>
    )
}