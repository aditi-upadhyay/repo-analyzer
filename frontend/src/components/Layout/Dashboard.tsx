import ActivityState from "../Dashboard/ActivityState";
import EmptyState from "../Dashboard/EmptyState";
import { useDocumentation } from "../../context/DocumentationContext";

function Dashboard() {
    const { repositories, isLoading } = useDocumentation();

    if (isLoading && repositories.length === 0) {
        return (
            <div className="bg-gray-100 min-h-full flex items-center justify-center">
                <span className="text-slate-500">Loading your repositories...</span>
            </div>
        );
    }

    const isEmptyState = repositories.length === 0;

    return (
        <div className="bg-gray-100 min-h-full">
            {isEmptyState ? <EmptyState /> : <ActivityState data={repositories} />}
        </div>
    );
}

export default Dashboard;