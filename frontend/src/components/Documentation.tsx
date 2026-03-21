import EmptyDocumentation from "./Documentation/EmptyDocumentation";
import DocumentationState from "./Documentation/DocumentationState";
function Documentation() {
    return (
        <div className="w-full h-full">
            {/* <EmptyDocumentation /> */}
            <DocumentationState />
        </div>
    );
}

export default Documentation;