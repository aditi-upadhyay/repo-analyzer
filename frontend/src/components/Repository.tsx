import RepositoryState from "./Repository/RepositoryState";
import EmptyRepository from "./Repository/EmptyRepository";
function Repository() {
    return (
        <div className="h-full bg-gray-100 flex">
            <RepositoryState />
            {/* <EmptyRepository /> */}
        </div>
    );
}

export default Repository;
