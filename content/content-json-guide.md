# Content JSON Guide

This document explains the structure of `content.json` (and `test-content-local.json`) and how to manage portfolio content.

## Structure Overview

The content file is divided into two main sections:
1. **Access Codes** (Top-level keys like `LERUSIK`, `KIER2408`): Define user profiles and accessible content.
2. **GLOBAL_DATA**: Contains shared content like menu items, experience timelines, and case study details.

## Case Studies (`GLOBAL_DATA.case_details`)

Each case study is an object keyed by its ID (e.g., `ekiden_case`).

### Fields
- `challenge`: String. Description of the problem.
- `approach`: Array of Strings. Steps taken to solve the problem.
- `solution`: String. Description of the final solution.
- `results`: Array of Strings. Key outcomes and metrics.
- `learnings`: String (Optional). Key takeaways.
- `hidden_images`: Array of Strings (Optional). List of tabs where images should NOT be shown. Valid values: `"challenge"`, `"approach"`, `"solution"`, `"results"`.

### Images
Images are handled **implicitly** and **automatically**. You do NOT need to define image paths in the JSON.

**Naming Convention:**
Images are located in `public/images/projects/` and must follow this pattern:
- `{case_id}_challenge.webp`
- `{case_id}_approach.webp`
- `{case_id}_solution.webp`
- `{case_id}_results.webp`

**Automatic Creation:**
When deploying (or running `node scripts/ensure_images.js`), the system checks for these 4 images for every case. If an image is missing, it creates a placeholder from `public/images/template.webp`.

**Hiding Images:**
To prevent an image from showing (and prevent the script from creating a placeholder for it), add the tab name to `hidden_images`.

**Example:**
```json
"ekiden_case": {
  "challenge": "...",
  "approach": ["..."],
  "solution": "...",
  "results": ["..."],
  "hidden_images": ["approach", "results"] // Images for approach and results will be hidden
}
```

## Profiles (Access Codes)

Each access code entry defines:
- `meta`: Configuration for the session (company name, allowed cases, etc.).
- `profile`: User-specific data (name, title, attributes).
- `introduction`: tailored intro text.

### Meta Fields
- `company`: Name of the company/viewer.
- `timeline`: Which experience timeline to show (e.g., `scenario_kier`).
- `cases`: Array of case IDs accessible to this user.
