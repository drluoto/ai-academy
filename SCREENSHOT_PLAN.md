# Academy Screenshot & Demo Plan

> Replace ALL CSS mockups across the entire Vitronia Academy with real screenshots and demo content.

## Current State

### Existing Screenshots (Cowork only)
```
screenshots/
├── cowork-01-start.png      ✓ Empty Cowork start
├── cowork-01-window.png      ✗ Full screen (not useful)
├── cowork-02-folder.png      ~ Same as 01
├── cowork-03-folder-selected.png  ✓ macOS folder picker
├── cowork-04-folder-active.png    ✓ Folder selected in chat bar
├── cowork-05-prompt-typed.png     ✓ Prompt typed
├── cowork-06-response.png         ~ Permission dialog (not ideal)
├── cowork-07-result.png           ✓ Progress panel
├── cowork-08-complete.png         ✓ Processing steps
├── cowork-09-final.png            ~ Has notification overlay (retake)
```

### Mockup Inventory Per Module

| Module | File | CSS Mockups | Count |
|--------|------|-------------|-------|
| **1. Reveal** | `reveal.html` | `excel-mockup` (messy Excel visualization) | 1 |
| **2. Cowork** | `cowork.html` | `mockup-browser` (download page), `mockup-browser` (login), `mockup-desktop` (file icon), `mockup-cowork` (output x2) | 5 |
| **3. Rapport** | `rapport.html` | `claude-mockup` (working steps), `report-mockup` (report output), `claude-mockup` (project settings) | 3 |
| **4. Automation** | `automation.html` | `marketplace-mockup`, `chat-mockup`, `settings-mockup`, `skill-card-mockup`, `schedule-mockup`, `plugin-create-mockup` | 6 |
| **5. Claude Code** | `claude-code.html` | `mockup-window` (Desktop chat), `mockup-window--code` (terminal) | 2 |
| **TOTAL** | | | **17** |

---

## Capture Methods

### Method A: AppleScript + screencapture (Claude Desktop / native apps)
- Activate app via AppleScript
- Type/interact via `keystroke` commands
- Capture via `screencapture -x -R x,y,w,h filename.png`
- **Best for:** Claude Desktop UI, Finder, Numbers, Excel

### Method B: Playwright screenshot (web apps)
- Navigate to URL, interact, `page.screenshot()`
- **Best for:** Vitronia portal pages (Finance Portal, ESG Portal, Shadow IC)
- Can use demo-recorder skill for video sequences

### Method C: Manual staging + capture
- Set up the state manually, then capture programmatically
- **Best for:** Complex multi-step states that are hard to automate

### Method D: Video recording (demo-recorder skill)
- Playwright-based pipeline with YAML scripts
- Good for showing full workflows in motion
- Needs adaptation for native apps (AppleScript + screencapture in loop)

---

## Module Plans

### Module 1: Reveal (`reveal.html`) — "Från Excel till styrelseunderlag"

**Current mockup:** CSS `excel-mockup` — a fake messy Excel grid showing budget data

**Replace with:**

| ID | Screenshot | What it shows | Method | Priority |
|----|-----------|---------------|--------|----------|
| R01 | `reveal-01-messy-excel.png` | Real Excel/Numbers with the sample budget_2025.xlsx open — messy, unformatted, raw data | A (Numbers) | HIGH |
| R02 | `reveal-02-prompt.png` | Claude Desktop with the analysis prompt typed in, Cowork-main folder active | A (Claude) | HIGH |
| R03 | `reveal-03-working.png` | Claude processing — showing progress steps (reading file, analyzing, writing) | A (Claude) | HIGH |
| R04 | `reveal-04-output.pdf` | The finished board report PDF — clean, formatted, professional | C (open PDF) | HIGH |

**Narrative:** Messy Excel → Claude prompt → Processing → Beautiful PDF. The core story of the page.

**Implementation notes:**
- Use existing `budget_2025.xlsx` in `~/Documents/Cowork-main/`
- For R01: Open in Numbers, zoom to show messy data, capture window
- For R04: Generate a real PDF via Claude Desktop, then screenshot the opened PDF
- Keep the "before/after" split layout — Excel on left/top, PDF on right/bottom

