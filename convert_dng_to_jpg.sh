#!/bin/bash

# Script to convert DNG files to compressed JPG format
# Usage: ./convert_dng_to_jpg.sh "source_directory" quality
# Example: ./convert_dng_to_jpg.sh "./images" 85

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

# Counter for progress
COUNT=0

# Process each DNG file
find "$SOURCE_DIR" -type f -name "*.dng" -o -name "*.DNG" | while read -r file; do
    # Get filename without extension
    filename=$(basename "$file")
    name_without_ext="${filename%.*}"
    
    # Increment counter
    ((COUNT++))
    
    # Display progress
    echo "[$COUNT/$TOTAL_FILES] Converting: $filename"
    
    # Convert DNG to JPG with specified quality
    convert "$file" -quality "$QUALITY" "$OUTPUT_DIR/${name_without_ext}.jpg"
    
    # Check if conversion was successful
    if [ $? -eq 0 ]; then
        echo "  ✓ Converted to $OUTPUT_DIR/${name_without_ext}.jpg"
    else
        echo "  ✗ Failed to convert $filename"
    fi
done

echo "Conversion complete. JPG files saved to $OUTPUT_DIR"
echo "Converted $COUNT DNG files with quality setting of $QUALITY"
