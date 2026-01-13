import { AdminTitle } from "@/admin/components/AdminTitle";
import {useReactTable, getCoreRowModel, type ColumnDef, type SortingState, getSortedRowModel, type ColumnFiltersState, getFilteredRowModel, flexRender} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useRef, useState, type KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Link, useSearchParams} from "react-router";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useProducts } from "@/shopFrontend/hooks/useProducts";
import type { Product } from "@/shopFrontend/types/product.type";
import { Spinner } from "@/components/ui/spinner";
import { CustomPagination } from "@/components/custom/CustomPagination";


export function AdminProductsPage(){

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [param, setParam] = useSearchParams();

    const searchValue = param.get("search") ?? "";

    const inputRef = useRef<HTMLInputElement | null>(null);

    const {data: productsData, isLoading} = useProducts();

    const columns: ColumnDef<Product>[] = [
       {
        accessorKey: "images",
        header: "Imagen",
        cell: ({row}) => {
            const dataImage = row.getValue("images") as string[];
            const image = dataImage[0] ?? "";
            return (
                <img src={image} alt="producto" className="w-15"/>
            )
        }
       },
       {
        accessorKey: "title",
        header: "Nombre"
       },
       {
        accessorKey: "price",
        header: "Precio",
        cell: ({row}) => {
            const price = Number(row.getValue("price")) ?? 0;
            return `${price.toFixed(2)}`;
        }
       },
       {
        accessorKey: "gender",
        header: "genero"
       },
       {
        accessorKey: "stock",
        header: "Stock",
        cell: ({row}) => {
            const stock = Number(row.getValue("stock")) || 0;

            return (
                <p className={stock === 0 ? `text-red-500` : `text-green-500`}>{stock}</p>
            );
        }
       },
       {
        accessorKey: "sizes",
        header: "Tallas",
        cell: ({row}) => {
            const sizes = row.getValue("sizes") as string[];
            return sizes.join(", ") ?? "-";
        }
       },
       {
        id: "actions",
        header: "Action",
        cell: ({row}) => {
            const product = row.original;

            return(
                <Link to={`/admin/products/${product.id}`}>
                    <Button variant="outline">
                        Ver
                    </Button>
                </Link>
            )
        }
       }
    ];

    const table = useReactTable({
        data: productsData?.products ?? [],
        columns,
        state: {
            sorting,
            columnFilters
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const handleSearchInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== "Enter") return;

        const newParam = new URLSearchParams();
        const valueInput = inputRef.current?.value ?? "";
        
        if(!valueInput){
            newParam.delete("search");
        }else{
            newParam.set("search", valueInput as string);
        }

        setParam(newParam)
    };

    return(
        <>
            <AdminTitle description="Productos disponibles" title="Panel Administrador de Productos"/>

            <div className="flex flex-row-reverse">
                <Link to="/admin/products/new">
                    <Button variant="default" className="w-40 mb-2">
                        <PlusIcon/>
                        Nuevo Producto
                    </Button>
                </Link>
            </div>

            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="flex flex-row gap-2">
                            <Input type="text" 
                            placeholder="Buscar por nombre"
                            ref={inputRef}
                            onKeyDown={handleSearchInput}
                            className="w-48"
                            defaultValue={searchValue}
                            />
                        </TableHead>
                    </TableRow>

                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center py-10">
                                <Spinner className="mx-auto" />
                            </TableCell>
                        </TableRow>
                    ) : (
                        <>
                            {table.getHeaderGroups().map((tb) => (
                                <TableRow key={tb.id}>
                                
                                    {
                                        tb.headers.map((h) => (
                                            <TableHead key={h.id} 
                                            onClick={h.column.getToggleSortingHandler()}
                                            style={{cursor: "pointer"}}
                                            >
                                                {h.column.columnDef.header as string}

                                                {
                                                    {
                                                        asc: " ↑",
                                                        desc: " ↓",
                                                    }[h.column.getIsSorted() as string] ?? null
                                                }
                                            </TableHead>
                                        )) 
                                    }
                                </TableRow>
                            ))}
                        </>
                    )}
                   
                       
                </TableHeader>
                <TableBody>
                    {
                        table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {
                                    row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {
                                                flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )
                                            }
                                        </TableCell>
                                    ))
                                }

                                
                            </TableRow>
                        ))
                    }
                    
                </TableBody>
            </Table>
            <div className="flex justify-center gap-2 mt-4">
                <CustomPagination totalPages={productsData?.pages ?? 1}/>
            </div>
        </>
    );
};