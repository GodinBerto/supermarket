export interface LoginTypes {
  email: string;
  password: string;
}

export interface ItemsTypes {
  id?: number;
  name?: string;
  stock_quantity?: number;
  category?: string;
  supplier_name?: string;
  discription?: string;
  description?: string;
  department?: string;
}

export interface CategoriesTypes {
  id?: number | undefined;
  name: string;
}

export interface DepartmentsTypes {
  id?: number | undefined;
  name: string;
  description?: string;
}

export interface StaffTypes {
  name: any;
  id?: number | undefined;
  email: string;
  phone: number;
  department: string;
  role: string;
  password: string;
}

export const API_BASE_URL = "http://127.0.0.1:8000/api/v1/";
