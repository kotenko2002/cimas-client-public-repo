export interface CreateProductRequest {
    name: string;
    price: number;
}

export interface ProductResponse {
    id: string;
    name: string;
    price: number;
    amount: number;
    soldAmount: number;
    incomeAmount: number;
}

export interface UpdateProductsRequest {
    products: UpdateProductRequestModel[];
}

export interface UpdateProductRequestModel {
    id: string;
    name: string;
    price: number;
    amount: number;
    soldAmount: number;
    incomeAmount: number;
}
