import os, re

def fix_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    changed = False

    # 1. Ensure Tailwind CDN is in <head>
    if 'cdn.tailwindcss.com' not in content:
        if '</head>' in content:
            content = content.replace('</head>', '  <script src="https://cdn.tailwindcss.com"></script>\n</head>')
            changed = True

    # 2. Remove refund policy links and list items containing them
    # Pattern 1: <li> wrapping refund-policy link or similar
    # Let's remove any <a> tag or <li> containing refund-policy
    patterns_to_remove = [
        r'<a[^>]*href=[\"\'][^\"\']*refund-policy[^\"\']*[\"\'][^>]*>.*?</a>',
        r'<li>\s*<a[^>]*href=[\"\'][^\"\']*refund-policy[^\"\']*[\"\'][^>]*>.*?</a>\s*</li>',
        r'<!--\s*Refund Policy\s*-->\s*<a[^>]*href=[\"\'][^\"\']*refund-policy[^\"\']*[\"\'][^>]*>.*?</a>',
        r'<span>Refund Policy</span>'
    ]

    for pat in patterns_to_remove:
        new_content = re.sub(pat, '', content, flags=re.IGNORECASE | re.DOTALL)
        if new_content != content:
            content = new_content
            changed = True

    # Also clean up any empty list items or paragraphs left behind if any
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

if __name__ == '__main__':
    count = 0
    for root, dirs, files in os.walk('public'):
        for f in files:
            if f.endswith('.html'):
                path = os.path.join(root, f)
                if fix_html_file(path):
                    count += 1
    print(f'Fixed {count} HTML files.')
