export type ApiResponse<T> =
  | {
      success: true;
      data: T;
      timestamp: Date;
    }
  | {
      success: false;
      error: string;
      timestamp: Date;
    };
