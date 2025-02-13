export interface LoginTypes {
  email: string;
  password: string;
}

export interface ItemsTypes {
  id?: number;
  name: string;
  stock_quantity: number;
  category: string;
  supplier_name: string;
  discription: string;
  description?: string;
}

export const API_BASE_URL = "http://127.0.0.1:8000/api/v1/";
