import { useState, useEffect } from "react";
import axios_instance from "../../constants/axios";
import { requests } from "../../constants/requests";
import SelectDeck from "@/components/SelectDeck";
import BackendError from "@/components/BackendError";
import Navbar from "@/components/Navbar";

export function HomePage() {

    const [decknames, setDecknames] = useState([]);
    const [selectedDeck, setSelectedDeck] = useState(null);
    const [loading, setLoading] = useState(true);
    const [requestError, setRequestError] = useState(false);


    useEffect(() => {
        axios_instance.get(requests.decknames, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                setDecknames(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setRequestError(true);
                setLoading(false);
                console.log(error);
            });
    }, []);

    const submitHandler = (deckname) => {
        console.log(deckname);
        setSelectedDeck(deckname);
    }

    return (
        <Navbar >
        <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full px-4">
            {!loading && !requestError && <SelectDeck decknames={decknames} submitHandler={submitHandler} />}
            {loading && <p>Loading...</p>}
            {requestError && <BackendError onRetry={() => location.reload()} />}
            {selectedDeck && <h1>{selectedDeck}</h1>}
        </div>
        </Navbar>
    )

}