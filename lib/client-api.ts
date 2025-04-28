import { IProduct } from "./model/Product";

export const sellerSignUp = async (data: { name: string, email: string, password: string }) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    const res = await fetch("/api/seller/signup", options);
    const result = await res.json();
    return result;
}

export const sellerLogin = async (data: { email: string, password: string }) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    const res = await fetch("/api/seller/login", options);
    const result = await res.json();
    return result;
}

export const getSellerFromToken = async (accessToken: string) => {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };

    const res = await fetch("/api/seller", options);
    const result = await res.json();
    return result;
}

export const createProduct = async (data:Omit<IProduct, 'id'>) => {
    const token = localStorage.getItem('access_token');

    const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      
    const res = await fetch('/api/product', options)
    const result = await res.json();
    return result;
}

export const getProducts = async (params: { keyword?: string, category?: string, sortby?: string, order?: string, page?: string, seller?: boolean }) => {
    const searchParams = new URLSearchParams(params as any);
    const token = localStorage.getItem('access_token');
    const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
    };
    console.log(searchParams.toString());
    const res = await fetch(`/api/product?${searchParams}`, options);
    const result = await res.json();
    return result;
}

export const getCustomerFromToken = async (accessToken: string) => {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };

    const res = await fetch("/api/customer", options);
    const result = await res.json();
    return result;
}