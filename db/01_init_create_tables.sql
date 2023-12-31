BEGIN;

DROP TABLE IF EXISTS persons;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE persons (
  "id" UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "firstName" varchar(50),
  "lastName" varchar(50),
  "gender" char(1),
  "birthdate" date,
  "street1" varchar(100),
  "street2" varchar(100),
  "city" varchar(100),
  "state" char(2),
  "zip" varchar(5),
  "createdAt" timestamp with time zone DEFAULT now()
);

-- COMMIT;