---

### Module 2: Cowork (`cowork.html`) — "Arbeta med Claude"

**Current mockups:** 5 CSS mockups (download page, login, file icon, output table x2)

**Replace with real screenshots:**

| ID | Screenshot | Replaces | Method | Priority |
|----|-----------|----------|--------|----------|
| C01 | `cowork-01-start.png` | `mockup-browser` (download) | EXISTS | ✓ |
| C02 | `cowork-02-login.png` | `mockup-browser` (login) | A (Claude Desktop login screen) | HIGH |
| C03 | `cowork-03-folder-picker.png` | - | EXISTS (`cowork-03-folder-selected.png`) | ✓ |
| C04 | `cowork-04-folder-active.png` | `mockup-desktop` (file icon) | EXISTS | ✓ |
| C05 | `cowork-05-prompt.png` | - | EXISTS (`cowork-05-prompt-typed.png`) | ✓ |
| C06 | `cowork-06-working.png` | - | A (processing state) | MEDIUM |
| C07 | `cowork-07-result.png` | `mockup-cowork` (output) | EXISTS (needs cleanup) | ✓ |
| C08 | `cowork-08-finder-output.png` | - | A (Finder showing saved file) | HIGH |
| C09 | `cowork-09-excel-opened.png` | - | A (output Excel in Numbers) | HIGH |
| C10 | `cowork-10-vague-prompt.png` | `mockup-cowork` (error comparison) | A (vague prompt → bad result) | MEDIUM |
| C11 | `cowork-09-final.png` | - | RETAKE (remove notification) | LOW |

**Narrative flow:**
1. Download/open Claude → Login → Pick folder "Cowork-main"
2. Type structured prompt → Claude works → Result with table
3. Find output file in Finder → Open in Numbers
4. Comparison: Vague prompt vs structured prompt

**Implementation notes:**
- Use instruction text: "Skapa en ny mapp och namnge den 'Cowork-main'"
- Most screenshots already exist from previous session
- Main gaps: login screen (C02), Finder output (C08), Numbers result (C09)
- The "comparison" section (vague vs good prompt) needs both a good and bad example

---

### Module 3: Rapport (`rapport.html`) — "Bygg rapporter med kontext"

**Current mockups:** 2x `claude-mockup` (working steps + project settings), 1x `report-mockup` (output)

**Replace with:**

| ID | Screenshot | Replaces | Method | Priority |
|----|-----------|----------|--------|----------|
| RA01 | `rapport-01-project-setup.png` | `claude-mockup` (project settings) | A (Claude Desktop project settings dialog) | HIGH |
| RA02 | `rapport-02-context-files.png` | - | A (Finder showing context folder with .md files) | HIGH |
| RA03 | `rapport-03-prompt.png` | - | A (Claude Desktop with rapport prompt) | MEDIUM |
| RA04 | `rapport-04-working.png` | `claude-mockup` (working steps) | A (Claude processing with progress steps visible) | HIGH |
| RA05 | `rapport-05-output.png` | `report-mockup` (report output) | C (screenshot of generated report in browser/PDF) | HIGH |
| RA06 | `rapport-06-instructions.md` | - | A (Claude Desktop showing project instructions file) | MEDIUM |

**Narrative:** Create a project → Add context files → Write instructions → Prompt → Claude generates → Professional report output.

**Implementation notes:**
- Create a demo project "Månadsrapport Q1" in Claude Desktop
- Add context files to project folder (sample .md files with financial data)
- The "working" screenshot should show real Cowork progress steps
- Report output: Generate an actual HTML report, open in browser, screenshot
- Could use existing Vitronia Finance Portal report as the output screenshot (Method B)

---

### Module 4: Automation (`automation.html`) — "Automatisera med plugins"

**Current mockups:** 6 CSS mockups — the most mockup-heavy page

This module is about Claude Desktop's plugin/skill system. **Problem:** This is a future/conceptual feature — there may not be real UI to screenshot yet.

**Strategy:** Two options:
1. **If Claude Desktop has plugins UI:** Screenshot real plugin marketplace, settings, etc.
2. **If not available yet:** Use the existing Vitronia platform UIs as proxy demos — showing what automation looks like in production (Finance Portal scheduled reports, ESG data collection, etc.)

