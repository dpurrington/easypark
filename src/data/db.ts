// not much going on here yet, but this interface will be shared across multiple data access types
export interface DbResult {
  success: boolean;
  error?: string;
}
