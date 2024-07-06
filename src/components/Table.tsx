import { ReactNode } from "react";
import {
    Table as TableUI,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface TColumns {
    label?: string;
    render: (props) => ReactNode;
    accessorKey: string;
}

interface TableProps<TData> {
    data: TData[];
    columns: TColumns[];
    onRowClick?: (props: unknown) => void;
}

export const Table = <TData extends unknown>({
    data,
    columns,
    onRowClick,
}: TableProps<unknown[]>): ReactNode => {
    return (
        <div className="overflow-x-auto max-h-96 my-8">
            <TableUI>
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        {columns.map((col: TColumns) => (
                            <TableHead key={col?.accessorKey}>
                                {col?.label ?? col?.accessorKey}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {(data ?? [])?.map((row, id) => (
                        <TableRow
                            key={id}
                            onClick={(props) =>
                                typeof onRowClick === "function" &&
                                onRowClick({ row, ...props })
                            }
                        >
                            <TableCell>{id}</TableCell>

                            {columns.map((col: TColumns) => (
                                <TableCell key={`${id}-${col?.accessorKey}`}>
                                    {typeof col?.render === "function"
                                        ? col.render({
                                            value: row[col?.accessorKey],
                                            rowId: id,
                                            row,
                                        })
                                        : row[col?.accessorKey]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </TableUI>
        </div>
    );
};
