import { pool } from "../db/pool.js";

export const writeAuditLog = async ({ actorUserId, actionType, entityType, entityId, before, after }) => {
  await pool.query(
    `INSERT INTO audit_logs (actor_user_id, action_type, entity_type, entity_id, before_json, after_json)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      actorUserId || null,
      actionType,
      entityType,
      String(entityId),
      before ? JSON.stringify(before) : null,
      after ? JSON.stringify(after) : null
    ]
  );
};
