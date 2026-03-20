export type TableStatus = "Analyzed" | "Processing" | "Failed";

export type TableColumn = {
    name: string;
    status: TableStatus;
    updated: string;
    color: string;
    action: string;
};