import ActivityState from "../Dashboard/ActivityState";
import EmptyState from "../Dashboard/EmptyState";
function Dashboard() {
    return (
        <div className="bg-gray-100 min-h-full">
            <ActivityState />
            {/* <EmptyState /> */}
        </div>
    );
}

export default Dashboard;