UPDATE users SET is_approved=1 WHERE role='admin';
SELECT id, username, is_approved FROM users WHERE role='admin';
