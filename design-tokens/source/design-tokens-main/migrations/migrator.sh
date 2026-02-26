#!/usr/bin/env bash

# Migrator Script
# ----------------
# This script is designed to facilitate the migration of source code files by
# performing search-and-replace operations based on a user-selected CSV mapping file.
# The script can be run from the root directory of a frontend project and optionally
# accepts a target directory path where the replacements should be applied.
#
# Making the Script Executable:
# -----------------------------
# Before running the script, ensure it is executable. You can make the script
# executable by running the following command in your terminal:
#
# chmod +x migrator.sh
#
# How to Use the Script:
# ----------------------
# 1. Ensure your migration files are located in the migration-mappings directory
#    of your project with the naming convention `*_migration.csv`.
#
# 2. Run the script using the following command:
#
#    ./migrator.sh [optional/path/to/directory]
#
#    - If you provide an optional directory path, the script will perform replacements
#      only within that directory.
#    - If you omit the argument, it will perform replacements in the current directory
#      where the script is executed.
#
# The script will prompt you to select a migration file from the available options
# and will then apply the specified search-and-replace mappings to all relevant files
# within the target directory.
#
# Note:
# -----
# The script checks if the specified path is a valid directory. If the path is a file
# or does not exist, the script will exit with an appropriate error message.

ERROR="❌ ERROR"
WARNING="⚠️ WARNING"
UPDATE="🔄 UPDATE"
SUCCESS="✅ SUCCESS"
COMMENT="💬 COMMENT"

# Function to display available migration files and let the user choose
select_migration_file() {
    local files=(migration-mappings/*_migration.csv)
    if [ ${#files[@]} -eq 0 ]; then
        echo "No migration files found in the migration-mappings directory."
        exit 1
    fi

    # Use PS3 to set the prompt string for select
    PS3="Please select a migration file: "
    select file in "${files[@]}"; do
        if [ -n "$file" ]; then
            echo "$file"
            return
        else
            echo "Invalid selection. Please try again."
        fi
    done
}

# Main script execution
main() {
    # Print the current working directory for debugging
    echo "Current working directory: $(pwd)"

    # Get the directory path from the command-line argument or use the current directory
    TARGET_DIR="${1:-.}"

    echo "Checking files ending on (.html, .css, .scss, .js, .ts) in directory: $TARGET_DIR"

    # Check if the target directory exists and is a directory
    if [ -e "$TARGET_DIR" ]; then
        if [ ! -d "$TARGET_DIR" ]; then
            echo "$ERROR '$TARGET_DIR' is not a directory."
            exit 1
        fi
    else
        echo "$ERROR Directory '$TARGET_DIR' does not exist."
        exit 1
    fi

    echo

    # Get the selected migration file from the user
    echo "Available migration files:"
    RELATIVE_CSV_FILE=$(select_migration_file)

    # Convert CSV file path to absolute path
    CSV_FILE="$(cd "$(dirname "$RELATIVE_CSV_FILE")" && pwd)/$(basename "$RELATIVE_CSV_FILE")"
    echo
    echo "Using migration file: $CSV_FILE"
    echo

    # Verify the file exists before proceeding
    if [ ! -f "$CSV_FILE" ]; then
        echo "$ERROR Migration file '$CSV_FILE' does not exist."
        exit 1
    fi

    # Function to perform search and replace with line number logging
    perform_replacement() {
        local file=$1
        echo "Analyzing and migrating file: $file"

        local is_first_line=true

        # Read the CSV file line by line. The `|| [[ -n $search ]]` handles files that don't end with a newline.
        while IFS=, read -r search replace comment || [[ -n "$search" ]]; do
            # Skip the header line (first line)
            if [ "$is_first_line" = true ]; then
                is_first_line=false
                continue
            fi

            # Skip empty lines in the CSV
            [ -z "$search" ] && continue

            # We use `grep -F` which treats the search string literally, so no escaping is needed for it.
            # However, `sed` requires special characters in its search and replace patterns to be escaped.
            local sed_search=$(printf '%s\n' "$search" | sed 's/[][\/$*.^|]/\\&/g')
            local sed_replace=$(printf '%s\n' "$replace" | sed 's/[&/\]/\\&/g')

            # Use `grep -nF` to get line numbers for all matches. Store the output.
            # The `-F` flag treats the search pattern as a fixed string, not a regex.
            matches=$(grep -nF -- "$search" "$file")

            # Proceed only if matches were found
            if [ -n "$matches" ]; then
                # If the replacement value is empty, log an error for each match
                if [ -z "$replace" ]; then
                    echo "$matches" | while IFS=: read -r line_number _; do
                        # echo "$WARNING: [L$line_number] Decommissioned design token '$search' found in '$file'. Please check the component structure and its corresponding design token assignments in the respective Figma designs." # long output
                        local warning_msg="$WARNING: Decommissioned design token '$search' found in [Line $line_number]. Please check the component structure and its corresponding design token assignments in the respective Figma designs."
                        if [ -n "$comment" ]; then
                            warning_msg="$warning_msg ($COMMENT: $comment)"
                        fi
                        echo "$warning_msg"
                    done
                else
                    # If a replacement exists, log a change message for each match
                    echo "$matches" | while IFS=: read -r line_number _; do
                        #  echo "$UPDATE: [L$line_number] Replacing '$search' with '$replace' in '$file'." # long output
                        local update_msg="$UPDATE: Replacing '$search' with '$replace' in [Line $line_number]"
                        if [ -n "$comment" ]; then
                            update_msg="$update_msg ($COMMENT: $comment)"
                        fi
                        echo "$update_msg"
                    done
                    # Then, perform the actual replacement once for the entire file
                    sed -i.bak "s/$sed_search/$sed_replace/g" "$file" && rm "${file}.bak"
                fi
            fi
        done < "$CSV_FILE"
    }

    # Recursively scan the target directory and process files
    find "$TARGET_DIR" -type f \( -name "*.html" -o -name "*.css" -o -name "*.scss" -o -name "*.js" -o -name "*.ts" \) | while read -r file; do
        perform_replacement "$file"
        echo
        echo "------------------------------------------------------------------------------------------------"
        echo
    done

    echo "$SUCCESS Migration completed."
}

# Run the main function with the optional directory path
main "$1"