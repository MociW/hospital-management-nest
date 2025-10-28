CREATE TYPE "user_role" AS ENUM (
  'SUPER_ADMIN',
  'ADMIN',
  'DOCTOR',
  'NURSE',
  'RECEPTIONIST',
  'PHARMACIST',
  'LAB_TECHNICIAN',
  'FINANCE_OFFICER',
  'HR_MANAGER'
);

CREATE TYPE "user_status" AS ENUM (
  'ACTIVE',
  'SUSPENDED',
  'INACTIVE'
);

CREATE TYPE "employment_status" AS ENUM (
  'ACTIVE',
  'ON_LEAVE',
  'RESIGNED',
  'TERMINATED'
);

CREATE TYPE "gender" AS ENUM (
  'MALE',
  'FEMALE',
  'OTHER',
  'UNKNOWN'
);

CREATE TYPE "blood_type" AS ENUM (
  'A_POS',
  'A_NEG',
  'B_POS',
  'B_NEG',
  'AB_POS',
  'AB_NEG',
  'O_POS',
  'O_NEG'
);

CREATE TYPE "marital_status" AS ENUM (
  'SINGLE',
  'MARRIED',
  'DIVORCED',
  'WIDOWED',
  'UNKNOWN'
);

CREATE TYPE "appointment_status" AS ENUM (
  'SCHEDULED',
  'CHECKED_IN',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
  'NO_SHOW',
  'RESCHEDULED'
);

CREATE TYPE "appointment_priority" AS ENUM (
  'ROUTINE',
  'URGENT',
  'STAT'
);

CREATE TYPE "visit_type" AS ENUM (
  'NEW',
  'FOLLOW_UP',
  'PROCEDURE',
  'VACCINATION',
  'TELEMED',
  'HOME_VISIT'
);

CREATE TYPE "channel" AS ENUM (
  'IN_PERSON',
  'VIDEO',
  'PHONE'
);

CREATE TABLE "departments" (
  "id" uuid PRIMARY KEY,
  "code" varchar UNIQUE NOT NULL,
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "head_id" uuid,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now()),
  "created_by" uuid,
  "updated_by" uuid,
  "deleted_at" timestamptz,
  "deleted_by" uuid
);

CREATE TABLE "employees" (
  "id" uuid PRIMARY KEY,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "full_name" varchar NOT NULL,
  "date_of_birth" timestamptz NOT NULL,
  "gender" gender NOT NULL,
  "phone" varchar,
  "citizen_id" varchar UNIQUE NOT NULL,
  "employee_code" varchar UNIQUE NOT NULL,
  "department_id" uuid,
  "user_status" user_status NOT NULL DEFAULT 'ACTIVE',
  "employment_status" employment_status NOT NULL DEFAULT 'ACTIVE',
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now()),
  "created_by" uuid,
  "updated_by" uuid,
  "deleted_at" timestamptz,
  "deleted_by" uuid,
  "token" varchar
);

CREATE TABLE "roles" (
  "id" uuid PRIMARY KEY,
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "is_system" bool NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now()),
  "deleted_at" timestamptz
);

CREATE TABLE "employee_roles" (
  "employee_id" uuid NOT NULL,
  "role_id" uuid NOT NULL,
  "assigned_at" timestamptz NOT NULL DEFAULT (now()),
  "assigned_by" uuid,
  PRIMARY KEY ("employee_id", "role_id")
);

CREATE TABLE "patients" (
  "id" uuid PRIMARY KEY,
  "mrn" varchar UNIQUE NOT NULL,
  "citizen_id" varchar UNIQUE,
  "first_name" varchar NOT NULL,
  "middle_name" varchar,
  "last_name" varchar,
  "date_of_birth" timestamptz NOT NULL,
  "date_of_death" timestamptz,
  "gender" gender,
  "blood_type" blood_type,
  "marital_status" marital_status,
  "email" varchar,
  "phone" varchar,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now()),
  "created_by" uuid,
  "updated_by" uuid,
  "deleted_at" timestamptz,
  "deleted_by" uuid
);

