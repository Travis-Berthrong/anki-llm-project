import { useState, useEffect } from "react";
import { useToast } from "@/components/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast";
import axios_instance from "../../constants/axios";
import { requests } from "../../constants/requests";
import CardGenForm from "@/components/CardGenForm";
import BackendError from "@/components/BackendError";
import Flashcard from "@/components/Flashcard";
import FlashcardSkeleton from "@/components/FlashcardSkeleton";
import Navbar from "@/components/Navbar";

export function HomePage() {

    const [decknames, setDecknames] = useState([]);
    const [selectedDeck, setSelectedDeck] = useState('');
    const [pageLoading, setPageLoading] = useState(true);
    const [cardLoading, setCardLoading] = useState(false);
    const [cardJson, setCardJson] = useState({});
    const [requestError, setRequestError] = useState(false);
    const { toast } = useToast();


    useEffect(() => {
        axios_instance.get(requests.decknames)
            .then((response) => {
                console.log(response.data);
                setDecknames(response.data);
                setPageLoading(false);
            })
            .catch((error) => {
                setRequestError(true);
                setPageLoading(false);
                console.log(error);
            });
    }, []);

    const submitHandler = async (deckname, level, prompt) => {
        try {
            console.log(deckname, level, prompt);
            setSelectedDeck(deckname);
            setCardLoading(true);
            const response = await axios_instance.post(requests.generateCard, { level, prompt });
            const cardJson = response.data;
            setCardJson(cardJson);
            setCardLoading(false);
        } catch (error) {
            console.log(error);
            setRequestError(true);
            setCardLoading(false);
        }

    }

    const saveCardHandler = async () => {
        try {
            const response = await axios_instance.post(requests.saveCard, { deckName: selectedDeck, card: cardJson });
            console.log(response.data);
            toast({
                title: 'Card saved',
                description: 'Card saved successfully',
                type: 'success',
            });
            setCardJson({});
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error',
                description: 'Error saving card',
                type: 'error',
            });
        }
    }

    const discardHandler = () => {
        const previousCardJson = cardJson;
        toast({
            title: 'Card discarded',
            description: 'Card discarded successfully',
            action: <ToastAction altText="Undo" onClick={() => setCardJson(previousCardJson)} >Undo </ToastAction>,
        });
        setCardJson({});
    }

    return (
        <Navbar>
            <div className="flex flex-col items-center justify-start w-full px-4">
                {!pageLoading && !requestError && (
                    <CardGenForm decknames={decknames} submitHandler={submitHandler} />
                )}
                {!cardLoading && cardJson?.Vocab && (
                    <Flashcard cardJson={cardJson} saveHandler={saveCardHandler} discardHandler={discardHandler} />
                )}
                {pageLoading && <p>Loading...</p>}
                {cardLoading && <FlashcardSkeleton />}
                {requestError && <BackendError onRetry={() => location.reload()} />}
            </div>
        </Navbar>
    )

}