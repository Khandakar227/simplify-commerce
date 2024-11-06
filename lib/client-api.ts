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