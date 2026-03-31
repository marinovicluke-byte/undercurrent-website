#!/usr/bin/env bash
# cleanup.sh — detect unused source files in the UnderCurrent site
# Run from the project root: bash cleanup.sh
# It will list files that are never imported anywhere — safe to review before deleting.

set -eo pipefail

SRC="src"
UNUSED=()

echo "=== UnderCurrent Cleanup Check ==="
echo "Scanning for source files not imported anywhere..."
echo ""

while IFS= read -r -d '' file; do
  # Get just the filename without extension (how it would appear in an import)
  basename=$(basename "$file")
  name="${basename%.*}"

  # Skip entry points and config-style files that aren't imported
  if [[ "$name" == "main" || "$name" == "App" || "$name" == "index" ]]; then
    continue
  fi

  # Count how many other files import this module by name
  matches=$(grep -r --include="*.jsx" --include="*.tsx" --include="*.js" --include="*.ts" \
    -l "from.*['\"].*${name}['\"]" "$SRC" 2>/dev/null | grep -v "^${file}$" | wc -l | tr -d ' ' || echo 0)

  if [[ "$matches" -eq 0 ]]; then
    UNUSED+=("$file")
  fi
done < <(find "$SRC/components" "$SRC/pages" -type f \( -name "*.jsx" -o -name "*.tsx" \) -print0 2>/dev/null)

# Also check assets
while IFS= read -r -d '' file; do
  basename=$(basename "$file")
  matches=$(grep -r --include="*.jsx" --include="*.tsx" --include="*.js" --include="*.ts" --include="*.css" \
    -l "$basename" "$SRC" 2>/dev/null | wc -l | tr -d ' \n' || true)
  matches=${matches:-0}
  if [[ "$matches" -eq 0 ]]; then
    UNUSED+=("$file")
  fi
done < <(find "$SRC/assets" -type f -print0 2>/dev/null)

if [[ "${#UNUSED[@]}" -eq 0 ]]; then
  echo "✓ No unused files found. Project is clean."
else
  echo "Found ${#UNUSED[@]} potentially unused file(s):"
  echo ""
  for f in "${UNUSED[@]}"; do
    echo "  $f"
  done
  echo ""
  echo "Review these files before deleting. To remove them all:"
  echo ""
  for f in "${UNUSED[@]}"; do
    echo "  rm \"$f\""
  done
fi

echo ""
echo "=== Done ==="
