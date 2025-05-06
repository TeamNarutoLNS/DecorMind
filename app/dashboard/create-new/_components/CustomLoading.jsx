"use client";

import React from "react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        {/* Add an accessible title */}
        <AlertDialogTitle>Loading</AlertDialogTitle> 

        <div className="bg-white flex flex-col items-center my-10 justify-center">
          <img src="/Load.gif" alt="loading" width="100" height="100" />
          <p className="text-gray-700 mt-4">Redesigning your Room...
             Do not Refresh..</p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;
