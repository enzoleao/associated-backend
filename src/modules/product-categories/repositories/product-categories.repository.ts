import { Injectable } from '@nestjs/common';
import { ProductCategory } from '@prisma/client';
import { GetProductCategoriesRequestDto } from '../dtos/get-product-categories/get-product-categories-request.dto';

export interface IProductCategoriesRepository {
    getProductCategories(query: GetProductCategoriesRequestDto):Promise<ProductCategory[]>
}
