import DocumentationState from "./Documentation/DocumentationState";
import EmptyDocumentation from "./Documentation/EmptyDocumentation";
import { useAuth } from "../context/AuthContext";

function Documentation() {

    const {documents} = useAuth()

    return (
        <div className="w-full h-full">
            {documents.length > 0 ? <DocumentationState /> : <EmptyDocumentation />}
            
        </div>
    );
}

export default Documentation;