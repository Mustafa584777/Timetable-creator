#!/bin/bash
find public/blog -name "*.html" | while read -r file; do
  if ! grep -q 'hreflang="zh-CN"' "$file"; then
    sed -i '/<link rel="alternate" hreflang="hi"/a \    <link rel="alternate" hreflang="zh-CN" href="https://timetablecreator.online/?lang=zh-CN" />' "$file"
    echo "Updated $file"
  fi
done
