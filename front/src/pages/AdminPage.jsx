import { useState, useEffect } from "react";
import axios_instance from "../../constants/axios";
import Navbar from "@/components/Navbar";
import { requests } from "../../constants/requests";
import EditCardModelForm from "@/components/EditCardModelForm";
import EditSystemPromptForm from "@/components/EditSystemPromptForm";
import { useToast } from "@/components/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast";

export function AdminPage() {
    const [cardModel, setCardModel] = useState({});
    const [systemPrompt, setSystemPrompt] = useState('');
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

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

    const submitCardModel = async (newFrontTemplate, newBackTemplate, undo=false) => {
        try {
            const prevCardModel = cardModel;
            setCardModel({ frontTemplate: newFrontTemplate, backTemplate: newBackTemplate });
            const response = await axios_instance.patch(requests.editCardModel, { frontTemplate: newFrontTemplate, backTemplate: newBackTemplate });
            console.log(response.data);
            toast({
                title: undo ? 'Undo Successful' : 'Card Model Updated',
                description: undo ? 'Card model has been reverted to previous values' : 'Card model updated successfully',
                action: undo ? null : <ToastAction altText="undo" onClick={() => submitCardModel(prevCardModel.frontTemplate, prevCardModel.backTemplate, true)}>Undo</ToastAction>,
            });
        } catch (error) {
            console.error(error);
            toast({
                title: 'Card Model Update Failed',
                description: error.message,
                action: <ToastAction altText="retry" onClick={() => submitCardModel(newFrontTemplate, newBackTemplate)}>Retry</ToastAction>,
                variant: 'destructive',
            });
        }
    };

    const submitSystemPrompt = async (newPrompt, undo=false) => {
        try {
            const prevSystemPrompt = systemPrompt;
            setSystemPrompt(newPrompt);
            const response = await axios_instance.put(requests.editSystemPrompt, { newPrompt: newPrompt });
            console.log(response.data);
            toast({
                title: undo ? 'Undo Successful' : 'System Prompt Updated',
                description: undo ? 'System prompt has been reverted to previous value' : 'System prompt updated successfully',
                action: undo ? null : <ToastAction altText="undo" onClick={() => submitSystemPrompt(prevSystemPrompt, true)}>Undo</ToastAction>,
            });
        } catch (error) {
            console.error(error);
            toast({
                title: 'System Prompt Update Failed',
                description: error.message,
                action: <ToastAction altText="retry" onClick={() => submitSystemPrompt(systemPrompt)}>Retry</ToastAction>,
                variant: 'destructive',
            });
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
            <div className="h-screen">
                <div className="flex flex-row h-full">
                    {cardModel.frontTemplate && <EditCardModelForm cardModel={cardModel} submitHandler={submitCardModel} />}
                    {systemPrompt && <EditSystemPromptForm systemPrompt={systemPrompt} submitHandler={submitSystemPrompt} />}
                </div>
            </div>
            )}
        </Navbar>
    );
}