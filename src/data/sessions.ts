import { DbResult, SuccessResult, db } from "./db";
import { v4 as uuidv4 } from "uuid";
import {
  query,
  where,
  addDoc,
  updateDoc,
  getDocs,
  serverTimestamp,
  collection,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";

export enum SessionStatus {
  Active = "active",
  Inactive = "inactive",
}

export interface SessionCollection {
  [key: string]: Session;
}

export interface Session {
  id: string;
  plate: string;
  phone: string;
  enter?: Date;
  exit?: Date;
  status: SessionStatus;
}

export function newSession(
  plate: string,
  phone: string,
  status: SessionStatus = SessionStatus.Active
): Session {
  return {
    id: uuidv4(),
    plate: plate,
    phone: phone,
    status: status,
  };
}

export async function createSession(session: Session): Promise<DbResult> {
  // TODO: there is a race condition here.
  // Need to use a transaction where we read a snapshot
  // and create the new doc within the transaction.
  if ((await getOpenSession(session.plate)) !== undefined) {
    return {
      success: false,
      error: "Cannot create a new open session. One already exists.",
    };
  }

  try {
    await addDoc(collection(db, "sessions"), {
      ...session,
      enter: serverTimestamp(),
    });
    return SuccessResult;
  } catch (e: any) {
    return { success: false, error: e.toString() };
  }
}

async function getOpenSession(
  plate: string
): Promise<DocumentData | undefined> {
  console.log("Getting open session for " + plate);
  const sessionsRef = collection(db, "sessions");

  const q = query(
    sessionsRef,
    where("plate", "==", plate),
    where("status", "==", SessionStatus.Active)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.size === 0 ? undefined : querySnapshot.docs[0];
}

export async function endSession(plate: string): Promise<DbResult> {
  try {
    const session: DocumentData | undefined = await getOpenSession(plate);
    if (!session) {
      console.log(session);
      return { success: false, error: "No active sessions for this vehicle" };
    }

    await updateDoc(session.ref, {
      status: SessionStatus.Inactive,
      exit: serverTimestamp(),
    });
    return SuccessResult;
  } catch (e) {
    console.log(`Error updating session: ${e}`);
    return { success: false, error: "Database error." };
  }
}

export function subscribeToUpdates(handler: any): void {
  const collectionRef = collection(db, "sessions");
  onSnapshot(query(collectionRef), handler);
}
