"use client";
import { IProduct } from "@/models/Product";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import Edit_Card from "@/components/Edit_Card";

type ActionsCellProps = {
  product: IProduct;
};


export const ActionsCell = ({ product }: ActionsCellProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(product.image_url)}
          >
            Copy Image URL
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
            onSelect={(e) => e.preventDefault()}
          >
            Edit
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <Edit_Card open={open} product_id={product.id} setOpen={setOpen} />
      <DialogContent aria-describedby="Delete">
        <DialogHeader>
          <DialogTitle>Delete {product.product_name} ?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {product.product_name}? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              fetch(`/api/products/${product.id}`, {
                method: "DELETE",
              }).then((res) => {
                if (res.ok) {
                  window.location.reload();
                }
              });
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};