-- Migration 003: Migrate from country_name to ISO 3166-1 alpha-2 country_code

-- Diese Migration muss sowohl mit Altschema (country_name vorhanden)
-- als auch mit dem aktuellen Basisschema aus 001_init.sql lauffähig sein.

ALTER TABLE entries ADD COLUMN IF NOT EXISTS country_code CHAR(2) NULL;

SET @entries_has_country_name := (
	SELECT COUNT(*)
	FROM information_schema.COLUMNS
	WHERE TABLE_SCHEMA = DATABASE()
		AND TABLE_NAME = 'entries'
		AND COLUMN_NAME = 'country_name'
);

-- Mapping von Langnamen zu Codes (aus resolveCountryName/COUNTRY_DE)
-- Alter Datensatz → neuer Code
-- Diese Mapping deckt die häufigsten ESC-Teilnehmer ab
SET @sql := IF(
	@entries_has_country_name > 0,
	'UPDATE entries
	 SET country_code = CASE country_name
		 WHEN ''Albanien'' THEN ''AL''
		 WHEN ''Andorra'' THEN ''AD''
		 WHEN ''Armenien'' THEN ''AM''
		 WHEN ''Australien'' THEN ''AU''
		 WHEN ''Österreich'' THEN ''AT''
		 WHEN ''Aserbaidschan'' THEN ''AZ''
		 WHEN ''Belarus'' THEN ''BY''
		 WHEN ''Belgien'' THEN ''BE''
		 WHEN ''Bosnien und Herzegowina'' THEN ''BA''
		 WHEN ''Bulgarien'' THEN ''BG''
		 WHEN ''Kroatien'' THEN ''HR''
		 WHEN ''Zypern'' THEN ''CY''
		 WHEN ''Tschechien'' THEN ''CZ''
		 WHEN ''Dänemark'' THEN ''DK''
		 WHEN ''Estland'' THEN ''EE''
		 WHEN ''Finnland'' THEN ''FI''
		 WHEN ''Frankreich'' THEN ''FR''
		 WHEN ''Georgien'' THEN ''GE''
		 WHEN ''Deutschland'' THEN ''DE''
		 WHEN ''Griechenland'' THEN ''GR''
		 WHEN ''Ungarn'' THEN ''HU''
		 WHEN ''Island'' THEN ''IS''
		 WHEN ''Irland'' THEN ''IE''
		 WHEN ''Israel'' THEN ''IL''
		 WHEN ''Italien'' THEN ''IT''
		 WHEN ''Kasachstan'' THEN ''KZ''
		 WHEN ''Lettland'' THEN ''LV''
		 WHEN ''Litauen'' THEN ''LT''
		 WHEN ''Luxemburg'' THEN ''LU''
		 WHEN ''Nordmazedonien'' THEN ''MK''
		 WHEN ''Malta'' THEN ''MT''
		 WHEN ''Moldau'' THEN ''MD''
		 WHEN ''Monaco'' THEN ''MC''
		 WHEN ''Montenegro'' THEN ''ME''
		 WHEN ''Marokko'' THEN ''MA''
		 WHEN ''Niederlande'' THEN ''NL''
		 WHEN ''Norwegen'' THEN ''NO''
		 WHEN ''Polen'' THEN ''PL''
		 WHEN ''Portugal'' THEN ''PT''
		 WHEN ''Rumänien'' THEN ''RO''
		 WHEN ''Russland'' THEN ''RU''
		 WHEN ''San Marino'' THEN ''SM''
		 WHEN ''Serbien'' THEN ''RS''
		 WHEN ''Slowakei'' THEN ''SK''
		 WHEN ''Slowenien'' THEN ''SI''
		 WHEN ''Spanien'' THEN ''ES''
		 WHEN ''Schweden'' THEN ''SE''
		 WHEN ''Schweiz'' THEN ''CH''
		 WHEN ''Türkei'' THEN ''TR''
		 WHEN ''Ukraine'' THEN ''UA''
		 WHEN ''Vereinigtes Königreich'' THEN ''GB''
		 WHEN ''Serbien und Montenegro'' THEN ''RS''
		 WHEN ''Jugoslawien'' THEN ''RS''
		 ELSE country_code
	 END
	 WHERE country_code IS NULL OR country_code = ''''',
	'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Optional: Wenn in Alt-Daten bereits 2-stellige Codes gespeichert wurden, übernehmen
SET @sql := IF(
	@entries_has_country_name > 0,
	'UPDATE entries
	 SET country_code = UPPER(country_name)
	 WHERE country_code IS NULL AND CHAR_LENGTH(country_name) = 2',
	'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- WICHTIG: Falls hier noch NULL-Werte existieren, muss das Mapping manuell ergänzt werden.
-- Das folgende NOT NULL erzwingt vollständige, gültige Migration ohne Fantasiecodes.

-- NOT NULL constraint hinzufügen nachdem Migration vollständig ist
ALTER TABLE entries MODIFY country_code CHAR(2) NOT NULL;

-- UNIQUE KEY mit country_code statt country_name erstellen
ALTER TABLE entries DROP INDEX IF EXISTS uq_event_country;
ALTER TABLE entries ADD UNIQUE KEY IF NOT EXISTS uq_event_country (event_id, country_code);

-- Alte country_name Spalte bleibt (optional für audit/display), wird aber nicht mehr für Logik genutzt
-- Die country_name Spalte kann in einer späteren Migration entfernt werden, wenn alle Systeme migriert sind
