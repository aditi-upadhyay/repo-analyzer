import ActivityState from "../Dashboard/ActivityState";
import EmptyState from "../Dashboard/EmptyState";
import axios from "axios";
import { useEffect, useState } from "react";
function Dashboard() {
    const [isEmptyState, setIsEmptyState] = useState(true)
    const [data, setData] = useState([]); // ✅ store response here

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/repositories");
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
    }, []);

    return (
        <div className="bg-gray-100 min-h-full">
            {isEmptyState ? <EmptyState /> : <ActivityState data={data} />}

        </div>
    );
}

export default Dashboard;