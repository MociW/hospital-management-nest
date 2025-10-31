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

-- Departments Table
CREATE TABLE "departments"
(
    "id"          UUID PRIMARY KEY,
    "code"        VARCHAR(50) UNIQUE  NOT NULL,
    "name"        VARCHAR(255) UNIQUE NOT NULL,
    "description" TEXT,
    "head_id"     UUID,
    "is_active"   BOOLEAN             NOT NULL DEFAULT true,
    "created_at"  TIMESTAMPTZ         NOT NULL,
    "updated_at"  TIMESTAMPTZ         NOT NULL,
    "created_by"  UUID,
    "updated_by"  UUID,
    "deleted_at"  TIMESTAMPTZ,
    "deleted_by"  UUID
);

COMMENT ON TABLE "departments" IS 'Hospital departments and organizational units';
COMMENT ON COLUMN "departments"."code" IS 'Unique department code (e.g., CARD, ORTHO)';
COMMENT ON COLUMN "departments"."head_id" IS 'Employee ID of department head';

-- Employees Table
CREATE TABLE "employees"
(
    "id"                UUID PRIMARY KEY,
    "email"             VARCHAR(255) UNIQUE NOT NULL,
    "password"          VARCHAR(255)        NOT NULL,
    "full_name"         VARCHAR(255)        NOT NULL,
    "date_of_birth"     DATE                NOT NULL,
    "gender"            gender              NOT NULL,
    "phone"             VARCHAR(20),
    "citizen_id"        VARCHAR(50) UNIQUE  NOT NULL,
    "employee_code"     VARCHAR(50) UNIQUE  NOT NULL,
    "department_id"     UUID,
    "user_status"       user_status         NOT NULL DEFAULT 'ACTIVE',
    "employment_status" employment_status   NOT NULL DEFAULT 'ACTIVE',
    "hire_date"         DATE,
    "termination_date"  DATE,
    "created_at"        TIMESTAMPTZ         NOT NULL,
    "updated_at"        TIMESTAMPTZ         NOT NULL,
    "deleted_at"        TIMESTAMPTZ
);

COMMENT ON TABLE "employees" IS 'Hospital staff and employees';
COMMENT ON COLUMN "employees"."employee_code" IS 'Unique employee identifier';

-- Roles Table
CREATE TABLE "roles"
(
    "id"          SERIAL PRIMARY KEY,
    "name"        VARCHAR(100) UNIQUE NOT NULL,
    "description" TEXT,
    "is_system"   BOOLEAN             NOT NULL DEFAULT true,
    "is_active"   BOOLEAN             NOT NULL DEFAULT true,
    "created_at"  TIMESTAMPTZ         NOT NULL,
    "updated_at"  TIMESTAMPTZ         NOT NULL,
    "deleted_at"  TIMESTAMPTZ
);

COMMENT ON TABLE "roles" IS 'User roles for access control';
COMMENT ON COLUMN "roles"."is_system" IS 'System-defined role (cannot be deleted)';

-- Employee Roles Junction Table
CREATE TABLE "employee_roles"
(
    "employee_id" UUID        NOT NULL,
    "role_id"     INTEGER     NOT NULL,
    "assigned_at" TIMESTAMPTZ NOT NULL,
    "assigned_by" UUID,
    "revoked_at"  TIMESTAMPTZ,
    PRIMARY KEY ("employee_id", "role_id")
);

COMMENT ON TABLE "employee_roles" IS 'Many-to-many relationship between employees and roles';

-- Patients Table
CREATE TABLE "patients"
(
    "id"                      UUID PRIMARY KEY,
    "mrn"                     VARCHAR(50) UNIQUE NOT NULL,
    "citizen_id"              VARCHAR(50) UNIQUE,
    "first_name"              VARCHAR(100)       NOT NULL,
    "middle_name"             VARCHAR(100),
    "last_name"               VARCHAR(100),
    "date_of_birth"           DATE               NOT NULL,
    "date_of_death"           DATE,
    "gender"                  gender,
    "blood_type"              blood_type,
    "marital_status"          marital_status,
    "email"                   VARCHAR(255),
    "phone"                   VARCHAR(20),
    "address"                 TEXT,
    "emergency_contact_name"  VARCHAR(255),
    "emergency_contact_phone" VARCHAR(20),
    "is_active"               BOOLEAN            NOT NULL DEFAULT true,
    "created_at"              TIMESTAMPTZ        NOT NULL,
    "updated_at"              TIMESTAMPTZ        NOT NULL,
    "created_by"              UUID,
    "updated_by"              UUID,
    "deleted_at"              TIMESTAMPTZ,
    "deleted_by"              UUID
);

COMMENT ON TABLE "patients" IS 'Patient demographic and contact information';
COMMENT ON COLUMN "patients"."mrn" IS 'Medical Record Number - unique patient identifier';

-- Specialties Table
CREATE TABLE "specialties"
(
    "id"          UUID PRIMARY KEY,
    "code"        VARCHAR(50) UNIQUE NOT NULL,
    "name"        VARCHAR(255)       NOT NULL,
    "parent_id"   UUID,
    "description" TEXT,
    "is_active"   BOOLEAN            NOT NULL DEFAULT true,
    "created_at"  TIMESTAMPTZ        NOT NULL,
    "updated_at"  TIMESTAMPTZ        NOT NULL
);