**Replace with:**

| ID | Screenshot | Replaces | Method | Priority |
|----|-----------|----------|--------|----------|
| A01 | `auto-01-marketplace.png` | `marketplace-mockup` | A or B (real plugin UI or portal marketplace) | HIGH |
| A02 | `auto-02-chat-plugin.png` | `chat-mockup` | A (Claude Desktop using a / command) | HIGH |
| A03 | `auto-03-settings.png` | `settings-mockup` | A (Claude Desktop settings panel) | MEDIUM |
| A04 | `auto-04-skill-card.png` | `skill-card-mockup` | A or B (real skill card UI) | MEDIUM |
| A05 | `auto-05-schedule.png` | `schedule-mockup` | A or B (scheduling interface) | MEDIUM |
| A06 | `auto-06-create-plugin.png` | `plugin-create-mockup` | A (plugin creation form) | MEDIUM |

**Narrative:** Browse marketplace → Install plugin → Use via / command → Configure in settings → Create your own → Schedule it.

**Implementation notes:**
- **Critical decision:** Check if Claude Desktop actually has a plugin marketplace UI
- If plugins don't exist in Claude Desktop yet, we may need to keep some CSS mockups or use annotated concept screenshots
- Alternative: Use MCP server configuration (which IS real) as the "plugin" equivalent
- The chat mockup (A02) is achievable — just show Claude Desktop with a / command
- Settings (A03) IS real — Claude Desktop has a settings panel

---

### Module 5: Claude Code (`claude-code.html`) — "Nästa nivå"

**Current mockups:** 2 side-by-side windows (Desktop chat + terminal)

**Replace with:**

| ID | Screenshot | Replaces | Method | Priority |
|----|-----------|----------|--------|----------|
| CC01 | `code-01-desktop-chat.png` | `mockup-window` (Desktop) | A (real Claude Desktop conversation) | HIGH |
| CC02 | `code-02-terminal.png` | `mockup-window--code` (terminal) | A (real Claude Code in terminal) | HIGH |
| CC03 | `code-03-side-by-side.png` | Both combined | C (composite of CC01 + CC02) | HIGH |
| CC04 | `code-04-agent-output.png` | - | A (Claude Code agent completing a task) | MEDIUM |
| CC05 | `code-05-vitronia-portal.png` | - | B (Finance Portal or ESG Portal live) | HIGH |

**Narrative:** Desktop = personal productivity → Code = organizational systems. Side-by-side comparison, then showcase of what Claude Code builds (Vitronia platforms).

**Implementation notes:**
- CC01: Open Claude Desktop, show a simple question/answer
- CC02: Open Terminal, run Claude Code, show it reading files / running commands
- CC03: Composite image — place both side by side (can be done in HTML via `<picture>` grid)
- CC05: Screenshot of actual portal.vitronia.ai or esg.vitronia.ai — the "bridge card" section already references these

---

## Cross-Module: HTML Implementation Pattern

### Image Container Pattern
```html
<!-- Replace CSS mockup with real screenshot -->
<div class="screenshot-frame">
  <picture>
    <source srcset="screenshots/module-01-name.webp" type="image/webp">
    <img src="screenshots/module-01-name.png"
         alt="Descriptive alt text"
         loading="lazy"
         class="screenshot-frame__img">
  </picture>
  <!-- HTML annotation overlay (not burned into image) -->
  <div class="screenshot-annotation" style="top: 30%; left: 60%;">
    <span class="annotation-marker">1</span>
    <span class="annotation-text">Välj din arbetsmapp här</span>
  </div>
</div>
```

### CSS for Screenshot Frames
```css
.screenshot-frame {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow:
    0 0 0 1px var(--glass-border),
    0 24px 64px rgba(0, 0, 0, 0.4);
}

.screenshot-frame__img {
  width: 100%;
  height: auto;
  display: block;
}

/* Click-to-zoom lightbox */
.screenshot-frame__img:hover {
  cursor: zoom-in;
}

.screenshot-annotation {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  pointer-events: none;
}

.annotation-marker {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  display: grid;
  place-items: center;
}

.annotation-text {
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius);
  font-size: 0.8125rem;
  white-space: nowrap;
}
```

