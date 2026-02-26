# Amazon Review Studio - Onboarding & Walkthrough Plan

## 1. Feature Analysis & Selection

The Amazon Review Studio is packed with features, many of which are "hidden" or might not be immediately obvious to a first-time user unless explicitly pointed out. We need to focus the walkthrough on high-value QoL features. AI is disabled by default and has its own settings screen, so it is intentionally excluded from the main tour.

### Features that REQUIRE a Walkthrough:
1. **Auto-Save Drafts/Images**: It operates silently in the background, but users need to know they no longer have to fear losing their work if the page reloads.
2. **Text Formatting Toolbar (Unicode + Keyboard Shortcuts)**: Users are used to plain text on Amazon. We need to show them that Bold, Italic, and other styles work — and that they can use `Ctrl+B` / `Ctrl+I` just like Word.
3. **Templates**: A big feature. Users can save full review blueprints and load them in one click. Without a walkthrough, many people would never discover this.
4. **Saved Phrases**: Another major feature. A personal library of common snippets that can be inserted instantly. Deserves its own step.
5. **Media Upload (Ctrl+V / Drag & Drop)**: Radically changes the upload workflow. Users need to know they can just hit `Ctrl+V`.
6. **Dark Mode / UI Scale**: Users should know they can change the theme (long click the moon icon) and physically rescale the studio panel to their liking.
7. **Settings / Cloud Sync Setup**: Requires user setup (Pastebin credentials) to function fully. Users need to know where to enter them.

### Features that DO NOT require a Walkthrough:
- **AI Assistant**: Disabled by default; has its own dedicated setup and discovery flow inside Settings.
- **AI Title Generation Button**: Only visible when AI is enabled, so irrelevant for a first-time tour.
- **Product Header / Star Rating**: Standard Amazon functionality, just visually refreshed.
- **Submit / Back Buttons**: Self-explanatory.

---

## 2. The Guided Tour Flow (Step-by-Step)

The walkthrough will trigger automatically the first time the React app mounts, provided the `ars_onboarding_completed` flag is not set in `localStorage`.

The onboarding begins with a **full-screen Welcome Modal** (not a spotlight step) and then transitions into a spotlight-driven walkthrough for each feature.

---

### Step 0 (Welcome Modal): Welcome to Review Studio
- **Type**: Full-screen centered modal — no spotlight, no target element.
- **Title**: Welcome to Review Studio ✨
- **Content**:
  > The clunky Amazon review form has been upgraded. This guided tour will show you the most important features so you can hit the ground running.
  >
  > **Your draft is already being saved.** Every character you type is immediately saved locally. If you accidentally close the tab, your draft, your title, and even your uploaded images will be waiting when you return.


- **Actions**: `[ Start Tour →  ]`  |  `[ Skip ]`

---

### Step 1: The Formatting Toolbar
- **Target Element**: `.ars-editor-toolbar .ars-toolbar-group:first-child` (the left group of style buttons)
- **Spotlight Shape**: Horizontal bar around the left formatting button group.
- **Title**: Style Like a Word Processor
- **Content**:
  > Amazon only allows plain text, but Review Studio uses **Unicode** behind the scenes so your styles — Bold, Italic, Monospace, and more — actually render on the live site.
  >
  > Use the toolbar buttons, or use keyboard shortcuts just like any text editor:
  > - **`Ctrl+B`** → **Bold**
  > - **`Ctrl+I`** → *Italic*
  >
  > You can also select existing text and toggle a style to apply or remove it. The eraser button on the right strips all formatting back to plain text.

- **Placement**: Below the toolbar.

---

### Step 2: Templates — Your Review Blueprints
- **Target Element**: `.ars-toolbar-btn[title="Templates"]` (the Layout icon button in the right toolbar group)
- **Spotlight Shape**: Tight circle around the Templates button.
- **Title**: Never Start from Scratch Again
- **Content**:
  > **Templates** are reusable review structures. For example, if you always write tech reviews with "Build Quality," "Performance," and "Value" sections, save that layout once and load it in a single click.
  >
  > Click this button to browse your saved templates. From there you can also open the **Template Manager** to create, edit, and reorder them.

- **Placement**: Below the button.

---

