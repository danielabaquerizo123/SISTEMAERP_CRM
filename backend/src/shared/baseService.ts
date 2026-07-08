export class BaseService {
  protected validateEntity<T>(data: T, requiredFields: (keyof T)[]): void {
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        throw new Error(`Field ${String(field)} is required`);
      }
    }
  }
}
