export interface LoginForm {
  email: string;
  password: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
}

export interface ApiError {
  message: string;
  response?: {
    status: number;
    data: {
      message?: string;
      errors?: Array<{
        defaultMessage: string;
        field: string;
        code: string;
      }>;
    };
  };
  config?: {
    url: string;
    data: LoginForm;
  };
} 