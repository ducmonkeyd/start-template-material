export interface SnackbarData {
    title: string;
    content: string;
    confirmText: string;
    closeText: string;
    type: MessageType;
  }

export interface DialogData {
  title: string;
  content: string;
  subContent: string;
  confirmText: string;
  closeText: string;
}

export enum MessageType {
  ormal = 0,
  Error = 1,
  Warning = 2,
  Success = 3
}
