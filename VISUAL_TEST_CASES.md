# Visual Test Cases Document
## Gemini Counter Application

**Purpose:** This document outlines comprehensive visual test cases to be executed for every release to ensure UI/UX quality, functionality, and consistency across different devices and browsers.

**Last Updated:** 2025-01-11

---

## Table of Contents
1. [Pre-Testing Setup](#pre-testing-setup)
2. [Visual Design Tests](#visual-design-tests)
3. [Functionality Tests](#functionality-tests)
4. [Responsive Design Tests](#responsive-design-tests)
5. [Theme & Accessibility Tests](#theme--accessibility-tests)
6. [Browser Compatibility Tests](#browser-compatibility-tests)
7. [Performance & Animation Tests](#performance--animation-tests)
8. [Edge Cases & Error Handling](#edge-cases--error-handling)

---

## Pre-Testing Setup

### Browser Setup
- [ ] Open Chrome DevTools (F12 or Cmd+Option+I)
- [ ] Clear browser cache and localStorage
- [ ] Set up device emulation presets:
  - Mobile: 375x667 (iPhone SE)
  - Tablet: 768x1024 (iPad)
  - Desktop: 1920x1080
  - Large Desktop: 2560x1440

### Initial State
- [ ] Verify app loads without errors
- [ ] Check console for any warnings or errors
- [ ] Verify Tailwind CSS is loaded correctly
- [ ] Confirm Inter font is loaded

---

## Visual Design Tests

### 1. Header Component
**Test Cases:**

- [ ] **TC-H1:** Header displays "Counter" title with gradient text (emerald-green)
  - Light mode: Gradient from emerald-500 to green-500
  - Dark mode: Gradient from emerald-400 to green-400
  - Font weight: Black (900)
  - Text size: Responsive (xl on mobile, 2xl on desktop)

- [ ] **TC-H2:** Header has backdrop blur effect
  - Light mode: bg-white/70 with backdrop-blur-xl
  - Dark mode: bg-gray-900/70 with backdrop-blur-xl
  - Border: Subtle gray border-bottom

- [ ] **TC-H3:** Theme toggle button displays correctly
  - Light mode: Shows moon icon
  - Dark mode: Shows sun icon
  - Button has rounded-xl corners
  - Hover effect: Shadow increases, background brightens
  - Active state: Scale down to 95%

- [ ] **TC-H4:** Session control buttons appear/disappear correctly
  - Buttons visible only when session is active
  - Buttons: Pause/Play, Restart, Home
  - Proper spacing between buttons (gap-1.5 on mobile, gap-2 on desktop)
  - Icons are properly sized (w-5 h-5 on mobile, w-6 h-6 on desktop)

- [ ] **TC-H5:** Header is fixed at top
  - Stays visible when scrolling
  - Proper z-index (z-30)
  - Content padding accounts for header height

### 2. Setup Form Component
**Test Cases:**

- [ ] **TC-SF1:** Form layout is responsive
  - Mobile: Single column, stacked layout
  - Desktop: Two-column side-by-side (lg:flex-row)
  - Cards have proper spacing (gap-6 on mobile, gap-8 on desktop)

- [ ] **TC-SF2:** Input fields styling
  - Background: White in light mode, gray-800/50 in dark mode
  - Border: gray-200/gray-700 with rounded-xl
  - Focus state: Emerald ring (ring-2 ring-emerald-500/50)
  - Hover: Shadow increases (shadow-sm to shadow-md)
  - Placeholder text: Gray-400/gray-500

- [ ] **TC-SF3:** Counter type toggle buttons
  - Active state: Emerald-500 background with white text
  - Inactive state: Transparent with gray text
  - Smooth transition (duration-200)
  - Shadow on active button (shadow-md shadow-emerald-500/30)

- [ ] **TC-SF4:** Start Session button
  - Gradient background: emerald-500 to green-500
  - Hover: Gradient shifts to emerald-600 to green-600
  - Shadow: shadow-lg shadow-emerald-500/30
  - Active state: Scale to 98%
  - Icon and text properly aligned

- [ ] **TC-SF5:** Error message display
  - Red background: red-50 in light, red-900/20 in dark
  - Red border: red-200/red-800
  - Text: red-600/red-400
  - Rounded corners: rounded-xl
  - Appears below form fields

- [ ] **TC-SF6:** Form card styling
  - Background: white/80 with backdrop-blur-sm
  - Border: gray-200/50 with gray-700/50
  - Shadow: shadow-xl
  - Hover: shadow-2xl
  - Rounded corners: rounded-2xl

### 3. Session History Component
**Test Cases:**

- [ ] **TC-SH1:** Empty state display
  - Shows "No sessions completed yet." message
  - Secondary text: "Start your first session to see history here"
  - Centered alignment
  - Proper padding (py-12)

- [ ] **TC-SH2:** History item card styling
  - Gradient background: gray-50 to white (light), gray-700/50 to gray-800/50 (dark)
  - Border: gray-200/50 with hover effect
  - Hover: shadow-md and border color change
  - Rounded corners: rounded-xl
  - Proper spacing between items (space-y-3)

- [ ] **TC-SH3:** Status badges
  - Completed: emerald-100/emerald-500/20 background
  - Incomplete: amber-100/amber-500/20 background
  - Rounded-full shape
  - Proper text color contrast

- [ ] **TC-SH4:** Load button
  - Blue background: blue-500
  - Hover: blue-600
  - Icon and text alignment
  - Active state: scale-95

- [ ] **TC-SH5:** Clear History button
  - Red background: red-500
  - Hover: red-600
  - Only visible when history.length > 0
  - Proper sizing (text-xs on mobile, text-sm on desktop)

- [ ] **TC-SH6:** Scrollbar styling
  - Custom scrollbar (custom-scrollbar class)
  - Width: 8px
  - Proper colors for light/dark mode
  - Smooth hover effect

### 4. Workout Display Component
**Test Cases:**

- [ ] **TC-WD1:** Grid layout
  - Grid displays correctly based on sets × steps
  - Proper aspect ratio maintained
  - Responsive sizing: max-width 85vh, max-height 85vh
  - Gap spacing: gap-2 on mobile, gap-3 on tablet, gap-4 on desktop

- [ ] **TC-WD2:** Grid cell states
  - **Completed cells:**
    - Gradient: emerald-500 to green-500
    - Shadow: shadow-lg shadow-emerald-500/20
    - Scale: 100%
  - **Active cell:**
    - Gradient: amber-400 to yellow-500
    - Shadow: shadow-2xl shadow-amber-500/40
    - Ring: ring-2 ring-amber-300/50
    - Scale: 105%
    - Animation: pulse
  - **Upcoming cells:**
    - Background: gray-200/60 (light), gray-700/60 (dark)
    - Border: gray-300/30 (light), gray-600/30 (dark)
    - Scale: 100%

- [ ] **TC-WD3:** Central overlay display
  - Background: white/85 (light), gray-900/85 (dark)
  - Backdrop blur: backdrop-blur-xl
  - Border: gray-200/50 (light), gray-700/50 (dark)
  - Shadow: shadow-2xl
  - Rounded corners: rounded-3xl
  - Max width: 90% on mobile, md on desktop

- [ ] **TC-WD4:** Active session display
  - Set/Step counter: Gray-700 text, proper font sizes
  - Timer: Large gradient text (amber-500 to yellow-500)
  - Font sizes: text-6xl on mobile, text-8xl on tablet, text-9xl on desktop
  - "seconds" label: Gray-500 text

- [ ] **TC-WD5:** Rest period display
  - "REST" text: Gray-700, large font
  - Rest timer: Cyan-500 to blue-500 gradient
  - "Next: Set X" text: Gray-500
  - Proper font sizing

- [ ] **TC-WD6:** Paused state
  - "PAUSED" text: Gray-500 (light), gray-400 (dark)
  - Large font size: text-5xl to text-8xl
  - Tracking-wide spacing

- [ ] **TC-WD7:** Completed state
  - "COMPLETE!" text: Emerald gradient
  - Session name or "Great work!" message
  - "New Session" button: Emerald gradient with shadow
  - Grid opacity: 0.25
  - Button hover and active states work

---

## Functionality Tests

### 5. Form Submission
**Test Cases:**

- [ ] **TC-F1:** Valid form submission
  - Fill all required fields
  - Click "Start Session"
  - Verify transition to workout display
  - Verify session starts immediately

- [ ] **TC-F2:** Invalid form submission
  - Enter 0 or negative number in any numeric field
  - Click "Start Session"
  - Verify error message appears
  - Verify form does not submit

- [ ] **TC-F3:** Counter type selection
  - Click "Count Down" - verify active state
  - Click "Count Up" - verify active state switches
  - Verify only one can be active at a time

- [ ] **TC-F4:** Form persistence
  - Fill form fields
  - Refresh page
  - Verify values are restored from localStorage

- [ ] **TC-F5:** Load from history
  - Click "Load" on a history item
  - Verify form fields populate correctly
  - Verify counter type is set correctly
  - Verify session name is populated

### 6. Session Control
**Test Cases:**

- [ ] **TC-SC1:** Pause/Play functionality
  - Start a session
  - Click Pause button
  - Verify timer stops
  - Verify "PAUSED" text appears
  - Verify button changes to Play icon
  - Click Play button
  - Verify timer resumes from where it stopped
  - Verify button changes to Pause icon

- [ ] **TC-SC2:** Restart functionality
  - Start a session, let it run for a few seconds
  - Click Restart button
  - Verify timer resets to initial value
  - Verify set/step resets to 1/1
  - Verify session continues running

- [ ] **TC-SC3:** Home button
  - Start a session
  - Click Home button
  - Verify returns to setup form
  - Verify incomplete session saved to history
  - Verify history shows "Incomplete" status

- [ ] **TC-SC4:** Session completion
  - Create a short session (1 set, 1 step, 5 seconds)
  - Let it complete
  - Verify "COMPLETE!" message appears
  - Verify "New Session" button appears
  - Verify completed session saved to history
  - Verify history shows "Completed" status

### 7. Timer Functionality
**Test Cases:**

- [ ] **TC-T1:** Count Down mode
  - Set counter type to "Count Down"
  - Start session
  - Verify timer counts down from duration
  - Verify reaches 1, then transitions to next step

- [ ] **TC-T2:** Count Up mode
  - Set counter type to "Count Up"
  - Start session
  - Verify timer counts up from 0
  - Verify displays time + 1 (1, 2, 3...)
  - Verify reaches duration, then transitions

- [ ] **TC-T3:** Step progression
  - Create session with multiple steps
  - Verify steps progress correctly (1/3, 2/3, 3/3)
  - Verify grid cells update correctly
  - Verify beep sound plays at step completion

- [ ] **TC-T4:** Set progression
  - Create session with multiple sets
  - Verify sets progress correctly (1/2, 2/2)
  - Verify rest period appears between sets
  - Verify rest timer counts down correctly
  - Verify beep sound plays at rest completion

- [ ] **TC-T5:** Rest period
  - Complete a set
  - Verify "REST" text appears
  - Verify rest timer displays
  - Verify "Next: Set X" message appears
  - Verify rest timer counts down correctly

### 8. History Management
**Test Cases:**

- [ ] **TC-HM1:** History display
  - Complete multiple sessions
  - Verify all sessions appear in history
  - Verify most recent appears first
  - Verify timestamps are correct
  - Verify status badges are correct

- [ ] **TC-HM2:** Clear history
  - Add multiple history items
  - Click "Clear History"
  - Verify all items are removed
  - Verify empty state appears
  - Verify "Clear History" button disappears

- [ ] **TC-HM3:** History persistence
  - Complete a session
  - Refresh page
  - Verify history is still present
  - Verify localStorage persists data

- [ ] **TC-HM4:** Incomplete session tracking
  - Start a session
  - Click Home before completion
  - Verify incomplete session appears in history
  - Verify shows correct completed sets/steps
  - Verify status is "Incomplete"

---

## Responsive Design Tests

### 9. Mobile View (375x667)
**Test Cases:**

- [ ] **TC-R1:** Header responsive
  - Title size: text-xl
  - Button sizes: p-2.5, icons w-5 h-5
  - Proper spacing: gap-1.5
  - Header padding: p-3

- [ ] **TC-R2:** Setup form responsive
  - Single column layout
  - Card padding: p-6
  - Input fields: Full width
  - Button text: text-base
  - Proper spacing: space-y-5

- [ ] **TC-R3:** Workout display responsive
  - Grid gaps: gap-2
  - Timer text: text-6xl
  - Overlay padding: p-6
  - Max width: 90%

- [ ] **TC-R4:** History responsive
  - Card padding: p-4
  - Text sizes: text-xs, text-sm
  - Button sizes: text-xs, py-1.5, px-3
  - Proper truncation for long names

### 10. Tablet View (768x1024)
**Test Cases:**

- [ ] **TC-R5:** Layout adapts correctly
  - Form may switch to two columns
  - Proper spacing maintained
  - Text sizes increase appropriately
  - Grid gaps: gap-3

### 11. Desktop View (1920x1080)
**Test Cases:**

- [ ] **TC-R6:** Full desktop layout
  - Two-column form layout
  - Maximum content width: max-w-7xl
  - Proper spacing: gap-8
  - Text sizes: text-2xl, text-3xl
  - Grid gaps: gap-4
  - Timer text: text-9xl

### 12. Large Desktop (2560x1440)
**Test Cases:**

- [ ] **TC-R7:** Large screen handling
  - Content doesn't stretch too wide
  - Max-width constraints respected
  - Proper centering maintained

---

## Theme & Accessibility Tests

### 13. Light Mode
**Test Cases:**

- [ ] **TC-TH1:** Color scheme
  - Background: Gradient gray-50 to white
  - Text: gray-900
  - Cards: white/80
  - Borders: gray-200/50
  - All colors have proper contrast

- [ ] **TC-TH2:** Theme toggle
  - Click theme toggle
  - Verify smooth transition
  - Verify all colors update correctly
  - Verify localStorage saves preference

### 14. Dark Mode
**Test Cases:**

- [ ] **TC-TH3:** Color scheme
  - Background: Gradient gray-950 to gray-900
  - Text: gray-100
  - Cards: gray-800/80
  - Borders: gray-700/50
  - All colors have proper contrast

- [ ] **TC-TH4:** Theme persistence
  - Set to dark mode
  - Refresh page
  - Verify dark mode persists
  - Verify system preference respected on first load

### 15. Accessibility
**Test Cases:**

- [ ] **TC-A1:** Keyboard navigation
  - Tab through all interactive elements
  - Verify focus indicators visible
  - Verify focus-visible outline (emerald-500)
  - Verify all buttons accessible via keyboard

- [ ] **TC-A2:** Screen reader support
  - Verify aria-labels on all buttons
  - Verify role="status" on workout display
  - Verify aria-live="polite" for updates
  - Verify form labels properly associated

- [ ] **TC-A3:** Color contrast
  - Verify WCAG AA compliance
  - Test all text on backgrounds
  - Verify button text contrast
  - Verify status badge contrast

- [ ] **TC-A4:** Focus management
  - Verify focus moves appropriately
  - Verify no focus traps
  - Verify focus visible on all interactive elements

---

## Browser Compatibility Tests

### 16. Chrome
**Test Cases:**

- [ ] **TC-B1:** Latest Chrome version
- [ ] **TC-B2:** Backdrop blur works
- [ ] **TC-B3:** Custom scrollbar displays
- [ ] **TC-B4:** Animations smooth
- [ ] **TC-B5:** Audio context works

### 17. Firefox
**Test Cases:**

- [ ] **TC-B6:** Latest Firefox version
- [ ] **TC-B7:** Backdrop blur fallback
- [ ] **TC-B8:** Custom scrollbar fallback
- [ ] **TC-B9:** Animations work
- [ ] **TC-B10:** Audio context works

### 18. Safari
**Test Cases:**

- [ ] **TC-B11:** Latest Safari version
- [ ] **TC-B12:** Backdrop blur works
- [ ] **TC-B13:** Custom scrollbar works
- [ ] **TC-B14:** Animations smooth
- [ ] **TC-B15:** Audio context works

### 19. Edge
**Test Cases:**

- [ ] **TC-B16:** Latest Edge version
- [ ] **TC-B17:** All features work
- [ ] **TC-B18:** Performance acceptable

---

## Performance & Animation Tests

### 20. Animations
**Test Cases:**

- [ ] **TC-P1:** Transition smoothness
  - Theme toggle: 300ms transition
  - Button hover: 200ms transition
  - Grid cell updates: 500ms transition
  - Form state changes: 200ms transition

- [ ] **TC-P2:** Pulse animation
  - Active cell pulses correctly
  - Animation doesn't cause jank
  - Animation stops when paused

- [ ] **TC-P3:** Scale animations
  - Button active states: scale-95
  - Grid cell active: scale-105
  - Smooth transitions

### 21. Performance
**Test Cases:**

- [ ] **TC-P4:** Initial load
  - Page loads in < 2 seconds
  - No layout shift
  - Fonts load correctly
  - No console errors

- [ ] **TC-P5:** Runtime performance
  - Timer updates smoothly (60fps)
  - No memory leaks
  - Grid updates efficiently
  - No lag during transitions

- [ ] **TC-P6:** Memory usage
  - Check memory in DevTools
  - Verify no excessive memory growth
  - Verify cleanup on unmount

---

## Edge Cases & Error Handling

### 22. Edge Cases
**Test Cases:**

- [ ] **TC-E1:** Very large numbers
  - Enter 999 in all numeric fields
  - Verify form accepts
  - Verify session runs correctly
  - Verify grid displays correctly

- [ ] **TC-E2:** Very small numbers
  - Enter 1 in all fields
  - Verify session runs correctly
  - Verify single cell displays correctly

- [ ] **TC-E3:** Long session names
  - Enter 100+ character session name
  - Verify truncation in history
  - Verify full name in display

- [ ] **TC-E4:** Rapid button clicks
  - Rapidly click pause/play
  - Verify no race conditions
  - Verify state remains consistent

- [ ] **TC-E5:** Browser back/forward
  - Navigate during session
  - Verify state handling
  - Verify no errors

### 23. Error Handling
**Test Cases:**

- [ ] **TC-ER1:** Invalid localStorage
  - Corrupt localStorage data
  - Verify app handles gracefully
  - Verify defaults applied

- [ ] **TC-ER2:** Network issues
  - Disconnect network
  - Verify app still works (offline-first)
  - Verify no errors

- [ ] **TC-ER3:** Audio context issues
  - Block audio permissions
  - Verify app still works
  - Verify no errors in console

---

## Testing Checklist Summary

### Quick Visual Check (5 minutes)
- [ ] App loads correctly
- [ ] Theme toggle works
- [ ] Form submission works
- [ ] Session starts correctly
- [ ] Pause/play works
- [ ] Responsive on mobile

### Full Visual Test (30 minutes)
- [ ] Complete all Visual Design Tests (TC-H1 through TC-WD7)
- [ ] Complete all Functionality Tests (TC-F1 through TC-HM4)
- [ ] Complete Responsive Design Tests (TC-R1 through TC-R7)
- [ ] Complete Theme & Accessibility Tests (TC-TH1 through TC-A4)

### Comprehensive Test (60 minutes)
- [ ] Complete all tests above
- [ ] Complete Browser Compatibility Tests (TC-B1 through TC-B18)
- [ ] Complete Performance & Animation Tests (TC-P1 through TC-P6)
- [ ] Complete Edge Cases & Error Handling (TC-E1 through TC-ER3)

---

## Notes

- **Testing Frequency:** Run Quick Visual Check before every commit, Full Visual Test before every release, Comprehensive Test for major releases.

- **Documentation:** Document any visual bugs or inconsistencies found during testing. Include screenshots when possible.

- **Browser DevTools:** Use Chrome DevTools for primary testing, but verify in other browsers for compatibility.

- **Accessibility:** Use Chrome DevTools Accessibility panel and Lighthouse for accessibility audits.

- **Performance:** Use Chrome DevTools Performance panel to check for jank and memory issues.

---

## Sign-off

**Tester Name:** _________________________

**Date:** _________________________

**Version Tested:** _________________________

**Overall Status:** ☐ Pass ☐ Pass with Issues ☐ Fail

**Issues Found:** (List any issues below)
1. 
2. 
3. 

**Recommendations:** (Any suggestions for improvements)
1. 
2. 
3. 

