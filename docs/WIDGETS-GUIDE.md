# Widget Configuration Guide

This guide explains how to configure the featured project widgets that appear on the Entry screen.

## Overview

The portfolio displays featured projects (widgets) on the Entry screen before authentication. These widgets are configurable via JSON files, allowing you to showcase your latest work without hardcoding it into the codebase.

## Configuration Files

### `widgets-config.example.json` (Template)
- **Location**: Project root
- **Purpose**: Example configuration for new users
- **Status**: Committed to repository
- **Do not modify**: This is a template file

### `widgets-config.local.json` (Your Data)
- **Location**: Project root
- **Purpose**: Your actual project widgets
- **Status**: Gitignored (not committed)
- **Modify this**: Add your real projects here

### Server Deployment
On the server, the file should be located at:
- Production: `/path/to/your/app/widgets-config.json`
- Or use `WIDGETS_CONFIG_PATH` environment variable to specify a custom path

## Configuration Structure

The configuration file supports different widget sets for different domains, plus a default fallback.

```json
{
  "example.com": {
    "featuredProjects": [ ... ]
  },
  "design.example.com": {
    "featuredProjects": [ ... ]
  },
  "localhost": {
    "featuredProjects": [ ... ]
  },
  "default": {
    "featuredProjects": [ ... ]
  }
}
```

### Keys
- **Domain Names** (e.g., `example.com`): Exact match for production domains.
- **`localhost`**: Used when running locally (matches `localhost` or `127.0.0.1`). Perfect for testing changes safely.
- **`default`**: Fallback if no domain match is found.

## Widget Object Structure

Inside each domain key, the structure remains the same:

```json
"featuredProjects": [
  {
    "title": "Project Name",
    "description": "Brief description",
    "status": "ACTIVE",
    "link": "https://...",
    "icon": "Bot",
    "label": "$latest_project"
  }
]
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | string | Yes | Display name of the project |
| `description` | string | Yes | One-line description (keep it short!) |
| `status` | string | Yes | Status badge text (e.g., "ACTIVE", "IN DEV", "TESTNET") |
| `link` | string | Yes | URL to the project (opens in new tab) |
| `icon` | string | Yes | Icon name from available icons (see below) |
| `label` | string | No | Terminal-style label (default: "$latest_project") |

## Available Icons

The following Lucide icons are available:

- `Bot` - Robot icon (good for bots, AI projects)
- `LineChart` - Chart icon (good for trading, analytics)
- `Sparkles` - Sparkle icon (good for new features, highlights)
- `Code` - Code icon (good for dev tools, libraries)
- `Rocket` - Rocket icon (good for launches, deployments)
- `Zap` - Lightning icon (good for performance, speed)

If the specified icon is not found, `Sparkles` is used as fallback.

## Example Configuration

```json
{
  "default": {
    "featuredProjects": [
      {
        "title": "Default Project",
        "description": "Visible on all unknown domains",
        "status": "ACTIVE",
        "link": "https://example.com",
        "icon": "Bot",
        "label": "$latest_project"
      }
    ]
  },
  "example.com": {
    "featuredProjects": [
      {
        "title": "Production Bot",
        "description": "Live trading bot",
        "status": "LIVE",
        "link": "https://example.com/bot",
        "icon": "LineChart",
        "label": "$production"
      }
    ]
  },
  "localhost": {
    "featuredProjects": [
      {
        "title": "Test Widget",
        "description": "Only visible locally",
        "status": "TESTING",
        "link": "#",
        "icon": "Zap",
        "label": "$local_test"
      }
    ]
  }
}
```

## Setup Instructions

### Local Development & Testing

1. **Create your local config**:
   ```bash
   cp widgets-config.example.json widgets-config.local.json
   ```

2. **Configure `localhost`**:
   Edit the `localhost` section in `widgets-config.local.json`. This allows you to test widget layouts without affecting production configuration.

3. **Start dev server**:
   ```bash
   npm run dev
   ```

4. **View your widgets**:
   - Navigate to `http://localhost:3000`
   - You will see the widgets defined in the `localhost` section.

### Server Deployment

1. **Copy config to server**:
   ```bash
   scp widgets-config.local.json user@server:/path/to/your/app/widgets-config.json
   ```

2. **Or set environment variable**:
   ```bash
   export WIDGETS_CONFIG_PATH=/path/to/your/widgets-config.json
   ```

## Tips & Best Practices

### Keep Descriptions Short
Descriptions should be one line and ~50 characters or less for best display.

### Limit Widget Count
Display 2-3 widgets maximum. More than 3 may not fit well on smaller screens.

### Use Descriptive Labels
Labels like `$latest_project`, `$side_project`, `$new_feature` give a terminal aesthetic.

### Update Status Regularly
Keep status badges current (`IN DEV`, `TESTNET`, `LIVE`, `ARCHIVED`, etc.)

## Troubleshooting

### Widgets Not Showing
1. Check that `widgets-config.local.json` exists
2. Verify JSON is valid (use a JSON validator)
3. Check browser console for errors
4. Ensure `featuredProjects` is an array

### Wrong Icons Displaying
- Verify icon name matches exactly (case-sensitive)
- Check the available icons list above
- Fallback icon (Sparkles) appears if name is invalid

### Changes Not Reflecting
- Hard refresh the page (Cmd+Shift+R or Ctrl+Shift+R)
- Check file was saved correctly
- Restart dev server if needed

## API Reference

The widgets are served via `/api/widgets` endpoint:

**Response**:
```json
{
  "widgets": {
    "featuredProjects": [...]
  },
  "source": "configured"
}
```

The `source` field indicates whether data came from your config (`configured`) or the example file (`example`).
