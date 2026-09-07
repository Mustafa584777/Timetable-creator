<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap - Timetable Creator Online</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #1e293b;
            background-color: #f8fafc;
            margin: 0;
            padding: 30px 20px;
          }
          .sitemap-container {
            max-width: 1080px;
            margin: 0 auto;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
            padding: 28px 32px;
          }
          .sitemap-header {
            border-bottom: 2px solid #10b981;
            padding-bottom: 16px;
            margin-bottom: 24px;
          }
          h1 {
            font-size: 24px;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 8px 0;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          h1 span.badge {
            font-size: 13px;
            font-weight: 600;
            background: #ecfdf5;
            color: #059669;
            border: 1px solid #a7f3d0;
            border-radius: 6px;
            padding: 3px 8px;
          }
          p.intro {
            font-size: 14px;
            color: #64748b;
            margin: 0 0 6px 0;
            line-height: 1.5;
          }
          p.stats {
            font-size: 13px;
            font-weight: 600;
            color: #059669;
            margin: 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            margin-top: 16px;
          }
          th {
            background-color: #f1f5f9;
            color: #475569;
            text-align: left;
            padding: 12px 14px;
            font-weight: 600;
            border-top: 1px solid #e2e8f0;
            border-bottom: 2px solid #cbd5e1;
          }
          td {
            padding: 11px 14px;
            border-bottom: 1px solid #f1f5f9;
            color: #334155;
            vertical-align: middle;
          }
          tr:hover td {
            background-color: #f8fafc;
          }
          tr:nth-child(even) td {
            background-color: #fafbfc;
          }
          tr:nth-child(even):hover td {
            background-color: #f1f5f9;
          }
          a {
            color: #059669;
            text-decoration: none;
            font-weight: 500;
            word-break: break-all;
          }
          a:hover {
            color: #047857;
            text-decoration: underline;
          }
          .priority-pill {
            display: inline-block;
            padding: 2px 8px;
            font-size: 11.5px;
            font-weight: 600;
            border-radius: 4px;
            background: #ecfdf5;
            color: #047857;
            border: 1px solid #a7f3d0;
          }
          .priority-high {
            background: #d1fae5;
            color: #065f46;
            border-color: #6ee7b7;
          }
          .footer-note {
            margin-top: 24px;
            padding-top: 14px;
            border-top: 1px solid #e2e8f0;
            font-size: 12px;
            color: #94a3b8;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        </style>
      </head>
      <body>
        <div class="sitemap-container">
          <div class="sitemap-header">
            <h1>
              XML Sitemap 
              <span class="badge">Standard XML 0.9</span>
            </h1>
            <p class="intro">
              Generated for search engines and web crawlers by <strong>Timetable Creator Online</strong>.
              This sitemap indexes all valid canonical web pages, tools, and academic guides.
            </p>
            <p class="stats">
              Total Indexed URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
            </p>
          </div>

          <table cellpadding="3">
            <thead>
              <tr>
                <th width="60%">URL / Location</th>
                <th width="15%">Change Frequency</th>
                <th width="10%">Priority</th>
                <th width="15%">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <xsl:variable name="itemURL">
                      <xsl:value-of select="sitemap:loc"/>
                    </xsl:variable>
                    <a href="{$itemURL}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td>
                    <span class="priority-pill">
                      <xsl:value-of select="sitemap:priority"/>
                    </span>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>

          <div class="footer-note">
            <span>Timetable Creator Online © 2026</span>
            <a href="/">Return to Timetable Creator</a>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
