#!/bin/bash

# Script to convert DNG files to compressed JPG format using dcraw
# Usage: ./convert_dng_to_jpg_dcraw.sh "source_directory" quality
# Example: ./convert_dng_to_jpg_dcraw.sh "./images" 85

# Default values
SOURCE_DIR="${1:-.}"  # Default to current directory if not specified
QUALITY=${2:-85}     # Default compression quality (0-100, lower = more compression)
OUTPUT_DIR="${SOURCE_DIR}/jpg_output"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Count total DNG files
TOTAL_FILES=$(find "$SOURCE_DIR" -type f -name "*.dng" -o -name "*.DNG" | wc -l)
echo "Found $TOTAL_FILES DNG files to convert"

if [ $TOTAL_FILES -eq 0 ]; then
    echo "No DNG files found in $SOURCE_DIR"
    exit 1
fi

# Counter for progress and success
COUNT=0
SUCCESS=0

# Process each DNG file
find "$SOURCE_DIR" -type f -name "*.dng" -o -name "*.DNG" | while read -r file; do
    # Get filename without extension
    filename=$(basename "$file")
    name_without_ext="${filename%.*}"
    
    # Increment counter
    ((COUNT++))
    
    # Display progress
    echo "[$COUNT/$TOTAL_FILES] Converting: $filename"
    
    # Use dcraw to extract the image data and pipe to convert for JPG conversion
    if dcraw -c -w "$file" | convert - -quality "$QUALITY" "$OUTPUT_DIR/${name_without_ext}.jpg"; then
        echo "  ✓ Converted to $OUTPUT_DIR/${name_without_ext}.jpg"
        ((SUCCESS++))
    else
        echo "  ✗ Failed to convert $filename"
    fi
done

echo "Conversion complete. JPG files saved to $OUTPUT_DIR"
echo "Successfully converted $SUCCESS out of $TOTAL_FILES DNG files with quality setting of $QUALITY"
