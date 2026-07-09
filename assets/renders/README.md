# Render asset slots

The homepage is now render-first. Add exported high-quality static renders here using these exact names:

```txt
assets/renders/engineering-room-desktop.webp
assets/renders/engineering-desk-mobile.webp
```

## Expected art direction

### `engineering-room-desktop.webp`

Widescreen hyperrealistic workstation scene:

- dark wooden engineering desk
- large blackboard wall behind the desk
- chalk sections for system architecture, graph algorithms, machine learning, rendering pipeline, infrastructure, compiler notes, simulation, and teaching methodology
- large ultrawide monitor with an EngineOS-style project dashboard
- notebook, keyboard, mouse, books, circuit board, lamp, and server rack
- warm cinematic lighting
- no face close-up
- no corporate office style

Suggested aspect ratio: `16:9` or wider, at least `2560px` wide.

### `engineering-desk-mobile.webp`

Vertical top-down desk navigation scene:

- laptop/projects area
- teaching notebook
- research paper
- phone/contact
- terminal/GitHub card
- about card
- dark wooden desk
- readable navigation zones

Suggested aspect ratio: `9:16`, at least `1440px` tall.

The CSS/HTML fallback scene remains visible when these files are absent.