COMMENT ON TABLE "specialties" IS 'Medical specialties and sub-specialties';
COMMENT ON COLUMN "specialties"."parent_id" IS 'For hierarchical specialties (e.g., Cardiology > Interventional Cardiology)';

-- Employee Specialties Junction Table
CREATE TABLE "employee_specialties"
(
    "employee_id"      UUID        NOT NULL,
    "specialty_id"     UUID        NOT NULL,
    "department_id"    UUID,
    "is_primary"       BOOLEAN     NOT NULL DEFAULT false,
    "proficiency"      VARCHAR(50),
    "certification_no" VARCHAR(100),
    "cert_authority"   VARCHAR(255),
    "certified_at"     DATE,
    "expires_at"       DATE,
    "privileges"       TEXT,
    "assigned_at"      TIMESTAMPTZ NOT NULL,
    "revoked_at"       TIMESTAMPTZ,
    PRIMARY KEY ("employee_id", "specialty_id", "department_id")
);

COMMENT ON TABLE "employee_specialties" IS 'Employee qualifications and specialties';
COMMENT ON COLUMN "employee_specialties"."is_primary" IS 'Primary specialty for the employee';

-- Appointments Table
CREATE TABLE "appointments"
(
    "id"                   UUID PRIMARY KEY,
    "patient_id"           UUID                 NOT NULL,
    "provider_employee_id" UUID                 NOT NULL,
    "department_id"        UUID,
    "visit_type"           visit_type           NOT NULL DEFAULT 'NEW',
    "channel"              channel              NOT NULL DEFAULT 'IN_PERSON',
    "reason"               TEXT,
    "priority"             appointment_priority NOT NULL DEFAULT 'ROUTINE',
    "start_at"             TIMESTAMPTZ          NOT NULL,
    "end_at"               TIMESTAMPTZ          NOT NULL,
    "status"               appointment_status   NOT NULL DEFAULT 'SCHEDULED',
    "check_in_at"          TIMESTAMPTZ,
    "check_out_at"         TIMESTAMPTZ,
    "cancelled_at"         TIMESTAMPTZ,
    "cancel_reason"        TEXT,
    "rescheduled_from_id"  UUID,
    "notes"                TEXT,
    "created_at"           TIMESTAMPTZ          NOT NULL,
    "updated_at"           TIMESTAMPTZ          NOT NULL,
    "created_by"           UUID,
    "updated_by"           UUID,
    "deleted_at"           TIMESTAMPTZ,
    "deleted_by"           UUID
);

COMMENT ON TABLE "appointments" IS 'Patient appointments and visits';
COMMENT ON COLUMN "appointments"."provider_employee_id" IS 'Healthcare provider for this appointment';

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Departments
-- CREATE INDEX idx_departments_head ON departments (head_id) WHERE deleted_at IS NULL;
-- CREATE INDEX idx_departments_active ON departments (is_active) WHERE deleted_at IS NULL;
-- 
-- -- Employees
-- CREATE INDEX idx_employees_department ON employees (department_id) WHERE deleted_at IS NULL;
-- CREATE INDEX idx_employees_status ON employees (user_status, employment_status) WHERE deleted_at IS NULL;
-- CREATE INDEX idx_employees_email ON employees (email) WHERE deleted_at IS NULL;
-- 
-- -- Patients
-- CREATE INDEX idx_patients_name ON patients (last_name, first_name) WHERE deleted_at IS NULL;
-- CREATE INDEX idx_patients_dob ON patients (date_of_birth) WHERE deleted_at IS NULL;
-- CREATE INDEX idx_patients_active ON patients (is_active) WHERE deleted_at IS NULL;
-- 
-- -- Appointments
-- CREATE INDEX idx_appointments_patient ON appointments (patient_id) WHERE deleted_at IS NULL;
-- CREATE INDEX idx_appointments_provider ON appointments (provider_employee_id) WHERE deleted_at IS NULL;
-- CREATE INDEX idx_appointments_department ON appointments (department_id) WHERE deleted_at IS NULL;
-- CREATE INDEX idx_appointments_start_end ON appointments (start_at, end_at) WHERE deleted_at IS NULL;
-- CREATE INDEX idx_appointments_status ON appointments (status) WHERE deleted_at IS NULL;
-- 
-- -- Employee Specialties
-- CREATE INDEX idx_employee_specialties_specialty ON employee_specialties (specialty_id) WHERE revoked_at IS NULL;
-- CREATE INDEX idx_employee_specialties_department ON employee_specialties (department_id) WHERE revoked_at IS NULL;
-- CREATE INDEX idx_employee_specialties_primary ON employee_specialties (employee_id, is_primary) WHERE revoked_at IS NULL;
-- 
-- -- Specialties
-- CREATE INDEX idx_specialties_parent ON specialties (parent_id) WHERE is_active = true;
-- CREATE INDEX idx_specialties_code ON specialties (code) WHERE is_active = true;

