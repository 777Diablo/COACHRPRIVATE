import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
} from "@/components/ui/alert-dialog"
import { HiProgress } from '@hidstech/common_components'

const CustomLoader = ({ show = false, message = "Loading...", progress = 0 }: { show?: boolean, message?: string, progress?: number }) => {
    return (
        <AlertDialog open={show}>
            <AlertDialogContent>
                <div className="flex flex-col items-center justify-center">
                    <p className="mb-4">{message}</p>
                    {progress > 0 ? <HiProgress className='h-2' value={progress} /> : null}
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CustomLoader