import type * as React from 'react';

export type BeforeUploadFileType = File | Blob | boolean | string;

export type Action = string | ((file: RcFile) => string | PromiseLike<string>);

export interface UploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onError' | 'onProgress'> {
  name?: string;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
  component?: React.JSXElementConstructor<any>;
  action?: Action;
  method?: UploadRequestMethod;
  processData?: boolean;
  directory?: boolean;
  data?: object | ((file: RcFile | string | Blob) => object);
  headers?: UploadRequestHeader;
  accept?: string;
  multiple?: boolean;
  onBatchStart?: (
    fileList: { file: RcFile; parsedFile: Exclude<BeforeUploadFileType, boolean> }[],
  ) => void;
  onStart?: (file: RcFile) => void;
  onError?: (error: Error, ret: object, file: RcFile) => void;
  onSuccess?: (response: object, file: RcFile, xhr: object) => void;
  onProgress?: (event: UploadProgressEvent, file: RcFile) => void;
  beforeUpload?: (
    file: RcFile,
    FileList: RcFile[],
  ) => BeforeUploadFileType | Promise<void | BeforeUploadFileType>;
  customRequest?: (option: UploadRequestOption) => void;
  withCredentials?: boolean;
  openFileDialogOnClick?: boolean;
  prefixCls?: string;
  id?: string;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
}

export interface UploadProgressEvent extends ProgressEvent {
  percent: number;
}

export type UploadRequestMethod = 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';

export type UploadRequestHeader = Record<string, string>;

export interface UploadRequestError extends Error {
  status?: number;
  method?: UploadRequestMethod;
  url?: string;
}

export interface UploadRequestOption<T = any> {
  onProgress?: (event: UploadProgressEvent) => void;
  onError?: (event: UploadRequestError | ProgressEvent, body?: T) => void;
  onSuccess?: (body: T, xhr: XMLHttpRequest) => void;
  data?: object;
  filename?: string;
  file: Exclude<BeforeUploadFileType, File | boolean> | RcFile;
  withCredentials?: boolean;
  action: string;
  headers?: UploadRequestHeader;
  method: UploadRequestMethod;
  processData: boolean;
}

export interface RcFile extends File {
  uid: string;
}
