import { useState, useEffect } from "react";
import axios_instance from "../../constants/axios";
import { requests } from "../../constants/requests";
import CardGenForm from "@/components/CardGenForm";
import BackendError from "@/components/BackendError";
import Navbar from "@/components/Navbar";

export function HomePage() {

    const [decknames, setDecknames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [requestError, setRequestError] = useState(false);


    useEffect(() => {
        axios_instance.get(requests.decknames)
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

    const submitHandler = (deckname, level, prompt) => {
        console.log(deckname, level, prompt);
    }

    return (
        <Navbar >
        <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full px-4">
            {!loading && !requestError && <CardGenForm decknames={decknames} submitHandler={submitHandler} />}
            {loading && <p>Loading...</p>}
            {requestError && <BackendError onRetry={() => location.reload()} />}
        </div>
        </Navbar>
    )

}