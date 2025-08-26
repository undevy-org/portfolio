# Content Model Guide (`content.json`)

This document provides a definitive guide to the structure and purpose of every field within the `content.json` file. This file serves as the single source of truth for all dynamic content in the portfolio.

## Table of Contents
1.  [Top-Level Structure](#1-top-level-structure)
2.  [Personalized Profile Schema](#2-personalized-profile-schema)
    -   [meta object](#21-meta-object)
    -   [profile object](#22-profile-object)
    -   [introduction object](#23-introduction-object)
3.  [Global Data Schema (`GLOBAL_DATA`)](#3-global-data-schema-global_data)
4.  [How Content is Merged (Example Flow)](#4-how-content-is-merged-example-flow)
5.  [Managing Content via Telegram Bot](#5-managing-content-via-telegram-bot)

---

## 1. Top-Level Structure

The `content.json` file is a single JSON object organized into two primary key types:

1.  **Personalized Profiles:** Keys written in all-caps (e.g., `PROFILE123`, `CLIENT456`). Each of these objects represents a unique, personalized experience for a specific access code.
2.  **Global Data:** A single key, `GLOBAL_DATA`, which contains a library of all shared, reusable content like project details, skills, and experience timelines.

This structure allows for maximum flexibility and minimal content duplication. Personalized profiles define *which* content to show, while the `GLOBAL_DATA` object defines *what* that content is.

## 2. Demo Content (`config/demo-content.json`)

The repository includes a `config/demo-content.json` file. This file serves two purposes:
1.  **Structural Reference:** It is a complete, well-structured example of a valid `content.json` file and can be used as a template.
2.  **Demo Mode:** When the application is accessed in demo mode (e.g., without an access code, if enabled), it uses this file to populate the interface.

---

## 3. Personalized Profile Schema

Each personalized profile (e.g., `"PROFILE123": { ... }`) contains the configuration and unique text for a single user journey.

### 3.1. `meta` object

This object acts as the "control panel" for the entire personalized session. It tells the application which pieces of global content to use.

| Key        | Type      | Description                                                                                              | Example               |
| :--------- | :-------- | :------------------------------------------------------------------------------------------------------- | :-------------------- |
| `company`  | `String`  | The name of the company or visitor, displayed in the UI.                                                 | `"Acme Corporation"`     |
| `timeline` | `String`  | Determines which experience timeline to load from `GLOBAL_DATA.experience`. Must match a key.              | `"scenario_b"`        |
| `tone`     | `String`  | Determines which version of the introduction text to use from the `introduction` object.                   | `"technical"`         |
| `cases`    | `Array`   | An array of case study IDs that should be displayed. Must match keys in `GLOBAL_DATA.case_studies`.      | `["case_alpha", "case_beta"]` |

### 3.2. `profile` object

Contains personalized content for the `Introduction` screen.

-   **`summary`**: An object with `title`, `specialization`, and `background` strings for the main profile panel.
-   **`attributes`**: An array of strings highlighting key professional traits.
-   **`status`**: An object containing key-value pairs for the current work status panel (e.g., `seeking`, `location`, `availability`).

Example `profile` object:
```json
"profile": {
  "summary": {
    "title": "Lead Engineer",
    "specialization": "Distributed Systems",
    "background": "Computer Science Background"
  },
  "attributes": [
    "Cloud Architecture Expert",
    "System Design Specialist",
    "Performance Optimization"
  ],
  "status": {
    "seeking": "Senior Technical Roles",
    "location": "Remote (UTC)",
    "availability": "Open to offers"
  }
}
```

### 3.3. `introduction` object

Contains different versions of the introductory text. The `meta.tone` key is used to select which text to display. Common keys include `technical`, `casual`, and `formal`.

---

## 4. Global Data Schema (`GLOBAL_DATA`)

This object is a comprehensive library of all reusable content blocks.

-   **`menu`**: An array of objects defining the main navigation menu. Each object has `label`, `screen`, `icon`, and `desc`. The `screen` value maps directly to a component in `/src/app/screens/` and becomes the URL hash (e.g., `#Introduction`).

-   **`experience`**: An object containing different career timeline scenarios (e.g., `scenario_a`, `scenario_b`). Each scenario is an array of role objects.

-   **`role_details`**: A dictionary where each key is a role `id` (e.g., `role_acme`). The value is an object containing detailed information for that role (`summary`, `responsibilities`, `achievements`, `tech`).

-   **`case_studies`**: A dictionary of all available case studies, where the key is the case `id`. This populates the `CaseList` screen. Each object contains a `title`, `desc`, `metrics`, and `tags`.

-   **`case_details`**: A dictionary containing the full content for each case study. The key must match a case study `id`. Each value contains `challenge`, `approach` (array), `solution`, `results` (array), and `learnings`.

-   **`skills`**: An array of objects for the master list of skills. Each object has `name`, `id`, `level`, and `desc`.

-   **`skill_details`**: A dictionary where each key matches a skill `id`. Each value contains a `description`, `examples` (array), `tools` (array), and `impact`.

-   **`side_projects`**: An array of objects defining personal projects.

-   **`public_speaking`**: An array of objects listing speaking engagements and articles.

-   **`contact`**: An object containing all contact information (`email`, `website`, `social_links`, etc.).

---

## 5. How Content is Merged (Example Flow)

The application’s API intelligently combines a personalized profile with the global data library to create a unique session for each visitor.

1.  **API Request:** The client sends `GET /api/session?code=PROFILE123`.
2.  **Data Retrieval:** The API reads `content.json` and finds two key objects: the `PROFILE123` profile and the `GLOBAL_DATA` library.
3.  **Merging Logic:** The API constructs the final `sessionData` object:
    -   It takes the entire `PROFILE123` object as the base.
    -   It looks at `PROFILE123.meta.timeline` (e.g., `"scenario_b"`) and injects only `GLOBAL_DATA.experience.scenario_b` into the final object.
    -   It filters `GLOBAL_DATA.case_studies` based on the array in `PROFILE123.meta.cases`.
    -   It copies the rest of `GLOBAL_DATA` (like `menu`, `skills`, etc.) directly.
4.  **API Response:** A single, complete `sessionData` object is returned to the client, containing everything needed for the session, already filtered and personalized. The URL might look like: `https://your-domain.com/?code=PROFILE123#Timeline`.

This approach ensures fast, app-like navigation after the initial load, as no further server requests for content are needed.

---

## 6. Managing Content

While the `content.json` file can be edited manually, the recommended way to manage content is through the optional **Telegram Bot CMS**. The bot provides an interactive, user-friendly interface for creating, editing, and versioning content without direct server access.

For detailed instructions on using the bot, please refer to its dedicated repository:
-   **[undevy-org/telegram-bot](https://github.com/undevy-org/telegram-bot)**