# Migrator Script

## Overview

The `migrator.sh` script is designed to facilitate the migration of source code files by performing search-and-replace operations based on a user-selected CSV mapping file. This script is intended to be used within a frontend project, leveraging a set of predefined mappings to update code according to version changes.

## Folder Structure

The script and its associated migration mapping files are organized in the following structure:

```text
migrations
 ├── README.md
 ├─> migration-mappings
 │   ├── 20250306_v0-5-0_to_v0-6-0_known-but-not-all-token-name-changes_migration.csv
 │   ├── 20250318_v0-6-0_to_v0-6-1_removed-unsupported-leftovers_migration.csv
 │   ├── 20250321_v0-6-2_to_v0-6-3_breakpoint-specific-file-name-changes_migration.csv
 │   ├── 20250602_v0-6-4_to_v0-7-0_icon-size-action-typography-refactor_migration.csv
 │   ├── 20250806_v0-7-0_to_v0-8-0_accordion-gap-corrections_migration.csv
 │   ├── 20251029_v0-8-1_to_v1-0-0_major-token-updates-before-stable_migration.csv
 │   └── 20251029_v1-0-0_to_v1-1-0_scss-import-fixes_migration.csv
 └── migrator.sh
```

## How to Use the Script

1. **Navigate to the `migrations` Directory:**

   Open your terminal and change to the `migrations` directory where the script is located:

   ```bash
   cd path/to/your/project/migrations
   ```

2. **Make sure the Script File is executable**

   Make the bash script executable by running the following command

   ```bash
   chmod +x migrator.sh
   ```

3. **Run the Script:**

   Execute the script using the following command:

   ```bash
   ./migrator.sh optional/full/or/relative/path/to/directory
   ```

   If you provide an optional directory path, the script will perform replacements only within that directory.
   If you omit the argument, it will perform replacements in the current directory where the script is executed.

4. **Select a Migration File:**

   The script will prompt you to select a migration file from the migration-mappings directory. Choose the appropriate file to proceed with the migration.

## Notes

The script checks if the specified path is a valid directory. If the path is a file or does not exist, the script will exit with an appropriate error message.
Ensure that the migration mapping files are placed in the migration-mappings subdirectory.
