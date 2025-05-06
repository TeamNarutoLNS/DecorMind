import React from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog"; // adjust path if needed
import { Button } from '@/components/ui/button';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';

function AiOutputDialog({ openDialog, closeDialog, orgImage, aiImage }) {
    const isValidImage = (url) =>
        typeof url === 'string' && url.startsWith('http') && !url.includes('undefined');

    const isValidImages = isValidImage(orgImage) && isValidImage(aiImage);

    if (!isValidImages) {
        return null; // Prevent rendering if images are invalid
    }

    return (
        <AlertDialog open={openDialog} onOpenChange={(isOpen) => closeDialog(isOpen)}>
            <AlertDialogContent className="sm:max-w-[600px]">
                <AlertDialogHeader>
                    <AlertDialogTitle>AI Remodeling Result</AlertDialogTitle>
                    <AlertDialogDescription>
                        Use the slider to compare the original room with the AI-generated remodel.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="w-full h-[300px]">
                    <ReactBeforeSliderComponent
                        firstImage={{ imageUrl: orgImage }}
                        secondImage={{ imageUrl: aiImage }}
                    />
                </div>

                {/* Top Right Close Button */}
                <div className="absolute top-4 right-4">
                    <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => closeDialog(false)}
                    >
                        X
                    </button>
                </div>

                {/* Footer Close Button */}
                <div className="text-center mt-12">
                    <Button
                        className="bg-gray-700 text-white px-4 py-2 rounded"
                        onClick={() => closeDialog(false)}
                    >
                        Close 
                    </Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}


export default AiOutputDialog;
