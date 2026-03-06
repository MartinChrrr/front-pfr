export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface JSendSuccess<T> {
  status: "success";
  data: T;
}

export interface JSendFail {
  status: "fail";
  data: Record<string, string[]>;
}

export interface JSendError {
  status: "error";
  message: string;
}

export type JSendResponse<T> = JSendSuccess<T> | JSendFail | JSendError;
