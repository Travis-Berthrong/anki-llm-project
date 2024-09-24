import { useState, useEffect } from "react";
import axios_instance from "../../constants/axios";
import { requests } from "../../constants/requests";
import CardGenForm from "@/components/CardGenForm";
import BackendError from "@/components/BackendError";
import Flashcard from "@/components/Flashcard";
import Navbar from "@/components/Navbar";

export function HomePage() {

    const [decknames, setDecknames] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [cardLoading, setCardLoading] = useState(false);
    const [cardJson, setCardJson] = useState({});
    const [requestError, setRequestError] = useState(false);


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

    return (
        <Navbar>
            <div className="flex flex-col items-center justify-start w-full px-4">
                {!pageLoading && !requestError && (
                    <CardGenForm decknames={decknames} submitHandler={submitHandler} />
                )}
                {!cardLoading && cardJson?.Vocab && (
                    <Flashcard cardJson={cardJson} />
                )}
                {pageLoading && <p>Loading...</p>}
                {cardLoading && <p>Loading card...</p>}
                {requestError && <BackendError onRetry={() => location.reload()} />}
            </div>
        </Navbar>
    )

}