CREATE TABLE "appointments" (
  "id" uuid PRIMARY KEY,
  "provider_employee_id" uuid NOT NULL,
  "patient_id" uuid NOT NULL,
  "department_id" uuid,
  "visit_type" visit_type NOT NULL DEFAULT 'NEW',
  "channel" channel NOT NULL DEFAULT 'IN_PERSON',
  "reason" text,
  "priority" appointment_priority NOT NULL DEFAULT 'ROUTINE',
  "start_at" timestamptz NOT NULL,
  "end_at" timestamptz NOT NULL,
  "status" appointment_status NOT NULL DEFAULT 'SCHEDULED',
  "check_in_at" timestamptz,
  "check_out_at" timestamptz,
  "cancelled_at" timestamptz,
  "cancel_reason" varchar,
  "rescheduled_from_id" uuid,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now()),
  "created_by" uuid,
  "updated_by" uuid,
  "deleted_at" timestamptz,
  "deleted_by" uuid
);

CREATE TABLE "specialties" (
  "id" uuid PRIMARY KEY,
  "code" varchar UNIQUE NOT NULL,
  "name" varchar NOT NULL,
  "parent_id" uuid,
  "description" text,
  "is_active" bool NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "employee_specialties" (
  "employee_id" uuid NOT NULL,
  "specialty_id" uuid NOT NULL,
  "is_primary" bool NOT NULL DEFAULT false,
  "proficiency" varchar,
  "certification_no" varchar,
  "cert_authority" varchar,
  "certified_at" timestamptz,
  "expires_at" timestamptz,
  "department_id" uuid,
  "privileges" text,
  "assigned_at" timestamptz NOT NULL DEFAULT (now()),
  "revoked_at" timestamptz
);

CREATE UNIQUE INDEX ON "employee_specialties" ("employee_id", "specialty_id", "department_id");

CREATE INDEX ON "employee_specialties" ("specialty_id");

ALTER TABLE "departments" ADD FOREIGN KEY ("head_id") REFERENCES "employees" ("id");

ALTER TABLE "departments" ADD FOREIGN KEY ("created_by") REFERENCES "employees" ("id");

ALTER TABLE "departments" ADD FOREIGN KEY ("updated_by") REFERENCES "employees" ("id");

ALTER TABLE "departments" ADD FOREIGN KEY ("deleted_by") REFERENCES "employees" ("id");

ALTER TABLE "employees" ADD FOREIGN KEY ("department_id") REFERENCES "departments" ("id");

ALTER TABLE "employees" ADD FOREIGN KEY ("created_by") REFERENCES "employees" ("id");

ALTER TABLE "employees" ADD FOREIGN KEY ("updated_by") REFERENCES "employees" ("id");

ALTER TABLE "employees" ADD FOREIGN KEY ("deleted_by") REFERENCES "employees" ("id");

ALTER TABLE "employee_roles" ADD FOREIGN KEY ("employee_id") REFERENCES "employees" ("id");

ALTER TABLE "employee_roles" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "employee_roles" ADD FOREIGN KEY ("assigned_by") REFERENCES "employees" ("id");

ALTER TABLE "patients" ADD FOREIGN KEY ("created_by") REFERENCES "employees" ("id");

ALTER TABLE "patients" ADD FOREIGN KEY ("updated_by") REFERENCES "employees" ("id");

ALTER TABLE "patients" ADD FOREIGN KEY ("deleted_by") REFERENCES "employees" ("id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("provider_employee_id") REFERENCES "employees" ("id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("patient_id") REFERENCES "patients" ("id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("department_id") REFERENCES "departments" ("id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("rescheduled_from_id") REFERENCES "appointments" ("id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("created_by") REFERENCES "employees" ("id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("updated_by") REFERENCES "employees" ("id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("deleted_by") REFERENCES "employees" ("id");

ALTER TABLE "specialties" ADD FOREIGN KEY ("parent_id") REFERENCES "specialties" ("id");

ALTER TABLE "employee_specialties" ADD FOREIGN KEY ("employee_id") REFERENCES "employees" ("id");

ALTER TABLE "employee_specialties" ADD FOREIGN KEY ("specialty_id") REFERENCES "specialties" ("id");

ALTER TABLE "employee_specialties" ADD FOREIGN KEY ("department_id") REFERENCES "departments" ("id");
