import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import { requests } from "../../constants/requests";
import axios_instance from "../../constants/axios";
import { LogOut } from 'lucide-react';

export default function Logout() {
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
        await axios_instance.post(requests.logout, {}, { withCredentials: true });
        secureLocalStorage.clear();
        navigate('/login');
        } catch (error) {
        console.error(error);
        }
    }
    
    return (
        <div  className="text-gray-300 hover:bg-gray-700 hover:text-white group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium ">
            <LogOut className="text-gray-400 group-hover:text-gray-300 mr-4 size-6 shrink-0" aria-hidden="true" />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}