### WebP Conversion
```bash
# Convert all PNGs to WebP (keep originals as fallback)
for f in screenshots/*.png; do
  cwebp -q 85 "$f" -o "${f%.png}.webp"
done
```

### Performance Budget
- Each screenshot: max 500KB PNG, target 100-200KB WebP
- `loading="lazy"` on all images below the fold
- First screenshot per module: `loading="eager"` (above fold)

---

## Video Opportunities

Beyond static screenshots, some sequences work better as short video clips:

| Module | Video | What it shows | Duration | Method |
|--------|-------|---------------|----------|--------|
| Reveal | `reveal-demo.mp4` | Full Excel→PDF transformation | 30-60s | demo-recorder (adapted for AppleScript) |
| Cowork | `cowork-demo.mp4` | Folder setup → prompt → result | 45-60s | demo-recorder (adapted) |
| Rapport | `rapport-demo.mp4` | Context engineering → report generation | 30-45s | demo-recorder (adapted) |

**Demo-recorder adaptation needed:**
- Current demo-recorder uses Playwright for web apps
- Needs adaptation layer for native macOS apps (AppleScript + screencapture in loop)
- Frame capture: `screencapture -x` at 2-4 fps, then `ffmpeg` to encode
- Could also use macOS screen recording (`screencapture -v`)

---

## Execution Order

**Phase 1: Quick wins — use existing screenshots** (Cowork module)
1. Integrate existing cowork-01 through cowork-09 into cowork.html
2. Add CSS for screenshot-frame pattern
3. Retake cowork-09 (remove notification overlay)

**Phase 2: Easy captures — Claude Desktop states**
4. Capture login screen (C02)
5. Capture Finder with output files (C08, C09)
6. Capture Claude Desktop project settings (RA01)
7. Capture Claude Code in terminal (CC02)

**Phase 3: Demo sequences — staged workflows**
8. Reveal module: Open Excel → prompt → output
9. Rapport module: Project setup → context → report
10. Claude Code: Desktop vs Code side-by-side

**Phase 4: Complex captures — Automation module**
11. Investigate Claude Desktop plugin/MCP UI availability
12. Capture available UI elements
13. Decision: keep conceptual mockups vs real UI for missing features

**Phase 5: Video content (optional, high impact)**
14. Adapt demo-recorder for native app capture
15. Record Reveal demo (Excel → PDF)
16. Record Cowork demo (folder → result)

---

## File Naming Convention

```
screenshots/
├── reveal-01-messy-excel.png
├── reveal-02-prompt.png
├── reveal-03-working.png
├── reveal-04-output.png
├── cowork-01-start.png          (exists)
├── cowork-02-login.png
├── cowork-03-folder-picker.png  (exists as cowork-03-folder-selected.png)
├── cowork-04-folder-active.png  (exists)
├── cowork-05-prompt.png         (exists as cowork-05-prompt-typed.png)
├── cowork-06-working.png
├── cowork-07-result.png         (exists)
├── cowork-08-finder-output.png
├── cowork-09-excel-opened.png
├── cowork-10-vague-prompt.png
├── rapport-01-project-setup.png
├── rapport-02-context-files.png
├── rapport-03-prompt.png
├── rapport-04-working.png
├── rapport-05-output.png
├── rapport-06-instructions.png
├── auto-01-marketplace.png
├── auto-02-chat-plugin.png
├── auto-03-settings.png
├── auto-04-skill-card.png
├── auto-05-schedule.png
├── auto-06-create-plugin.png
├── code-01-desktop-chat.png
├── code-02-terminal.png
├── code-03-side-by-side.png
├── code-04-agent-output.png
└── code-05-vitronia-portal.png
```

Total: ~30 screenshots across 5 modules (10 already exist for Cowork).

---

## Privacy & Safety

- **NEVER** capture personal data, passwords, API keys, or private file paths
- Use the sample `Cowork-main` folder with synthetic data only
- Crop/blur any macOS username or personal folders if visible
- Use `screencapture -R x,y,w,h` to capture only the app window, not full screen
- Review each screenshot before committing
