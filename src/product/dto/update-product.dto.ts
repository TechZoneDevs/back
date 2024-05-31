export class UpdateProductDto {
  name: string;
  price?: number;
  vendedorId?: number;
  marca?: string;
  status?: string;
  description?: string;
  stock?: number;
  idLocation?: number;
  idCategory?: number;
  descuento?: number;
}
