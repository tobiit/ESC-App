-- Migration 003: Migrate from country_name to ISO 3166-1 alpha-2 country_code

-- Mapping von Langnamen zu Codes (aus resolveCountryName/COUNTRY_DE)
-- Alter Datensatz → neuer Code
-- Diese Mapping deckt die häufigsten ESC-Teilnehmer ab

ALTER TABLE entries ADD COLUMN country_code CHAR(2) NULL;

-- Update mit Mapping für bekannte Länder
UPDATE entries SET country_code = 'AL' WHERE country_name = 'Albanien';
UPDATE entries SET country_code = 'AD' WHERE country_name = 'Andorra';
UPDATE entries SET country_code = 'AM' WHERE country_name = 'Armenien';
UPDATE entries SET country_code = 'AU' WHERE country_name = 'Australien';
UPDATE entries SET country_code = 'AT' WHERE country_name = 'Österreich';
UPDATE entries SET country_code = 'AZ' WHERE country_name = 'Aserbaidschan';
UPDATE entries SET country_code = 'BY' WHERE country_name = 'Belarus';
UPDATE entries SET country_code = 'BE' WHERE country_name = 'Belgien';
UPDATE entries SET country_code = 'BA' WHERE country_name = 'Bosnien und Herzegowina';
UPDATE entries SET country_code = 'BG' WHERE country_name = 'Bulgarien';
UPDATE entries SET country_code = 'HR' WHERE country_name = 'Kroatien';
UPDATE entries SET country_code = 'CY' WHERE country_name = 'Zypern';
UPDATE entries SET country_code = 'CZ' WHERE country_name = 'Tschechien';
UPDATE entries SET country_code = 'DK' WHERE country_name = 'Dänemark';
UPDATE entries SET country_code = 'EE' WHERE country_name = 'Estland';
UPDATE entries SET country_code = 'FI' WHERE country_name = 'Finnland';
UPDATE entries SET country_code = 'FR' WHERE country_name = 'Frankreich';
UPDATE entries SET country_code = 'GE' WHERE country_name = 'Georgien';
UPDATE entries SET country_code = 'DE' WHERE country_name = 'Deutschland';
UPDATE entries SET country_code = 'GR' WHERE country_name = 'Griechenland';
UPDATE entries SET country_code = 'HU' WHERE country_name = 'Ungarn';
UPDATE entries SET country_code = 'IS' WHERE country_name = 'Island';
UPDATE entries SET country_code = 'IE' WHERE country_name = 'Irland';
UPDATE entries SET country_code = 'IL' WHERE country_name = 'Israel';
UPDATE entries SET country_code = 'IT' WHERE country_name = 'Italien';
UPDATE entries SET country_code = 'KZ' WHERE country_name = 'Kasachstan';
UPDATE entries SET country_code = 'LV' WHERE country_name = 'Lettland';
UPDATE entries SET country_code = 'LT' WHERE country_name = 'Litauen';
UPDATE entries SET country_code = 'LU' WHERE country_name = 'Luxemburg';
UPDATE entries SET country_code = 'MK' WHERE country_name = 'Nordmazedonien';
UPDATE entries SET country_code = 'MT' WHERE country_name = 'Malta';
UPDATE entries SET country_code = 'MD' WHERE country_name = 'Moldau';
UPDATE entries SET country_code = 'MC' WHERE country_name = 'Monaco';
UPDATE entries SET country_code = 'ME' WHERE country_name = 'Montenegro';
UPDATE entries SET country_code = 'MA' WHERE country_name = 'Marokko';
UPDATE entries SET country_code = 'NL' WHERE country_name = 'Niederlande';
UPDATE entries SET country_code = 'NO' WHERE country_name = 'Norwegen';
UPDATE entries SET country_code = 'PL' WHERE country_name = 'Polen';
UPDATE entries SET country_code = 'PT' WHERE country_name = 'Portugal';
UPDATE entries SET country_code = 'RO' WHERE country_name = 'Rumänien';
UPDATE entries SET country_code = 'RU' WHERE country_name = 'Russland';
UPDATE entries SET country_code = 'SM' WHERE country_name = 'San Marino';
UPDATE entries SET country_code = 'RS' WHERE country_name = 'Serbien';
UPDATE entries SET country_code = 'SK' WHERE country_name = 'Slowakei';
UPDATE entries SET country_code = 'SI' WHERE country_name = 'Slowenien';
UPDATE entries SET country_code = 'ES' WHERE country_name = 'Spanien';
UPDATE entries SET country_code = 'SE' WHERE country_name = 'Schweden';
UPDATE entries SET country_code = 'CH' WHERE country_name = 'Schweiz';
UPDATE entries SET country_code = 'TR' WHERE country_name = 'Türkei';
UPDATE entries SET country_code = 'UA' WHERE country_name = 'Ukraine';
UPDATE entries SET country_code = 'GB' WHERE country_name = 'Vereinigtes Königreich';
UPDATE entries SET country_code = 'RS' WHERE country_name = 'Serbien und Montenegro';
UPDATE entries SET country_code = 'RS' WHERE country_name = 'Jugoslawien';

-- Optional: Wenn in Alt-Daten bereits 2-stellige Codes gespeichert wurden, übernehmen
UPDATE entries
SET country_code = UPPER(country_name)
WHERE country_code IS NULL AND CHAR_LENGTH(country_name) = 2;

-- WICHTIG: Falls hier noch NULL-Werte existieren, muss das Mapping manuell ergänzt werden.
-- Das folgende NOT NULL erzwingt vollständige, gültige Migration ohne Fantasiecodes.

-- NOT NULL constraint hinzufügen nachdem Migration vollständig ist
ALTER TABLE entries MODIFY country_code CHAR(2) NOT NULL;

-- UNIQUE KEY mit country_code statt country_name erstellen
DROP INDEX uq_event_country ON entries;
ALTER TABLE entries ADD UNIQUE KEY uq_event_country (event_id, country_code);

-- Alte country_name Spalte bleibt (optional für audit/display), wird aber nicht mehr für Logik genutzt
-- Die country_name Spalte kann in einer späteren Migration entfernt werden, wenn alle Systeme migriert sind