-- ============================================
-- FOREIGN KEY CONSTRAINTS
-- ============================================

-- Departments
ALTER TABLE departments
    ADD CONSTRAINT fk_departments_head
        FOREIGN KEY (head_id) REFERENCES employees (id) ON DELETE SET NULL;

ALTER TABLE departments
    ADD CONSTRAINT fk_departments_created_by
        FOREIGN KEY (created_by) REFERENCES employees (id) ON DELETE SET NULL;

ALTER TABLE departments
    ADD CONSTRAINT fk_departments_updated_by
        FOREIGN KEY (updated_by) REFERENCES employees (id) ON DELETE SET NULL;

ALTER TABLE departments
    ADD CONSTRAINT fk_departments_deleted_by
        FOREIGN KEY (deleted_by) REFERENCES employees (id) ON DELETE SET NULL;

-- Employees
ALTER TABLE employees
    ADD CONSTRAINT fk_employees_department
        FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE SET NULL;

-- Employee Roles
ALTER TABLE employee_roles
    ADD CONSTRAINT fk_employee_roles_employee
        FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE CASCADE;

ALTER TABLE employee_roles
    ADD CONSTRAINT fk_employee_roles_role
        FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE;

ALTER TABLE employee_roles
    ADD CONSTRAINT fk_employee_roles_assigned_by
        FOREIGN KEY (assigned_by) REFERENCES employees (id) ON DELETE SET NULL;

-- Patients
ALTER TABLE patients
    ADD CONSTRAINT fk_patients_created_by
        FOREIGN KEY (created_by) REFERENCES employees (id) ON DELETE SET NULL;

ALTER TABLE patients
    ADD CONSTRAINT fk_patients_updated_by
        FOREIGN KEY (updated_by) REFERENCES employees (id) ON DELETE SET NULL;

ALTER TABLE patients
    ADD CONSTRAINT fk_patients_deleted_by
        FOREIGN KEY (deleted_by) REFERENCES employees (id) ON DELETE SET NULL;

-- Appointments
ALTER TABLE appointments
    ADD CONSTRAINT fk_appointments_patient
        FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE RESTRICT;

ALTER TABLE appointments
    ADD CONSTRAINT fk_appointments_provider
        FOREIGN KEY (provider_employee_id) REFERENCES employees (id) ON DELETE RESTRICT;

ALTER TABLE appointments
    ADD CONSTRAINT fk_appointments_department
        FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE SET NULL;

ALTER TABLE appointments
    ADD CONSTRAINT fk_appointments_rescheduled_from
        FOREIGN KEY (rescheduled_from_id) REFERENCES appointments (id) ON DELETE SET NULL;

ALTER TABLE appointments
    ADD CONSTRAINT fk_appointments_created_by
        FOREIGN KEY (created_by) REFERENCES employees (id) ON DELETE SET NULL;

ALTER TABLE appointments
    ADD CONSTRAINT fk_appointments_updated_by
        FOREIGN KEY (updated_by) REFERENCES employees (id) ON DELETE SET NULL;

ALTER TABLE appointments
    ADD CONSTRAINT fk_appointments_deleted_by
        FOREIGN KEY (deleted_by) REFERENCES employees (id) ON DELETE SET NULL;

-- Specialties
ALTER TABLE specialties
    ADD CONSTRAINT fk_specialties_parent
        FOREIGN KEY (parent_id) REFERENCES specialties (id) ON DELETE SET NULL;

-- Employee Specialties
ALTER TABLE employee_specialties
    ADD CONSTRAINT fk_employee_specialties_employee
        FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE CASCADE;

ALTER TABLE employee_specialties
    ADD CONSTRAINT fk_employee_specialties_specialty
        FOREIGN KEY (specialty_id) REFERENCES specialties (id) ON DELETE CASCADE;

ALTER TABLE employee_specialties
    ADD CONSTRAINT fk_employee_specialties_department
        FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE SET NULL;

-- ============================================
-- CHECK CONSTRAINTS
-- ============================================

ALTER TABLE employees
    ADD CONSTRAINT chk_employees_dob
        CHECK (date_of_birth < CURRENT_DATE);

ALTER TABLE patients
    ADD CONSTRAINT chk_patients_dob
        CHECK (date_of_birth <= CURRENT_DATE);

ALTER TABLE patients
    ADD CONSTRAINT chk_patients_death
        CHECK (date_of_death IS NULL OR date_of_death >= date_of_birth);

ALTER TABLE appointments
    ADD CONSTRAINT chk_appointments_time
        CHECK (end_at > start_at);

ALTER TABLE appointments
    ADD CONSTRAINT chk_appointments_checkin
        CHECK (check_in_at IS NULL OR check_in_at >= start_at);

ALTER TABLE appointments
    ADD CONSTRAINT chk_appointments_checkout
        CHECK (check_out_at IS NULL OR check_out_at >= check_in_at);

ALTER TABLE employee_specialties
    ADD CONSTRAINT chk_employee_specialties_cert_dates
        CHECK (expires_at IS NULL OR certified_at IS NULL OR expires_at > certified_at);