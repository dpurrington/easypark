import { app } from "../firebase";
import { getFirestore } from "firebase/firestore";

export interface DbResult {
  success: boolean;
  error?: string;
}

export const SuccessResult: DbResult = { success: true };

export const db = getFirestore(app);
