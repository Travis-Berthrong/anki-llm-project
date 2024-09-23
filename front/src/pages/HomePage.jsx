import { SelectDeck } from "@/components/SelectDeck";
import { useState, useEffect, useRef } from "react";
import axios_instance from "../../constants/axios";
import { requests } from "../../constants/requests";

export function HomePage() {

    const [decknames, setDecknames] = useState([]);
    const [selectedDeck, setSelectedDeck] = useState(null);
    const loading = useRef(true);

    useEffect(() => {
        axios_instance.get(requests.decknames, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                setDecknames(response.data);
                loading.current = false;
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const submitHandler = (deckname) => {
        console.log(deckname);
        setSelectedDeck(deckname);
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full px-4">
            {!loading.current && <SelectDeck decknames={decknames} submitHandler={submitHandler} />}
            {selectedDeck && <h1>{selectedDeck}</h1>}
        </div>
    )

}
