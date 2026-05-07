-- Migration 007: Add default value to country_name field

-- Ensure entries table has country_name column (backward compatibility)
ALTER TABLE entries ADD COLUMN IF NOT EXISTS country_name VARCHAR(200) DEFAULT '';

-- If country_name exists and is NOT NULL without default, modify it
ALTER TABLE entries MODIFY COLUMN country_name VARCHAR(200) DEFAULT '';
