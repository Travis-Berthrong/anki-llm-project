import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Trash2 } from 'lucide-react';

export default function Flashcard({cardJson, saveHandler, discardHandler}) {
    return (
<div className="w-full px-4 py-6 flex flex-col items-center">
            <Tabs defaultValue="front" className="w-full max-w-md">
                <TabsList className="flex justify-center mb-4 bg-slate-100 font-semibold">
                    <TabsTrigger value="front" className="flex-1 text-center">Vocab</TabsTrigger>
                    <TabsTrigger value="back" className="flex-1 text-center">Definition</TabsTrigger>
                </TabsList>
                <TabsContent value="front">
                    <Card className="mx-auto shadow-md bg-slate-100 rounded-lg p-4 w-full">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-center">{cardJson.Vocab}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{cardJson.Sentence}</p>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between">
                            <button onClick={saveHandler} className="rounded-lg"><Save/></button>
                            <button onClick={discardHandler} className="rounded-lg"><Trash2/></button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="back">
                    <Card className="mx-auto shadow-md bg-slate-100 rounded-lg p-4 w-full">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-center">{cardJson.VocabMeaning}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{cardJson.SentenceMeaning}</p>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between">
                            <button onClick={saveHandler} className="rounded-lg"><Save/></button>
                            <button onClick={discardHandler} className="rounded-lg"><Trash2/></button>
                        </CardFooter>

                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}