import ActivityState from "../Dashboard/ActivityState";
import EmptyState from "../Dashboard/EmptyState";
function Dashboard() {
    return (
        <div className="bg-gray-100">
            <ActivityState />
            {/* <EmptyState /> */}
        </div>
    );
}

export default Dashboard;