import DocumentationState from "./Documentation/DocumentationState";
import EmptyDocumentation from "./Documentation/EmptyDocumentation";
import { useAuth } from "../context/AuthContext";
import { useDocumentation } from "../context/DocumentationContext";

function Documentation() {
    const { documents } = useAuth();
    const { view, selectedRepo } = useDocumentation();

    // Show documentation state if we have documents OR if a specific repo is selected/details view is active
    const showDocumentation = documents.length > 0 || view === "details" || selectedRepo;

    return (
        <div className="w-full h-full">
            {showDocumentation ? <DocumentationState /> : <EmptyDocumentation />}
        </div>
    );
}

export default Documentation;