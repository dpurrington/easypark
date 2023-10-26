enum SessionStatus {
  Active,
  Inactive,
}

interface Session {
  plate: string;
  phone: string;
  enter: string;
  exit: string;
  status: SessionStatus;
}
