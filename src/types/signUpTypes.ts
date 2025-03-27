export interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  phone?: string;
}

export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
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
    data: SignUpForm;
  };
} 