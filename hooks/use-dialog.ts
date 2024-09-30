import { create } from 'zustand'
import { ColumnsAction } from '@/types'
type DialogType = ColumnsAction['type']

interface DialogState {
  isOpen: boolean
  action: ColumnsAction | null
  data: any
  openDialog: (action: ColumnsAction, data?: any) => void
  closeDialog: () => void
}

const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  action: null,
  data: null,
  openDialog: (action, data = null) => set({ isOpen: true, action, data }),
  closeDialog: () => set({ isOpen: false, action: null, data: null }),
}))

export const useDialog = () => {
  const { isOpen, action, data, openDialog, closeDialog } = useDialogStore()

  return {
    isOpen,
    action,
    data,
    openDialog,
    closeDialog,
  }
}