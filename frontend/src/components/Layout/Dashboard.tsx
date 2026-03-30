import ActivityState from "../Dashboard/ActivityState";
import EmptyState from "../Dashboard/EmptyState";
import axios from "axios";
import { useEffect, useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
    const [isEmptyState, setIsEmptyState] = useState(true)
    const [data, setData] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            if (!user?._id) return;
            try {
                const response = await axios.get(`${API_BASE_URL}/api/repositories/${user._id}`);
                const repos = response?.data?.data || [];
                console.log("Fetched repos:", repos);
                setData(repos);
                setIsEmptyState(repos.length === 0);
            } catch (error) {
                console.error("Error fetching repositories:", error);
                setIsEmptyState(true);
            }
        };

        fetchData();
    }, [user?._id]);

    return (
        <div className="bg-gray-100 min-h-full">
            {isEmptyState ? <EmptyState /> : <ActivityState data={data} />}

        </div>
    );
}

export default Dashboard;