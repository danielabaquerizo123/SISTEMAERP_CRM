import { BaseService } from '../../shared/baseService';
import { inventarioRepository } from './inventarioRepository';

class InventarioService extends BaseService {
  async getStockAll() {
    return inventarioRepository.findStockAll();
  }

  async getStockByProducto(productoId: number) {
    const stock = await inventarioRepository.findStockByProducto(productoId);
    if (!stock) throw new Error('Stock not found for this product');
    return stock;
  }

  async getMovements(productoId?: number) {
    return inventarioRepository.findMovements(productoId);
  }

  async registerMovement(data: {
    productoId: number;
    tipo: 'ENTRADA' | 'SALIDA';
    cantidad: number;
    motivo?: string;
    usuarioId: number;
  }) {
    this.validateEntity(data, ['productoId', 'tipo', 'cantidad', 'usuarioId']);

    const currentStock = await inventarioRepository.findStockByProducto(data.productoId);
    const currentCantidad = currentStock?.cantidad ?? 0;

    if (data.tipo === 'SALIDA' && currentCantidad < data.cantidad) {
      throw new Error('Insufficient stock');
    }

    const newCantidad = data.tipo === 'ENTRADA' ? currentCantidad + data.cantidad : currentCantidad - data.cantidad;

    const movement = await inventarioRepository.createMovement(data);
    await inventarioRepository.upsertStock(data.productoId, newCantidad);

    return movement;
  }
}

export const inventarioService = new InventarioService();
