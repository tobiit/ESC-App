ALTER TABLE official_result_items DROP INDEX uq_official_rank;
ALTER TABLE official_result_items ADD INDEX idx_official_rank (official_result_id, rank_position);
