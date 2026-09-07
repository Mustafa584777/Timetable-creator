<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>XML Sitemap | Timetable Creator Online</title>
        <style type="text/css">
          :root {
            --bg: #f8fafc;
            --surface: #ffffff;
            --border: #e2e8f0;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --primary: #6366f1;
            --primary-hover: #4f46e5;
            --primary-light: #eef2ff;
            --badge-purple-bg: #f5f3ff;
            --badge-purple-text: #7c3aed;
            --badge-blue-bg: #eff6ff;
            --badge-blue-text: #2563eb;
            --badge-emerald-bg: #ecfdf5;
            --badge-emerald-text: #059669;
          }

          @media (prefers-color-scheme: dark) {
            :root {
              --bg: #0b0f19;
              --surface: #111827;
              --border: #1f2937;
              --text-main: #f9fafb;
              --text-muted: #9ca3af;
              --primary: #818cf8;
              --primary-hover: #6366f1;
              --primary-light: #1e1b4b;
              --badge-purple-bg: #2e1065;
              --badge-purple-text: #c084fc;
              --badge-blue-bg: #172554;
              --badge-blue-text: #93c5fd;
              --badge-emerald-bg: #064e3b;
              --badge-emerald-text: #6ee7b7;
            }
          }

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
            background-color: var(--bg);
            color: var(--text-main);
            padding: 24px 16px;
            line-height: 1.5;
            font-size: 14px;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
          }

          .header {
            background-color: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          }

          .header-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 16px;
            margin-bottom: 12px;
          }

          .brand-title {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .logo-badge {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: #ffffff;
            width: 36px;
            height: 36px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 16px;
          }

          h1 {
            font-size: 20px;
            font-weight: 700;
            color: var(--text-main);
          }

          .header-badge {
            background-color: var(--primary-light);
            color: var(--primary);
            padding: 4px 10px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 600;
            border: 1px solid var(--primary);
          }

          .header-desc {
            color: var(--text-muted);
            font-size: 13.5px;
            max-width: 800px;
            line-height: 1.6;
          }

          .stats-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid var(--border);
          }

          .stats-count {
            font-size: 13px;
            color: var(--text-muted);
          }

          .stats-count strong {
            color: var(--text-main);
          }

          .search-input {
            padding: 8px 14px;
            border: 1px solid var(--border);
            border-radius: 8px;
            background-color: var(--bg);
            color: var(--text-main);
            font-size: 13px;
            outline: none;
            width: 260px;
            max-width: 100%;
          }

          .search-input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 2px var(--primary-light);
          }

          .table-wrapper {
            background-color: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          }

          .table-scroll {
            overflow-x: auto;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 13px;
          }

          th {
            background-color: var(--bg);
            color: var(--text-muted);
            font-weight: 600;
            padding: 12px 16px;
            border-bottom: 1px solid var(--border);
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.05em;
            white-space: nowrap;
          }

          td {
            padding: 12px 16px;
            border-bottom: 1px solid var(--border);
            color: var(--text-main);
            vertical-align: middle;
          }

          tr:last-child td {
            border-bottom: none;
          }

          tr:hover td {
            background-color: var(--primary-light);
          }

          .url-link {
            color: var(--primary);
            text-decoration: none;
            word-break: break-all;
            font-weight: 500;
          }

          .url-link:hover {
            text-decoration: underline;
          }

          .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 11.5px;
            font-weight: 600;
            white-space: nowrap;
          }

          .badge-high {
            background-color: var(--badge-purple-bg);
            color: var(--badge-purple-text);
          }

          .badge-med {
            background-color: var(--badge-blue-bg);
            color: var(--badge-blue-text);
          }

          .badge-norm {
            background-color: var(--badge-emerald-bg);
            color: var(--badge-emerald-text);
          }

          .alternate-count {
            color: var(--text-muted);
            font-size: 12px;
          }

          .footer-note {
            text-align: center;
            margin-top: 24px;
            color: var(--text-muted);
            font-size: 12px;
          }

          .footer-note a {
            color: var(--primary);
            text-decoration: none;
          }
          .footer-note a:hover {
            text-decoration: underline;
          }
        </style>
        <script type="text/javascript">
          <![CDATA[
          function filterSitemap() {
            var input = document.getElementById("sitemapFilter");
            var filter = input.value.toLowerCase();
            var rows = document.querySelectorAll("#sitemapTable tbody tr");
            var count = 0;
            for (var i = 0; i < rows.length; i++) {
              var urlCell = rows[i].querySelector(".url-cell");
              if (urlCell) {
                var text = urlCell.textContent || urlCell.innerText;
                if (text.toLowerCase().indexOf(filter) > -1) {
                  rows[i].style.display = "";
                  count++;
                } else {
                  rows[i].style.display = "none";
                }
              }
            }
            var countEl = document.getElementById("visibleCount");
            if (countEl) countEl.textContent = count;
          }
          ]]>
        </script>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-top">
              <div class="brand-title">
                <div class="logo-badge">&#128197;</div>
                <div>
                  <h1>XML Sitemap Index</h1>
                  <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">https://timetablecreator.online</p>
                </div>
              </div>
              <div class="header-badge">Googlebot / SEO Compatible</div>
            </div>
            <p class="header-desc">
              This XML Sitemap is generated by Timetable Creator for indexing by search engines like Google, Bing, Yahoo, and Yandex. It contains canonical web addresses, localized language variants, update frequencies, and crawling priorities.
            </p>
            <div class="stats-bar">
              <div class="stats-count">
                Showing <strong id="visibleCount"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong> of <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong> URLs
              </div>
              <input type="text" id="sitemapFilter" class="search-input" placeholder="Search URL path..." onkeyup="filterSitemap()" />
            </div>
          </div>

          <div class="table-wrapper">
            <div class="table-scroll">
              <table id="sitemapTable">
                <thead>
                  <tr>
                    <th style="width: 45px; text-align: center;">#</th>
                    <th>URL Location</th>
                    <th style="width: 100px; text-align: center;">Priority</th>
                    <th style="width: 120px;">Change Freq</th>
                    <th style="width: 120px;">Last Modified</th>
                    <th style="width: 110px; text-align: center;">Alternates</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <tr>
                      <td style="text-align: center; color: var(--text-muted);">
                        <xsl:value-of select="position()"/>
                      </td>
                      <td class="url-cell">
                        <a class="url-link">
                          <xsl:attribute name="href">
                            <xsl:value-of select="sitemap:loc"/>
                          </xsl:attribute>
                          <xsl:value-of select="sitemap:loc"/>
                        </a>
                      </td>
                      <td style="text-align: center;">
                        <xsl:choose>
                          <xsl:when test="sitemap:priority &gt;= 0.9">
                            <span class="badge badge-high"><xsl:value-of select="sitemap:priority"/></span>
                          </xsl:when>
                          <xsl:when test="sitemap:priority &gt;= 0.7">
                            <span class="badge badge-med"><xsl:value-of select="sitemap:priority"/></span>
                          </xsl:when>
                          <xsl:otherwise>
                            <span class="badge badge-norm"><xsl:value-of select="sitemap:priority"/></span>
                          </xsl:otherwise>
                        </xsl:choose>
                      </td>
                      <td style="text-transform: capitalize; color: var(--text-muted);">
                        <xsl:value-of select="sitemap:changefreq"/>
                      </td>
                      <td style="color: var(--text-muted); font-size: 12px;">
                        <xsl:value-of select="sitemap:lastmod"/>
                      </td>
                      <td style="text-align: center;">
                        <span class="alternate-count">
                          <xsl:value-of select="count(xhtml:link)"/> langs
                        </span>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </div>

          <div class="footer-note">
            Timetable Creator Online XML Sitemap &#8226; <a href="/">Return to Homepage</a> &#8226; <a href="/html-sitemap">HTML Sitemap</a> &#8226; <a href="/how-to-use/">How to Use</a> &#8226; <a href="/faqs/">FAQs</a>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
