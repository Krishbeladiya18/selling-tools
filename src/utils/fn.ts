import moment from "moment";

export const formatCount = (count: number) => {
    return count.toString().padStart(2, "0");
};


export const formatDate = (date: Date | string, formatter: string = "DD/MM/YYYY") => {
    return moment(date).format(formatter);
};


export const formatAmount = (amount: number) => {
    return `₹ ${amount.toFixed(2)}`;
};