### Step 3: Saved Phrases — Your Personal Snippet Library
- **Target Element**: `.ars-toolbar-btn[title="Insert Phrase"]` (the MessageSquare icon button in the right toolbar group)
- **Spotlight Shape**: Tight circle around the Phrases button.
- **Title**: Insert Anything in One Click
- **Content**:
  > **Saved Phrases** are your personal library of common text snippets. Things you find yourself writing over and over — like *"The packaging was minimal and eco-friendly"* or *"Here are the pros and cons:"* — can be saved here and inserted with a single click.
  >
  > Click this button to browse and insert your phrases. You can add, edit, and remove them from the same popover.

- **Placement**: Below the button.

---

### Step 4: Paste & Drop Media
- **Target Element**: `.ars-media-upload-wrapper`
- **Spotlight Shape**: Box around the entire upload section (drop zone + action buttons).
- **Title**: No More "Browse File" Dialogs
- **Content**:
  > Uploading photos just got way easier. You can:
  > - **Drag & drop** files directly onto the drop zone.
  > - Copy a screenshot and press **`Ctrl+V`** anywhere on the page to paste it instantly.
  > - Open your **Google Photos** or **iCloud Photos** library directly via the buttons below.

- **Placement**: Above the upload section.

---

### Step 5: Dark Mode & UI Scale
- **Target Element**: `.ars-header-actions` (the top-right corner action buttons — Moon + Gear)
- **Spotlight Shape**: Box around the two corner buttons.
- **Title**: Make It Yours
- **Content**:
  > These two buttons live in the top-right corner of the studio:
  >
  > - **Moon icon**: Dims the rest of the Amazon page so the studio is the only thing visible. Helps reduce distractions. **Long-press** it to toggle full Dark Mode.
  > - **Grip handle** (bottom-right corner of the panel): Drag it left or right to scale the entire studio down so it fits your screen better. Double-click to reset.

- **Placement**: Below-left of the buttons (tooltip pointing up-right).

---

### Step 6: Settings & Cloud Sync
- **Target Element**: `.ars-header-actions button[aria-label="Settings"]` (the Settings Gear)
- **Spotlight Shape**: Circle or tight box around the gear icon.
- **Title**: Your Settings & Cloud Backup
- **Content**:
  > Tap the **gear icon** to open the full Settings dashboard. This is where you can:
  > - Set up **Cloud Sync** using a Pastebin account to keep your templates and phrases backed up across all your devices.
  > - Enable the optional **AI Writing Assistant** if you want AI-generated review help.
  > - Adjust advanced behavior like auto-resize, bullet styles, and more.

- **Placement**: Left of the gear button (tooltip pointing right).

---

## 3. Technical Implementation Strategy

### A. State Management & Persistence
- On app mount, check: `localStorage.getItem('ars_onboarding_completed') === 'true'`.
- If not set, set `isTourActive = true` and start at `step = -1` (the Welcome Modal).
- On "Skip" or "Finish": set `localStorage.setItem('ars_onboarding_completed', 'true')` and close the Tour.
- A "Replay Tour" option can be added in the Settings Debug panel for testing.

### B. The `TourGuide` Component
We will build a **custom lightweight `TourGuide`** rather than pulling in a third-party library, keeping the userscript bundle small and working correctly within the Shadow DOM / injected root environment.

**Architecture:**
- `TourGuide.tsx` — The top-level controller component. Receives a `steps[]` array and `currentStep` index. Handles rendering the overlay, spotlight, and tooltip.
- `tourSteps.ts` — A pure data file containing the step definitions (target selector, title, content, placement).
- Integrated into `App.tsx` at the top level.

**Overlay & Spotlight:**
- A `<svg>` fullscreen overlay using `pointer-events: auto` covers the viewport.
- An SVG `<mask>` cuts out a rounded-rectangle highlight over the target element's `getBoundingClientRect()`.
- A tooltip `<div>` is positioned near the cutout (above/below/left/right depending on `placement` config + auto-flip if near viewport edge).

**Tooltip Anatomy:**
```
┌─────────────────────────────────────┐
│  [Icon]  Step Title                 │
│                                     │
│  Description content here...        │
│                                     │
│  Step 2 of 6   [Skip]  [← Back] [Next →] │
└─────────────────────────────────────┘
```

