# Atelier OS Blueprint

## Product Position

Atelier OS is a Debian-based creative operating system where the project is the center of gravity. Applications, files, references, palettes, fonts, brushes, exports, and workspace layouts orbit the creative work instead of competing for attention.

The first prototype should prove one idea: a creator can begin a session from a calm Creative Hub without hunting through folders or launchers.

## Experience Principles

1. Project before app: every entry point should ask what the user is making, not which program they want to open.
2. Calm by default: dark monochrome surfaces, excellent type hierarchy, slow transitions, no decorative clutter.
3. Assets are first-class: references, palettes, fonts, brushes, renders, exports, and source files should be searchable together.
4. Professional restraint: the system should feel closer to a studio wall, contact sheet, or architecture archive than a consumer dashboard.
5. Consistent everywhere: spacing, icons, rounded corners, motion, shadows, and controls should come from shared tokens.

## Version 0.1 Scope

- Visual identity and design tokens
- Static Creative Hub prototype
- Project model and information architecture
- Workspace preset definitions
- App catalog for default creative software
- Documentation for system architecture and future implementation

## Core System Model

```text
Desktop Shell
  Creative Hub
    Projects
      Assets
      References
      Palettes
      Fonts
      Brushes
      Exports
      Timeline
    Workspace Presets
    Applications
    Search
```

## Creative Hub Modules

- Recent Projects: last active creative work with status, discipline, and related assets.
- Pinned Projects: long-running client, studio, or school projects.
- Asset Library: visual browser for source files, references, exports, and reusable materials.
- Palette Manager: system-level color sets that can be attached to projects.
- Font Manager: installed and project-linked type families.
- Brush Manager: Krita and compatible creative brush collections.
- Mood Board: references grouped visually with notes and palette extraction later.
- Workspace Presets: discipline modes that open the correct apps and window layouts.
- Creative Search: one search field across projects, assets, apps, fonts, colors, and exports.

## Workspace Presets

- Illustration: Krita, Inkscape, references, brush shelf, palette.
- Photography: Darktable, file manager, recent exports, contact sheet.
- Architecture: Blender, Inkscape, reference viewer, materials.
- Fashion: mood board, Inkscape, palette, asset library.
- Music: Ardour, Audacity, notes, sample library.
- 3D: Blender, texture library, references, render exports.
- Video Editing: Kdenlive, asset bin, audio tools, export queue.

## Technical Architecture

### Prototype

- Browser-based static prototype in this folder.
- Designed to be portable and inspectable without a build step.
- Later migration target: React, TypeScript, Vite, Tailwind CSS, Framer Motion.

### Native Direction

- Debian Stable base.
- Wayland-first desktop.
- GTK4/libadwaita for native apps where practical.
- Rust for system services and performance-sensitive tools.
- Debian packaging for themes, presets, apps, and shell components.

## Visual Direction

The revised prototype uses the "Paper" theme as the primary identity: mostly white, soft black type, pale gray working surfaces, dotted studio grids, and editorial serif moments reserved for project names, greetings, and type-study artifacts.

The OS should feel closer to a quiet creative studio desk than a software dashboard. Core surfaces are native-looking windows with title bars, generous margins, and a floating dock. The default state should avoid dark glass panels, gradient effects, saturated color, and generic dashboard cards.

## Design Tokens

- Spacing: 8px scale.
- Radius: 8px for cards, buttons, windows, and controls.
- Palette: near black, dark gray, light gray, white, subtle borders.
- Accent: optional and user-selected per project, never required for system clarity.
- Typography: modern sans-serif, generous line height, clear hierarchy.
- Motion: subtle fade, scale, and position changes only.

## Next Build Steps

1. Convert the static Creative Hub into a React/Vite app.
2. Add sample project data as typed JSON.
3. Create reusable components for dock, panels, project rows, palettes, and preset controls.
4. Add interaction states for switching workspace presets.
5. Draft native app concepts for Palette, Asset Library, Mood Board, and Project Manager.
6. Define Debian package structure and theme assets for the 0.5 milestone.
