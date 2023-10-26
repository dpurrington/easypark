import { getDatabase, ref, set } from "firebase/database";
import { app } from "../firebase";
import { v4 as uuidv4 } from "uuid";

export enum SessionStatus {
  Active = "active",
  Inactive = "inactive",
}

export interface Session {
  id: string;
  plate: string;
  phone: string;
  enter: string;
  exit?: string;
  status: SessionStatus;
}

const db = getDatabase(app);
// const sessionRef = ref(db, "sessions");

export function newSession(
  plate: string,
  phone: string,
  enter: string = new Date(Date.now()).toISOString(),
  status: SessionStatus = SessionStatus.Active
) {
  return {
    id: uuidv4(),
    plate: plate,
    phone: phone,
    enter: enter,
    status: status,
  };
}

// create session
export function createSession(session: Session) {
  console.log("creating session");
  set(ref(db, "sessions/" + session.id), { ...session });
}

// end session
export function endSession() {}
