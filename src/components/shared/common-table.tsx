import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
} from "@/components/ui/table";

type Column<T> = {
    header: string;
    accessor: keyof T;
}

type DataTableProps<T> = {
    columns: Column<T>[];
    data: T[];
    footerData?: Partial<Record<keyof T, React.ReactNode>>;
};

export function DataTable<T>({ columns, data, footerData }: DataTableProps<T>) {
    return (
        <Table className="divide-y divide-input">
            <TableHeader>
                <TableRow className="bg-gray-300">
                    {columns.map((col, index) => (
                        <TableHead key={index}>{col.header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row, rowIdx) => (
                    <TableRow key={rowIdx}>
                        {columns.map((col, colIdx) => (
                            <TableCell key={colIdx}>{String(row[col.accessor] ?? "")}</TableCell>
                        ))}
                    </TableRow>
                ))}
                {footerData && (
                    <TableRow className="font-semibold bg-muted/30">
                        {columns.map((col, colIdx) => (
                            <TableCell key={colIdx}>
                                {colIdx === 0
                                    ? "Total"
                                    : footerData[col.accessor] ?? ""}
                            </TableCell>
                        ))}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