### C. App.tsx Integration
```typescript
// In App.tsx
const [isTourActive, setIsTourActive] = useState(false);
const [tourStep, setTourStep] = useState(-1); // -1 = Welcome Modal

useEffect(() => {
    if (!localStorage.getItem('ars_onboarding_completed')) {
        // Small delay so the app fully mounts before measuring DOM elements
        setTimeout(() => setIsTourActive(true), 800);
    }
}, []);

const handleTourComplete = () => {
    localStorage.setItem('ars_onboarding_completed', 'true');
    setIsTourActive(false);
};
```

### D. Step Targeting & Scrolling
- On each step advance, call `targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' })`.
- Re-measure `getBoundingClientRect()` after scroll settles (100ms delay).
- Recalculate on window `resize` and whenever `amazon_ui_scale` changes (since `ScalingWrapper` uses `transform: scale()`).
- If a target element cannot be found (e.g., AI is hidden), **skip that step silently**.

### E. Step Definitions File (`tourSteps.ts`)

```typescript
export interface TourStep {
    id: string;
    targetSelector: string | null; // null = Welcome modal (no spotlight)
    title: string;
    content: React.ReactNode;
    placement: 'top' | 'bottom' | 'left' | 'right';
    spotlightPadding?: number; // px extra padding around target
}

export const TOUR_STEPS: TourStep[] = [
    // Step 1: Formatting Toolbar (style buttons)
    { id: 'toolbar', targetSelector: '.ars-editor-toolbar .ars-toolbar-group:first-child', ... },
    // Step 2: Templates
    { id: 'templates', targetSelector: '.ars-toolbar-btn[title="Templates"]', ... },
    // Step 3: Saved Phrases
    { id: 'phrases', targetSelector: '.ars-toolbar-btn[title="Insert Phrase"]', ... },
    // Step 4: Media Upload
    { id: 'media', targetSelector: '.ars-media-upload-wrapper', ... },
    // Step 5: Dark Mode & UI Scale
    { id: 'theme', targetSelector: '.ars-header-actions', ... },
    // Step 6: Settings
    { id: 'settings', targetSelector: 'button[aria-label="Settings"]', ... },
];
```

### F. Execution Order
1. ✅ Create `src/components/common/TourGuide.tsx` — overlay, spotlight SVG, and animated tooltip.
2. ✅ Create `src/constants/tourSteps.tsx` — step definitions.
3. ✅ Update `src/App.tsx` — add tour state + render `<TourGuide />`.
4. ✅ Add a "Replay Tour" button in `SettingsDashboard.tsx` under the Debug section (resets the localStorage flag).
5. ⬜ Create `src/constants/cloudSyncTourSteps.tsx` — Cloud Sync walkthrough step definitions.
6. ⬜ Integrate cloud sync tour into `SettingsDashboard.tsx` — triggers when user opens `sync` tab with no `ars_sync_tour_completed` flag.

---

## 4. Cloud Sync Settings Walkthrough

This is a **separate, contextual walkthrough** that lives inside the Settings modal, triggered **independently** of the main app tour above. It activates the first time the user visits the **Cloud Sync tab** in Settings, guiding them step-by-step through the entire setup process.

### Trigger Logic
- Check `localStorage.getItem('ars_sync_tour_completed') === 'true'` when `activeTab === 'sync'` first renders.
- If not set AND the user has no `amazon_pastebin_api_dev_key` configured yet, fire the tour automatically.
- Replay available via a dedicated "How to Set Up Cloud Sync" button visible at the top of the Cloud Sync tab.

### Context
Because these steps target elements **inside the Settings Modal** (not the main app), the `TourGuide` spotlight coordinate system must account for the fact that the modal is positioned within the shadow root's scroll container. The same `getBoundingClientRect()` approach works since these are fixed-position elements.

---

### Sync Step 1: What Is Cloud Sync?
- **Target Element**: `.ars-settings-section` header containing "Cloud Sync Settings" (the `h3` at the top of the tab)
- **Spotlight Shape**: Full-width bar around the section heading area.
- **Title**: Back Up Your Work Across Devices
- **Content**:
  > **Cloud Sync** uses your free Pastebin account to store your Templates and Phrases in the cloud. Once set up, any device running Review Studio can sync and restore your entire content library in one click.
  >
  > Setup takes about 2 minutes. Follow the steps below.

- **Placement**: Bottom.

---

