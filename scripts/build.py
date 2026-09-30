#!/usr/bin/env python3
"""
ImmoSignal — E-Mail Build Script (Python-Version)

Liest src/data/content.json und erzeugt eine E-Mail-kompatible,
table-basierte HTML-Datei mit vollständig inline-gestellten Styles
in dist/newsletter-{issue.id}.html (und dist/newsletter-latest.html).

Keine externen Abhängigkeiten — nur Python 3 stdlib.
CSS-Variablen aus tokens.css sind hier hartcodiert aufgelöst.
"""

import json
import os
import sys

# ── Design Tokens (aufgelöst aus src/styles/tokens.css) ──────────────────────
T = {
    "ink":     "#141210",
    "paper":   "#faf9f6",
    "cream":   "#f2efe8",
    "rule":    "#d8d3c8",
    "gold":    "#b8922a",
    "goldLt":  "#f5ead0",
    "green":   "#1e5c3a",
    "greenLt": "#e0ede5",
    "red":     "#b83333",
    "redLt":   "#fdeaea",
    "muted":   "#7a7367",
    "serif":   'Georgia, "Times New Roman", serif',
    "sans":    "Arial, Helvetica, sans-serif",
}

ACCENT = {
    "gold":  {"border": T["gold"],  "eyebrow": T["gold"]},
    "red":   {"border": T["red"],   "eyebrow": T["red"]},
    "green": {"border": T["green"], "eyebrow": T["green"]},
}

HIGHLIGHT_STYLE = {
    "gold":  {"bg": T["goldLt"],  "border": "#e0c97a", "color": "#4a3a10"},
    "green": {"bg": T["greenLt"], "border": "#a8c9b6", "color": "#153d28"},
    "red":   {"bg": T["redLt"],   "border": "#e8b0b0", "color": "#5a1a1a"},
}

TAG_STYLE = {
    "gold":  {"bg": T["goldLt"],  "color": "#7a5f10", "border": "#d4a84a"},
    "green": {"bg": T["greenLt"], "color": T["green"], "border": "#a8c9b6"},
    "red":   {"bg": T["redLt"],   "color": T["red"],   "border": "#e0a0a0"},
}


# ── Bausteine ─────────────────────────────────────────────────────────────────

