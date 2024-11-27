export interface confirmDialog {
  size?: string;
  type: string;
  message: string;
  confirmText: string;
  cancelText: string;
  css?: string;
}

export interface CustomTemplateComponent {
  data: any;
  id: string;
  createdby: string;
  emrapiurl: string;
  deptId: string;
  siteId: string;
  moduleName: string;
}
