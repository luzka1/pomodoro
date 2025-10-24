import { format } from "date-fns";

export function formatDate (date: number) {
    const formattedDate = format(new Date(date), "dd/MM/yyyy HH:mm");

    return formattedDate;
}