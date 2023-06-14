export interface Category {
    id: string,
    name: string
}

export interface Product {
    id: string,
    title: string,
    price: number,
    images: string[],
    description: string,
    category: Category,
    taxes?: number
}

//Omit omite lo campos indicados
export interface CretateProductDTO extends Omit<Product, 'id' | 'category'>{
    categoryId: number
}

//Partial indica que los campos son opcionales
export interface UpdateProductDTO extends Partial<CretateProductDTO> { }