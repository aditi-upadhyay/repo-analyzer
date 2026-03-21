import DocumentationState from "./Documentation/DocumentationState";
import EmptyDocumentation from "./Documentation/EmptyDocumentation";
function Documentation() {
    return (
        <div className="w-full h-full">
            <DocumentationState />
            {/* <EmptyDocumentation /> */}
        </div>
    );
}

export default Documentation;