import { DbResult } from "./db";
import { update, getDatabase, ref, set, get } from "firebase/database";
import { app } from "../firebase";
import { v4 as uuidv4 } from "uuid";

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
  enter: string;
  exit?: string;
  status: SessionStatus;
}

const db = getDatabase(app);

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
  // TODO: change this to use push
  // https://firebase.google.com/docs/database/web/read-and-write#update_specific_fields
  set(ref(db, "sessions/" + session.id), { ...session });
}

function getOpenSession(
  plate: string,
  sessions: SessionCollection
): Session | undefined {
  return Object.values(sessions).find(
    (session: Session) =>
      session.plate === plate && session.status === SessionStatus.Active
  );
}

async function getSessions(): Promise<SessionCollection> {
  return get(ref(db, "sessions")).then((snapshot) => {
    return snapshot.exists() ? snapshot.val() : {};
  });
}

async function updateSession(session: Session): Promise<DbResult> {
  return update(ref(db, `sessions/${session.id}`), session)
    .then(() => {
      return { success: true };
    })
    .catch((message: string) => {
      return { success: false, message };
    });
}

// end session
export async function endSession(plate: string): Promise<DbResult> {
  const session: Session | undefined = getOpenSession(
    plate,
    await getSessions()
  );
  // no open session
  if (session === undefined) {
    return { success: false, error: "no open session found" };
  }

  // TODO: note at this point we are hoping no one else tries to end it before
  // we can update it (race condition).
  return updateSession({
    ...session,
    status: SessionStatus.Inactive,
    exit: new Date(Date.now()).toISOString(),
  });
}