def wrap(content: str) -> str:
    return f"""<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="de-CH">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <title>ImmoSignal Newsletter</title>
  <style type="text/css">
    body, table, td, a {{ -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }}
    table, td {{ mso-table-lspace: 0pt; mso-table-rspace: 0pt; }}
    img {{ -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }}
    body {{ margin: 0 !important; padding: 0 !important; background-color: {T["cream"]}; }}
    a {{ color: {T["gold"]}; }}
    @media only screen and (max-width: 640px) {{
      .wrapper {{ width: 100% !important; max-width: 100% !important; }}
      .content-pad {{ padding-left: 20px !important; padding-right: 20px !important; }}
    }}
  </style>
</head>
<body style="margin:0;padding:0;background-color:{T["cream"]};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background-color:{T["cream"]};min-width:100%;">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table role="presentation" class="wrapper" width="640" cellpadding="0" cellspacing="0" border="0"
               style="max-width:640px;width:100%;background-color:{T["paper"]};border:1px solid {T["rule"]};">
          {content}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""


def masthead(issue: dict) -> str:
    return f"""
          <!-- MASTHEAD -->
          <tr>
            <td bgcolor="{T["ink"]}" style="background-color:{T["ink"]};padding:28px 40px 0 40px;border-bottom:3px solid {T["gold"]};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:bottom;">
                    <span style="font-family:{T["serif"]};font-size:28px;color:#ffffff;letter-spacing:-0.3px;line-height:1;">Immo<span style="color:{T["gold"]};">Signal</span></span>
                  </td>
                  <td align="right" style="vertical-align:bottom;padding-bottom:4px;">
                    <span style="font-family:{T["sans"]};font-size:10px;font-weight:bold;color:#999999;letter-spacing:0.7px;text-transform:uppercase;line-height:1.5;white-space:nowrap;">
                      Ausgabe {issue["title"]}<br>
                      F&uuml;r {issue["audience"]}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>"""


def subject_strip(subject_lines: list) -> str:
    lines = []
    for s in subject_lines:
        badge = ""
        if s.get("recommended"):
            badge = (
                f' &nbsp;<span style="font-family:{T["sans"]};font-size:10px;font-weight:bold;'
                f'color:{T["gold"]};background-color:{T["goldLt"]};border:1px solid {T["gold"]};'
                f'padding:1px 7px;border-radius:100px;">&#8592; Empfohlen</span>'
            )
        weight = "bold" if s.get("recommended") else "normal"
        lines.append(
            f'<p style="margin:2px 0;font-family:{T["sans"]};font-size:13px;'
            f'color:{T["ink"]};font-weight:{weight};">{s["emoji"]} {s["text"]}{badge}</p>'
        )
    lines_html = "\n              ".join(lines)
    return f"""
          <!-- SUBJECT STRIP -->
          <tr>
            <td bgcolor="{T["goldLt"]}" style="background-color:{T["goldLt"]};padding:10px 40px;border-bottom:1px solid {T["rule"]};">
              <p style="margin:0 0 4px 0;font-family:{T["sans"]};font-size:11px;font-weight:bold;color:{T["gold"]};letter-spacing:0.6px;text-transform:uppercase;">&#128236; Betreffzeilen &mdash; A/B-Test Vorschl&auml;ge</p>
              {lines_html}
            </td>
          </tr>"""


def stat_pills(stats: list) -> str:
    if not stats:
        return ""
    cells = []
    for s in stats:
        if s.get("direction") == "up":
            val_color = T["red"]
        elif s.get("direction") == "down":
            val_color = T["green"]
        else:
            val_color = T["gold"]
        cells.append(
            f'<td style="padding:0 8px 8px 0;vertical-align:top;">'
            f'<table role="presentation" cellpadding="6" cellspacing="0" border="0" '
            f'style="background-color:{T["cream"]};border:1px solid {T["rule"]};border-radius:6px;">'
            f'<tr><td style="font-family:{T["sans"]};font-size:12px;color:{T["ink"]};line-height:1.3;white-space:nowrap;">'
            f'<span style="display:block;font-family:{T["serif"]};font-size:18px;line-height:1.1;color:{val_color};">{s["value"]}</span>'
            f'{s["label"]}</td></tr></table></td>'
        )
    return (
        f'<table role="presentation" cellpadding="0" cellspacing="0" border="0" '
        f'style="margin:10px 0 12px;"><tr>{"".join(cells)}</tr></table>'
    )


def region_row(region_ids: list, region_labels: dict) -> str:
    if not region_ids:
        return ""
    badges = "".join(
        f'<td style="padding:0 6px 6px 0;">'
        f'<span style="font-family:{T["sans"]};font-size:11px;font-weight:bold;padding:3px 10px;'
        f'border-radius:100px;border:1px solid {T["ink"]};background-color:{T["ink"]};'
        f'color:#ffffff;white-space:nowrap;">{region_labels.get(rid, rid)}</span></td>'
        for rid in region_ids
    )
    return (
        f'<table role="presentation" cellpadding="0" cellspacing="0" border="0" '
        f'style="margin:10px 0 14px;"><tr>{badges}</tr></table>'
    )


def highlight_box(h: dict) -> str:
    if not h:
        return ""
    st = HIGHLIGHT_STYLE.get(h["type"], HIGHLIGHT_STYLE["gold"])
    return (
        f'<table role="presentation" width="100%" cellpadding="12" cellspacing="0" border="0" '
        f'style="background-color:{st["bg"]};border:1px solid {st["border"]};border-radius:6px;margin:12px 0;">'
        f'<tr><td style="font-family:{T["sans"]};font-size:13px;line-height:1.6;color:{st["color"]};">'
        f'<strong>{h["label"]}</strong> {h["text"]}</td></tr></table>'
    )


def tag_note(tn: dict) -> str:
    if not tn:
        return ""
    st = TAG_STYLE.get(tn["tagStyle"], TAG_STYLE["gold"])
    return (
        f'<p style="margin:10px 0 0;font-family:{T["sans"]};font-size:14px;color:#3d3830;line-height:1.7;">'
        f'<span style="font-family:{T["sans"]};font-size:10px;font-weight:bold;letter-spacing:0.5px;'
        f'text-transform:uppercase;padding:2px 8px;border-radius:100px;background-color:{st["bg"]};'
        f'color:{st["color"]};border:1px solid {st["border"]};">{tn["tag"]}</span>'
        f'&nbsp;{tn["text"]}</p>'
    )


def insider_tip(tip: dict) -> str:
    if not tip:
        return ""
    title_html = (
        f'<strong style="color:{T["ink"]};">{tip["title"]}</strong> '
        if tip.get("title") else ""
    )
    return (
        f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" '
        f'style="margin:14px 0 0;">'
        f'<tr><td style="border:1.5px dashed {T["gold"]};border-radius:8px;padding:18px 20px;">'
        f'<p style="margin:0 0 6px;font-family:{T["sans"]};font-size:10px;font-weight:bold;'
        f'letter-spacing:0.7px;text-transform:uppercase;color:#ffffff;background-color:{T["gold"]};'
        f'padding:2px 10px;border-radius:100px;display:inline-block;">&#128161; {tip["badge"]}</p>'
        f'<p style="margin:0;font-family:{T["sans"]};font-size:13px;color:#3d3525;line-height:1.65;">'
        f'{title_html}{tip["text"]}</p>'
        f'</td></tr></table>'
    )


def news_card(item: dict, region_labels: dict) -> str:
    ac = ACCENT.get(item["accent"], ACCENT["gold"])
    paragraphs = "".join(
        f'<p style="margin:0 0 10px;font-family:{T["sans"]};font-size:14px;color:#3d3830;line-height:1.7;">{p}</p>'
        for p in item.get("paragraphs", [])
    )
    closing = (
        f'<p style="margin:0 0 10px;font-family:{T["sans"]};font-size:14px;color:#3d3830;line-height:1.7;">'
        f'{item["closingParagraph"]}</p>'
        if item.get("closingParagraph") else ""
    )
    regional_boxes = "".join(highlight_box(b) for b in item.get("regionalBoxes", []))

    return f"""
          <!-- SECTION LABEL -->
          <tr>
            <td style="padding:28px 40px 0;" class="content-pad">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:10px;white-space:nowrap;">
                    <span style="font-family:{T["sans"]};font-size:10px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:{T["muted"]};">{item["sectionLabel"]}</span>
                  </td>
                  <td width="100%" style="border-top:1px solid {T["rule"]};">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- NEWS CARD -->
          <tr>
            <td style="padding:16px 40px 0;" class="content-pad">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="3" bgcolor="{ac["border"]}" style="background-color:{ac["border"]};border-radius:2px;">&nbsp;</td>
                  <td style="padding-left:18px;padding-bottom:24px;vertical-align:top;">
                    <p style="margin:0 0 5px;font-family:{T["sans"]};font-size:10px;font-weight:bold;letter-spacing:0.8px;text-transform:uppercase;color:{ac["eyebrow"]};">{item["eyebrow"]}</p>
                    <h2 style="margin:0 0 10px;font-family:{T["serif"]};font-size:19px;font-weight:normal;line-height:1.3;color:{T["ink"]};">{item["headline"]}</h2>
                    {stat_pills(item.get("stats", []))}
                    {region_row(item.get("regions", []), region_labels)}
                    {paragraphs}
                    {highlight_box(item.get("highlight"))}
                    {regional_boxes}
                    {tag_note(item.get("tagNote"))}
                    {closing}
                    {insider_tip(item.get("insiderTip"))}
                  </td>
                </tr>
              </table>
            </td>
          </tr>"""


def greeting_block(g: dict) -> str:
    return f"""
          <!-- GREETING -->
          <tr>
            <td style="padding:36px 40px 0;" class="content-pad">
              <h1 style="margin:0 0 14px;font-family:{T["serif"]};font-size:26px;font-weight:normal;color:{T["ink"]};line-height:1.25;letter-spacing:-0.2px;">
                {g["headlinePlain"]}<br>
                <em style="font-style:italic;color:{T["gold"]};">{g["headlineEmphasis"]}</em><br>
                {g["headlineSuffix"]}
              </h1>
              <p style="margin:0 0 20px;font-family:{T["sans"]};font-size:14px;color:#3a3630;line-height:1.7;padding-bottom:20px;border-bottom:1px solid {T["rule"]};">{g["intro"]}</p>
            </td>
          </tr>"""


def survey_block(survey: dict) -> str:
    options_html = "".join(
        f'<tr><td style="padding:0 0 9px;">'
        f'<table role="presentation" width="100%" cellpadding="11" cellspacing="0" border="0" '
        f'style="background-color:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.18);border-radius:6px;">'
        f'<tr><td style="font-family:{T["sans"]};font-size:13px;font-weight:bold;color:#e8e5df;">'
        f'<span style="display:inline-block;width:22px;height:22px;border-radius:50%;'
        f'border:1.5px solid rgba(255,255,255,0.3);text-align:center;line-height:22px;'
        f'font-size:11px;margin-right:10px;vertical-align:middle;">{o["id"]}</span>'
        f'{o["label"]}</td></tr></table></td></tr>'
        for o in survey["options"]
    )
    return f"""
          <!-- DIVIDER -->
          <tr>
            <td style="padding:0 40px;" class="content-pad">
              <hr style="border:none;border-top:1px solid {T["rule"]};margin:28px 0;">
            </td>
          </tr>
          <!-- SURVEY -->
          <tr>
            <td style="padding:0 40px;" class="content-pad">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                     bgcolor="{T["ink"]}" style="background-color:{T["ink"]};border-radius:8px;margin:0 0 28px;">
                <tr>
                  <td style="padding:28px 30px;">
                    <h3 style="margin:0 0 6px;font-family:{T["serif"]};font-size:20px;color:#ffffff;font-weight:normal;line-height:1.3;">{survey["title"]}</h3>
                    <p style="margin:0 0 14px;font-family:{T["sans"]};font-size:13px;color:#aaaaaa;">{survey["subtitle"]}</p>
                    <p style="margin:0 0 18px;font-family:{T["sans"]};font-size:14px;color:#e8e5df;font-weight:bold;">{survey["question"]}</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      {options_html}
                    </table>
                    <p style="margin:14px 0 0;font-family:{T["sans"]};font-size:11px;color:#666666;text-align:center;">Klicke auf deine Antwort im E-Mail-Client oder &ouml;ffne die Web-Version f&uuml;r das interaktive Ergebnis.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>"""


def cta_block(cta: dict) -> str:
    return f"""
          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 28px;" class="content-pad">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                     bgcolor="{T["green"]}" style="background-color:{T["green"]};border-radius:8px;text-align:center;">
                <tr>
                  <td style="padding:30px;text-align:center;">
                    <h3 style="margin:0 0 8px;font-family:{T["serif"]};font-size:22px;color:#ffffff;font-weight:normal;line-height:1.3;">{cta["headline"]}</h3>
                    <p style="margin:0 0 20px;font-family:{T["sans"]};font-size:13px;color:rgba(255,255,255,0.8);line-height:1.6;">{cta["text"]}</p>
                    <a href="{cta["buttonUrl"]}" style="display:inline-block;background-color:#ffffff;color:{T["green"]};font-family:{T["sans"]};font-size:14px;font-weight:bold;padding:13px 30px;border-radius:6px;text-decoration:none;letter-spacing:0.2px;">{cta["buttonLabel"]}</a>
                    <p style="margin:10px 0 0;font-family:{T["sans"]};font-size:11px;color:rgba(255,255,255,0.55);">{cta["note"]}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>"""


def footer_block(f: dict) -> str:
    links = " &nbsp;&middot;&nbsp; ".join(
        f'<a href="{l["url"]}" style="color:{T["gold"]};text-decoration:none;font-weight:bold;">{l["label"]}</a>'
        for l in f["links"]
    )
    return f"""
          <!-- FOOTER -->
          <tr>
            <td bgcolor="{T["cream"]}" style="background-color:{T["cream"]};border-top:1px solid {T["rule"]};padding:20px 40px;text-align:center;" class="content-pad">
              <p style="margin:0;font-family:{T["sans"]};font-size:11px;color:{T["muted"]};line-height:1.7;">
                {f["unsubscribeText"]}<br>
                {links}<br><br>
                {f["company"]}<br>
                {f["disclaimer"]}
              </p>
            </td>
          </tr>"""


# ── Haupt-Build-Funktion ──────────────────────────────────────────────────────

def build(content: dict) -> str:
    region_labels = content.get("regionLabels", {})
    sections = [
        masthead(content["issue"]),
        subject_strip(content["subjectLines"]),
        greeting_block(content["greeting"]),
        *[news_card(item, region_labels) for item in content["newsItems"]],
        survey_block(content["survey"]),
        cta_block(content["cta"]),
        footer_block(content["footer"]),
    ]
    return wrap("\n".join(sections))


# ── Entry Point ───────────────────────────────────────────────────────────────

def main():
    root_dir   = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    src_data   = os.path.join(root_dir, "src", "data", "content.json")
    dist_dir   = os.path.join(root_dir, "dist")

    with open(src_data, "r", encoding="utf-8") as fh:
        content = json.load(fh)

    html = build(content)

    os.makedirs(dist_dir, exist_ok=True)

    issue_id = content["issue"]["id"]
    out_file    = os.path.join(dist_dir, f"newsletter-{issue_id}.html")
    latest_file = os.path.join(dist_dir, "newsletter-latest.html")

    with open(out_file, "w", encoding="utf-8") as fh:
        fh.write(html)
    with open(latest_file, "w", encoding="utf-8") as fh:
        fh.write(html)

    size_kb = len(html.encode("utf-8")) / 1024
    print(f"✓ Gebaut:  dist/newsletter-{issue_id}.html")
    print(f"✓ Kopiert: dist/newsletter-latest.html")
    print(f"  {size_kb:.1f} KB")


if __name__ == "__main__":
    main()
