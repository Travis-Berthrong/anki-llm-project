import { useState, useEffect } from "react";
import axios_instance from "../../constants/axios";
import Navbar from "@/components/Navbar";
import { requests } from "../../constants/requests";
import EditCardModelForm from "@/components/EditCardModelForm";

export function AdminPage() {
    const [cardModel, setCardModel] = useState({});
    const [systemPrompt, setSystemPrompt] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchCardModel = async () => {
        try {
            const response = await axios_instance.get(requests.getCardModelHTML);
            console.log(response.data);
            setCardModel(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSystemPrompt = async () => {
        try {
            const response = await axios_instance.get(requests.getSystemPrompt);
            setSystemPrompt(response.data.systemPrompt);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCardModel();
        fetchSystemPrompt();
        setLoading(false);
    }, []);
    
    return (
        <Navbar>
            {loading ? <h1>Loading...</h1> : (
            <div>
            {cardModel.frontTemplate && <EditCardModelForm cardModel={cardModel} submitHandler={(frontTemplate, backTemplate) => console.log(frontTemplate, backTemplate)} />}
            <p>{systemPrompt}</p>
            </div>
            )}
        </Navbar>
    );
}