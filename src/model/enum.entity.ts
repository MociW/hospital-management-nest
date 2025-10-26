export class UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN';
  ADMIN = 'ADMIN';
  DOCTOR = 'DOCTOR';
  NURSE = 'NURSE';
  RECEPTIONIST = 'RECEPTIONIST';
  PHARMACIST = 'PHARMACIST';
  LAB_TECHNICIAN = 'LAB_TECHNICIAN';
  FINANCE_OFFICER = 'FINANCE_OFFICER';
  HR_MANAGER = 'HR_MANAGER';
}

export class UserStatus {
  // account status
  ACTIVE = 'ACTIVE';
  SUSPENDED = 'SUSPENDED';
  INACTIVE = 'INACTIVE';
}

export class EmploymentStatus {
  // job relationship
  ACTIVE = 'ACTIVE';
  ON_LEAVE = 'ON_LEAVE';
  RESIGNED = 'RESIGNED';
  TERMINATED = 'TERMINATED';
}

export class Gender {
  MALE = 'MALE';
  FEMALE = 'FEMALE';
  OTHER = 'OTHER';
  UNKNOWN = 'UNKNOWN';
}

export class BloodType {
  A_POS = 'A_POS';
  A_NEG = 'A_NEG';
  B_POS = 'B_POS';
  B_NEG = 'B_NEG';
  AB_POS = 'AB_POS';
  AB_NEG = 'AB_NEG';
  O_POS = 'O_POS';
  O_NEG = 'O_NEG';
}

export class MaritalStatus {
  SINGLE = 'SINGLE';
  MARRIED = 'MARRIED';
  DIVORCED = 'DIVORCED';
  WIDOWED = 'WIDOWED';
  UNKNOWN = 'UNKNOWN';
}

export class AppointmentStatus {
  SCHEDULED = 'SCHEDULED';
  CHECKED_IN = 'CHECKED_IN';
  IN_PROGRESS = 'IN_PROGRESS';
  COMPLETED = 'COMPLETED';
  CANCELLED = 'CANCELLED';
  NO_SHOW = 'NO_SHOW';
  RESCHEDULED = 'RESCHEDULED';
}

export class AppointmentPriority {
  ROUTINE = 'ROUTINE';
  URGENT = 'URGENT';
  STAT = 'STAT';
}

export class VisitType {
  NEW = 'NEW';
  FOLLOW_UP = 'FOLLOW_UP';
  PROCEDURE = 'PROCEDURE';
  VACCINATION = 'VACCINATION';
  TELEMED = 'TELEMED';
  HOME_VISIT = 'HOME_VISIT';
}

export class Channel {
  IN_PERSON = 'IN_PERSON';
  VIDEO = 'VIDEO';
  PHONE = 'PHONE';
}
