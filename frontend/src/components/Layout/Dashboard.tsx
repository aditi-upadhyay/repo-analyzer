import ActivityState from "../Dashboard/ActivityState";
import EmptyState from "../Dashboard/EmptyState";
import axios from "axios";
import { useEffect, useState } from "react";
function Dashboard() {
    const [isEmptyState, setIsEmptyState] = useState(true)
    const [data, setData] = useState([]); // ✅ store response here
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://127.0.0.1:8000/api/repositories");

            const repos = response?.data?.data || [];

            setData(repos); // ✅ trigger re-render
            setIsEmptyState(repos.length === 0);
        };

        fetchData();
    }, []);

    return (
        <div className="bg-gray-100 min-h-full">
            {isEmptyState ? <EmptyState /> : <ActivityState data={data}/>}
            
        </div>
    );
}

export default Dashboard;