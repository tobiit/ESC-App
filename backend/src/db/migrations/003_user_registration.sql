-- Add fields for user self-registration and approval
ALTER TABLE users
  ADD COLUMN full_name VARCHAR(120) NULL AFTER display_name,
  ADD COLUMN is_approved BOOLEAN NOT NULL DEFAULT FALSE AFTER is_active;

-- Approve all existing users (backwards compatibility)
UPDATE users SET is_approved = TRUE WHERE is_active = TRUE;

-- Add index for filtering unapproved users (admin dashboard)
CREATE INDEX idx_users_approved ON users(is_approved);
