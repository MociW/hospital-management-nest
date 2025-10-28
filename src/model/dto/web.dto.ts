export class WebResponse<T> {
  status: boolean;
  message: string;
  code: number;
  data?: T;
  errors?: string;
}