### Sync Step 2: The API Dev Key
- **Target Element**: `.ars-setting-group:nth-of-type(2)` — the Pastebin Credentials card (the one with the orange Key icon and "Pastebin Credentials" label)
- **Spotlight Shape**: Rounded box around the entire credentials card.
- **Title**: Step 1 — Get Your API Dev Key
- **Content**:
  > An **API Dev Key** is a unique token that lets Review Studio talk to Pastebin on your behalf. It's free and only takes a moment to get:
  >
  > 1. Go to [pastebin.com](https://pastebin.com/) and log in (or sign up — it's free).
  > 2. Navigate to **pastebin.com/doc_api** → scroll to the top to find your **Unique Developer API Key**.
  > 3. Copy it and paste it into the **API Dev Key** field here.

- **Placement**: Right (or Bottom if no room on right).

---

### Sync Step 3: Your Username & Password + Generate the User Key
- **Target Element**: `div.grid.grid-cols-2` + `div.flex.gap-3` row (the username/password grid and the Generate/Test buttons beneath it)
- **Spotlight Shape**: Box covering both the username/password inputs and the button row beneath them.
- **Title**: Step 2 — Link Your Pastebin Account
- **Content**:
  > Enter your **Pastebin Username** and **Password** — these are only used once to generate a session token and are never stored beyond that single request.
  >
  > Then click **"Generate User Key"**. This authenticates you with Pastebin and produces a long-lived User Key that is what Review Studio actually uses going forward.
  >
  > Once you have a User Key, click **"Test Connection"** to verify everything is working.

- **Placement**: Top (scroll to ensure it's visible).

---

### Sync Step 4: Key Recovery — Never Lose Access
- **Target Element**: The Recovery Management card — `div.pt-4.border-t` containing "Recovery Paste ID" label plus the Find/Fetch buttons.
- **Spotlight Shape**: Rounded box around the entire recovery section.
- **Title**: Step 3 — Back Up Your User Key
- **Content**:
  > Your **User Key** is the crown jewel. If you ever lose it (new browser, factory reset), you cannot sync anymore.
  >
  > Click **"Backup User Key to Cloud (Create Recovery Paste)"** to store an encrypted copy of it in a Pastebin paste. Save the Paste ID it gives you somewhere safe.
  >
  > On any future device: paste that ID into the **Recovery Paste ID** field and click **"Fetch Key"** to restore access instantly.

- **Placement**: Top.

---

### Sync Step 5: Auto-Sync Preferences
- **Target Element**: `.ars-setting-group:first-of-type` — the white "Auto-Sync Preferences" card with the two toggles.
- **Spotlight Shape**: Rounded box around the entire auto-sync card.
- **Title**: Set It and Forget It
- **Content**:
  > With credentials configured, you can enable **automatic background sync**:
  >
  > - **Auto-Sync Templates**: Automatically backs up your Templates to the cloud whenever you modify them.
  > - **Auto-Sync Phrases**: Same, but for your Saved Phrases.
  >
  > These operate silently in the background. You can also trigger a manual sync at any time via the **Cloud** button in the editor toolbar.

- **Placement**: Bottom.

---

### Sync Tour Technical Notes

**Trigger in `SettingsDashboard.tsx`:**
```typescript
const [isSyncTourVisible, setIsSyncTourVisible] = useState(false);

// Fire the first time the sync tab is opened AND no dev key is set
useEffect(() => {
    if (
        activeTab === 'sync' &&
        !settings.amazon_pastebin_api_dev_key &&
        !localStorage.getItem('ars_sync_tour_completed')
    ) {
        const t = setTimeout(() => setIsSyncTourVisible(true), 400);
        return () => clearTimeout(t);
    }
}, [activeTab]);

const handleSyncTourComplete = () => {
    localStorage.setItem('ars_sync_tour_completed', 'true');
    setIsSyncTourVisible(false);
};
```

**Step definitions file:** `src/constants/cloudSyncTourSteps.tsx`

**Important:** The spotlight needs to work inside the Settings modal. Since both the modal and the tour overlay are mounted within the shadow root, `getBoundingClientRect()` will return correct viewport-relative coordinates, so no special handling is needed — the existing `TourGuide` component can be reused as-is with the sync steps passed as props.

**"How to Set Up Cloud Sync" button** — Always-visible help button at the top of the Cloud Sync tab. Clicking it:
1. Clears `ars_sync_tour_completed`
2. Sets `isSyncTourVisible = true` immediately (no delay needed since tab is already open)

