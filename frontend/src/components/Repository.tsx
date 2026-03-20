import EmptyRepository from "./Repository/EmptyRepository";
import RepositoryState from "./Repository/RepositoryState";
function Repository() {
    return (
        <div className="h-full bg-gray-100 flex justify-center">
            <EmptyRepository />
            {/* <RepositoryState /> */}
        </div>
    );
}

export default Repository;
