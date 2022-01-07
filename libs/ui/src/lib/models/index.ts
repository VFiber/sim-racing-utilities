export enum ValueOperationType {
  Add,
  Replace
}
export interface FastInputButton {
  title: string,
  value: number,
  type?: ValueOperationType
}
