# Smart Maintenance - Incident Tracking & Prediction System
## Complete UI Specification for Figma Design

---

## 1. APPLICATION OVERVIEW

### 1.1 Application Name
**Smart Maintenance System - Incident Tracking & Prediction System**

### 1.2 User Roles
- **End Users** (Students/Staff): Report incidents, track status, provide feedback
- **Administrators**: Manage incidents, assign technicians, view analytics, manage users
- **Technicians**: View assignments, update status, complete tasks

### 1.3 Key Features
- Incident reporting with image upload and geolocation
- Real-time incident tracking and status updates
- Analytics dashboard with metrics
- Technician assignment and scheduling
- SLA monitoring and escalation
- Predictive alerts using ML
- Heatmap visualization
- Aging analysis
- User feedback system
- Notification system

---

## 2. COLOR SYSTEM

### 2.1 Primary Colors
```
Primary (Deep Blue):
- HSL: 222 47% 11%
- Hex: #0F172A
- Usage: Headers, primary buttons, active states, sidebar background

Primary Foreground:
- HSL: 210 40% 98%
- Hex: #F8FAFC
- Usage: Text on primary backgrounds

Secondary (Vibrant Teal):
- HSL: 173 80% 40%
- Hex: #14B8A6
- Hex Alternative: #0D9488
- Usage: Accents, hover states, secondary actions, highlights
```

### 2.2 Background Colors
```
Background:
- HSL: 210 40% 98%
- Hex: #F8FAFC
- Usage: Main page background

Card Background:
- HSL: 0 0% 100%
- Hex: #FFFFFF
- Usage: Card containers, modals

Muted Background:
- HSL: 210 40% 96.1%
- Hex: #F1F5F9
- Usage: Subtle backgrounds, disabled states
```

### 2.3 Text Colors
```
Foreground (Primary Text):
- HSL: 222 47% 11%
- Hex: #0F172A
- Usage: Headings, primary text

Muted Foreground:
- HSL: 215.4 16.3% 46.9%
- Hex: #64748B
- Usage: Secondary text, labels, descriptions
```

### 2.4 Status Colors
```
Success/Resolved:
- Background: #10B981 (Green-500)
- Text: #FFFFFF
- Light: #D1FAE5 (Green-100)

Warning/In Progress:
- Background: #F59E0B (Amber-500)
- Text: #FFFFFF
- Light: #FEF3C7 (Amber-100)

Error/Destructive:
- Background: #EF4444 (Red-500)
- Text: #FFFFFF
- Light: #FEE2E2 (Red-100)

Info/New:
- Background: #3B82F6 (Blue-500)
- Text: #FFFFFF
- Light: #DBEAFE (Blue-100)
```

### 2.5 Category Colors
```
Water: #3B82F6 (Blue-500) / #DBEAFE (Blue-100)
Electricity: #F59E0B (Amber-500) / #FEF3C7 (Amber-100)
Garbage: #10B981 (Emerald-500) / #D1FAE5 (Emerald-100)
IT/Network: #6366F1 (Indigo-500) / #E0E7FF (Indigo-100)
Hostel: #F43F5E (Rose-500) / #FCE7F3 (Rose-100)
```

### 2.6 Sidebar Colors (Admin Dashboard)
```
Sidebar Background: #0F172A (Primary)
Sidebar Foreground: #F8FAFC
Sidebar Accent: #1E293B
Sidebar Border: #1E293B
Sidebar Primary: #14B8A6 (Secondary)
```

### 2.7 Border & Input Colors
```
Border: #E2E8F0
Input Border: #E2E8F0
Ring/Focus: #0F172A
```

---

## 3. TYPOGRAPHY

### 3.1 Font Family
- **Primary Font**: Geist Sans (or Inter, system-ui fallback)
- **Monospace Font**: Geist Mono (for code/data)

### 3.2 Font Sizes & Weights
```
H1 (Page Titles):
- Size: 2xl (24px) / 3xl (30px)
- Weight: Bold (700)
- Line Height: Tight
- Usage: Main page headers, dashboard titles

H2 (Section Titles):
- Size: xl (20px) / 2xl (24px)
- Weight: Bold (700) / Semibold (600)
- Usage: Card titles, section headers

H3 (Subsection Titles):
- Size: lg (18px)
- Weight: Semibold (600)
- Usage: Incident titles, card subtitles

Body Text:
- Size: base (16px) / sm (14px)
- Weight: Regular (400)
- Line Height: Normal
- Usage: Descriptions, form labels

Small Text:
- Size: xs (12px) / sm (14px)
- Weight: Regular (400) / Medium (500)
- Usage: Timestamps, metadata, helper text

Button Text:
- Size: sm (14px) / base (16px) / lg (18px)
- Weight: Medium (500) / Semibold (600)
```

### 3.3 Text Styles
```
Primary Text: #0F172A, Regular/Medium
Secondary Text: #64748B, Regular
Muted Text: #64748B, Small
Link Text: #0F172A, Medium, Underline on hover
Error Text: #EF4444, Small
Success Text: #10B981, Small
```

---

## 4. SPACING & LAYOUT

### 4.1 Spacing Scale
```
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 24px
2xl: 32px
3xl: 48px
4xl: 64px
```

### 4.2 Container Widths
```
Max Content Width: 1280px (max-w-7xl)
Card Padding: 24px (p-6) / 32px (p-8)
Section Spacing: 24px-48px
```

### 4.3 Border Radius
```
Small: 0.375rem (6px)
Default: 0.5rem (8px)
Medium: 0.75rem (12px)
Large: 1rem (16px)
Full: 9999px (for pills/badges)
```

### 4.4 Shadows
```
Small: shadow-sm
Default: shadow-md
Large: shadow-lg
XL: shadow-xl
Hover: shadow-xl with color tint
```

---

## 5. COMPONENT LIBRARY

### 5.1 Buttons

#### Primary Button
```
Background: #0F172A (Primary)
Text: #F8FAFC (White)
Hover: opacity-90
Padding: 12px 24px (lg) / 8px 16px (default)
Border Radius: 8px
Font: Medium, 14-16px
Shadow: shadow-lg shadow-primary/20
```

#### Secondary Button
```
Background: #14B8A6 (Secondary)
Text: #FFFFFF
Hover: opacity-80
```

#### Outline Button
```
Background: Transparent
Border: 1px solid #E2E8F0
Text: #0F172A
Hover: Background #F1F5F9, Text #0F172A
```

#### Ghost Button
```
Background: Transparent
Text: #0F172A
Hover: Background #F1F5F9
```

#### Button Sizes
- Small: h-8, px-3, text-sm
- Default: h-9, px-4
- Large: h-10, px-6, text-lg

### 5.2 Cards

#### Standard Card
```
Background: #FFFFFF
Border: 1px solid #E2E8F0
Border Radius: 12px (rounded-xl)
Padding: 24px (p-6) or 32px (p-8)
Shadow: shadow-md
Hover: shadow-xl, border-secondary/30
```

#### Card with Header
```
Header Background: #0F172A (Primary) or gradient
Header Text: #F8FAFC
Header Padding: 24px
Content Padding: 32px
```

#### Stat Card (Analytics)
```
Background: #FFFFFF
Border: None
Shadow: shadow-md
Hover: shadow-xl
Icon Background: Category color with 10% opacity
Icon Size: 24px in 48px circle
Value: 4xl font-bold
Label: xs text-muted-foreground
```

### 5.3 Input Fields

#### Text Input
```
Background: #F1F5F9/30 (muted/30) or #FFFFFF
Border: 1px solid #E2E8F0
Border Radius: 8px
Padding: 12px 16px
Focus: ring-2 ring-primary, border-primary
Font: Regular, 14-16px
Placeholder: #64748B
```

#### Textarea
```
Same as Text Input
Min Height: 96px (4 rows)
Resize: None
```

#### Select Dropdown
```
Same as Text Input
Appearance: Custom (no default arrow)
Custom Arrow: ▼ positioned right-4
```

#### File Upload Area
```
Border: 2px dashed #E2E8F0
Background: #F1F5F9/10
Border Radius: 12px
Padding: 32px
Hover: border-secondary/50, bg-muted/30
Icon: Upload icon, 40px circle
Text: "Click to upload image"
Helper: "SVG, PNG, JPG or GIF (max. 3MB)"
```

### 5.4 Badges/Tags

#### Status Badge
```
Padding: 4px 12px (px-3 py-1)
Border Radius: 9999px (full)
Font: Semibold, 12px
Text Transform: Uppercase
Shadow: shadow-sm
```

#### Category Badge
```
Same as Status Badge
Border: 1px solid (category color)
Background: Category color with 10% opacity
Text: Category color (darker shade)
```

### 5.5 Navigation

#### Tab Navigation
```
Container: Card with p-2
Tab Padding: 12px 24px (px-6 py-3)
Border Radius: 8px
Active: bg-primary, text-primary-foreground, shadow-md, scale-105
Inactive: text-muted-foreground, hover:bg-muted
Icon: 16px, left of text
```

#### Sidebar Navigation (Admin)
```
Background: #0F172A
Width: 256px (expanded) / 64px (collapsed)
Item Padding: 12px (px-3 py-2)
Border Radius: 6px
Active: bg-sidebar-accent, text-sidebar-primary
Hover: bg-sidebar-accent/50
Icon: 16px, left of text
```

### 5.6 Modals/Dialogs

#### Modal Container
```
Background: rgba(0,0,0,0.5) backdrop
Content: Card with max-w-2xl
Border Radius: 12px
Shadow: shadow-xl
Padding: 32px
```

#### Modal Header
```
Title: 2xl font-bold
Description: text-muted-foreground, text-sm
Spacing: mb-6
```

### 5.7 Lists

#### Incident List Item
```
Container: Card with p-6
Border: 1px solid #E2E8F0
Border Radius: 12px
Hover: shadow-lg, border-secondary/30
Left Border: 4px gradient (on hover)
Image: 128px x 128px, rounded-lg
Content: Flex layout, gap-6
```

#### Incident Card Layout
```
Image Section: 128px width, flex-shrink-0
Content Section: flex-1, min-w-0
Title: lg font-bold, mb-1
Location: sm text-muted-foreground with MapPin icon
Badges: flex gap-2, top-right
Metadata: flex gap-4, text-xs, bottom section
Actions: flex gap-2, right-aligned
```

### 5.8 Tables

#### Data Table
```
Container: Card with border
Header: bg-muted/50, text-muted-foreground, font-medium
Row: hover:bg-muted/50
Cell Padding: 16px (px-4 py-3)
Border: border-b border-border
```

---

## 6. PAGE LAYOUTS

### 6.1 Landing Page (/)

#### Layout Structure
```
Container: min-h-screen, gradient background
Background: gradient-to-br from-background to-muted
Content: Centered card, max-w-md
Card: p-8, shadow-lg
```

#### Elements
- **Title**: "Smart Mantainance," (H1, text-3xl, font-bold, text-primary)
- **Subtitle**: "Incident Tracking & Prediction System" (H2, text-3xl, font-bold, text-primary)
- **Description**: "Report issues and track resolutions in real-time" (text-muted-foreground)
- **Primary CTA**: "Sign In" button (w-full, bg-primary, size-lg)
- **Secondary CTA**: "Create Account" button (w-full, variant-outline, size-lg)
- **Staff Access Section**: Border-top, grid-cols-2
  - "Admin" button (ghost, text-secondary)
  - "Technician" button (ghost, text-secondary)

### 6.2 User Dashboard (/dashboard)

#### Header
```
Background: bg-primary with gradient overlay
Height: Auto (py-6)
Content: max-w-7xl, px-6
Layout: Flex, justify-between
```

#### Header Elements
- **Logo Section**: 
  - Icon: Activity icon in white/10 bg with backdrop-blur
  - Title: "Smart Mantainance System," (text-2xl, font-bold)
  - Subtitle: "Incident Tracking & Prediction System" (text-sm, opacity-70)
- **Actions**: 
  - Notifications dropdown
  - Logout button (secondary variant)

#### Navigation Tabs
```
Container: Card, p-2, sticky top-4, z-30
Tabs: 
  - Overview (LayoutDashboard icon)
  - My Incidents (FileText icon)
  - Report Issue (PlusCircle icon)
  - Issue Tracking (Activity icon)
```

#### Tab Content Areas
- **Overview**: AnalyticsOverview component (4 stat cards grid)
- **My Incidents**: IncidentList component (filterable)
- **Report Issue**: IncidentForm component (centered, max-w-2xl)
- **Issue Tracking**: IncidentList with updates

### 6.3 Admin Dashboard (/admin/dashboard)

#### Layout Structure
```
Container: min-h-screen, flex
Sidebar: Fixed, 256px width (collapsible to 64px)
Main Content: flex-1, ml-256 (or ml-16 when collapsed)
```

#### Sidebar
```
Background: #0F172A
Header: h-16, border-b, Shield icon + "AdminPanel"
Navigation: Space-y-1, px-2
Items:
  - Overview
  - Incidents
  - Scheduling
  - SLA Monitor
  - Aging Analysis
  - Technician Performance
  - Heatmap
  - Predictions
  - User Management
  - Settings
Footer: Logout button
```

#### Main Header
```
Height: h-16
Background: bg-background/95, backdrop-blur
Border: border-b
Content: px-6, flex, justify-between
Elements:
  - Menu toggle button
  - Breadcrumb (Campus > Current Tab)
  - Search bar (w-64, hidden on mobile)
  - Notifications dropdown
  - User avatar (gradient circle, "AD" initials)
```

#### Content Area
```
Padding: p-6
Max Width: max-w-6xl, mx-auto
Spacing: space-y-6
```

### 6.4 Technician Dashboard (/technician/dashboard)

#### Header
```
Background: bg-white, border-b
Padding: py-4, px-4 sm:px-6 lg:px-8
Layout: Flex, justify-between
```

#### Header Elements
- **Logo Section**:
  - Icon: User icon in primary/10 bg
  - Title: "Technician Portal" (text-xl, font-bold)
  - Subtitle: "{Name} • {Specialization}" (text-sm, muted)
- **Actions**: Notifications, Logout button

#### Stats Section
```
Grid: grid-cols-1 md:grid-cols-3, gap-6, mb-8
Cards:
  - Active Assignments (Clock icon, blue-500)
  - Completed (CheckCircle2 icon, green-500)
  - Total Assignments (LayoutDashboard icon, purple-500)
```

#### Assignments Section
```
Active Assignments Card:
  - Title: "Active Assignments"
  - Description: "Your current and scheduled tasks"
  - List: Space-y-4, each item with:
    - Title (font-semibold)
    - Description (text-sm, muted, line-clamp-2)
    - Metadata: Location, Category, Priority badges
    - Timestamps: Created, Scheduled
    - Actions: "Start" or "Complete" button

Completed Assignments Card:
  - Similar structure
  - Limited to 5 items
  - Muted background (bg-muted/30)
```

### 6.5 Login/Register Pages

#### Layout
```
Container: min-h-screen, gradient background
Background: gradient-to-br from-background to-muted
Content: Centered card, max-w-md, p-8
```

#### Login Page Elements
- **Google Sign In Button**: Full width, outline variant, Google logo SVG
- **Divider**: "Or continue with" text
- **Form Fields**: Email, Password
- **Submit Button**: Full width, primary
- **Links**: "Create account", "Admin Access"

#### Register Page Elements
- Similar to Login
- Additional fields: Full Name, Confirm Password

#### Admin/Technician Login
- Similar structure
- Icon: Shield (admin) or Wrench (technician) in colored circle
- Title: "Admin Access" or "Technician Login"
- Return link to main portal

---

## 7. COMPONENT DETAILS

### 7.1 Incident Form

#### Structure
```
Card: max-w-2xl, shadow-xl
Header: bg-primary, p-6, text-primary-foreground
  - Title: "Report New Issue"
  - Description: "Please provide details about the incident"
Content: p-8, space-y-6
```

#### Form Fields
1. **Issue Title**: Text input, required
2. **Category & Location**: Grid 2 columns
   - Category: Select dropdown with emojis (💧 Water, ⚡ Electricity, etc.)
   - Location: Text input
3. **Description**: Textarea, 4 rows, required
4. **Location Coordinates**: 
   - Container: p-4, bg-muted/30, rounded-xl, border
   - Button: "Get Current Location" (outline, sm)
   - Inputs: 2 columns, readonly, text-xs
5. **Attachment**: File upload area (dashed border)
6. **Submit Button**: 
   - Full width, py-6, text-lg
   - Gradient: from-primary to-secondary
   - Shadow: shadow-lg shadow-secondary/20
   - Loading state: Spinner + "Submitting..."

### 7.2 Incident List

#### Filter Section
```
Layout: Flex, justify-between, mb-8
Title: "My Reported Issues" or "All Incidents"
Filters: Flex gap-2, overflow-x-auto
  - Pills: "All", "New", "In Progress", "Resolved", "Closed"
  - Active: bg-primary, text-primary-foreground, shadow-md, scale-105
  - Inactive: bg-muted, hover:bg-muted/80
```

#### Incident Items
```
Container: Card, p-6, border, rounded-xl
Hover: shadow-lg, border-secondary/30
Left Border: 4px gradient (on hover, opacity-0 to opacity-100)

Layout: Flex, gap-6
Image: 128px x 128px, rounded-lg, flex-shrink-0
Content: flex-1, min-w-0
  - Title: lg font-bold, hover:text-primary
  - Location: sm muted, MapPin icon
  - Badges: Category and Status (top-right)
  - Metadata: Timestamp (Calendar icon, text-xs)
  - Actions: 
    - Feedback button (if resolved)
    - "View Details" (hover reveal, ArrowRight icon)
```

### 7.3 Analytics Overview

#### Stat Cards Grid
```
Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-4, gap-6
Card: p-6, border-none, shadow-md
Hover: shadow-xl
```

#### Stat Card Structure
```
Background Icon: Absolute, top-right, opacity-10, hover:opacity-20, 96px
Content:
  - Icon Container: 48px x 48px, rounded-xl, category color bg
  - Title: text-sm, font-medium, muted-foreground
  - Value: text-4xl, font-bold, foreground
  - Label: text-xs, font-medium, muted-foreground, bg-muted/50, px-2 py-1, rounded-md
```

#### Stat Types
1. **Total Incidents**: FileText icon, blue-600
2. **Active Issues**: AlertCircle icon, amber-600
3. **Resolved**: CheckCircle2 icon, teal-600
4. **Avg Response**: Clock icon, purple-600

### 7.4 Notifications Dropdown

#### Trigger
```
Button: Ghost variant, icon size
Bell icon: h-5 w-5
Badge: Absolute, top-right, red dot or count badge
```

#### Dropdown
```
Container: Card, w-80, shadow-xl
Position: Absolute, right-0, top-full, mt-2
Header: p-4, border-b
  - Title: "Notifications"
  - Action: "Mark all as read"
Content: max-h-96, overflow-y-auto
Items: p-4, border-b, hover:bg-muted/50
  - Icon: Left side, colored circle
  - Content: Title, description, timestamp
  - Unread indicator: Blue dot
Footer: "View all" link
```

---

## 8. INTERACTIVE STATES

### 8.1 Button States
```
Default: Full opacity, shadow
Hover: opacity-90, shadow-lg
Active: scale-95, opacity-80
Disabled: opacity-50, cursor-not-allowed
Loading: Spinner icon, "Loading..." text
```

### 8.2 Input States
```
Default: Border #E2E8F0, bg-muted/30
Focus: ring-2 ring-primary, border-primary, bg-background
Error: border-destructive, ring-destructive/20
Disabled: opacity-50, cursor-not-allowed
```

### 8.3 Card States
```
Default: shadow-md
Hover: shadow-xl, border-secondary/30
Active: scale-[1.02]
```

### 8.4 Tab States
```
Default: text-muted-foreground, hover:bg-muted
Active: bg-primary, text-primary-foreground, shadow-md, scale-105
```

---

## 9. RESPONSIVE BREAKPOINTS

### 9.1 Breakpoints
```
Mobile: < 640px (sm)
Tablet: 640px - 1024px (md, lg)
Desktop: > 1024px (xl, 2xl)
```

### 9.2 Responsive Behaviors

#### Mobile
- Single column layouts
- Stacked navigation
- Full-width cards
- Smaller padding (p-4)
- Hidden sidebar (hamburger menu)
- Horizontal scroll for filters

#### Tablet
- 2-column grids for stats
- Sidebar can be collapsible
- Medium padding (p-6)

#### Desktop
- 4-column grids for stats
- Full sidebar visible
- Larger padding (p-8)
- Max content width: 1280px

---

## 10. ANIMATIONS & TRANSITIONS

### 10.1 Transitions
```
Default: transition-all duration-200
Hover: duration-300
Scale: transform scale-105 (hover), scale-95 (active)
Opacity: fade-in, fade-out
```

### 10.2 Animations
```
Fade In: animate-in fade-in slide-in-from-bottom-4 duration-500
Pulse: animate-pulse (for loading states)
Spin: animate-spin (for loading spinners)
```

### 10.3 Hover Effects
```
Cards: shadow-md → shadow-xl, border-secondary/30
Buttons: opacity-90, shadow-lg
Icons: scale-110
Images: scale-110 (in incident cards)
```

---

## 11. ICONS & IMAGERY

### 11.1 Icon Library
**Lucide React Icons** (Primary)
- Activity, AlertCircle, Bell, Calendar, CheckCircle2
- Clock, FileText, LayoutDashboard, MapPin, PlusCircle
- Search, Settings, Shield, User, Wrench, etc.

### 11.2 Icon Sizes
```
xs: 12px (h-3 w-3)
sm: 16px (h-4 w-4)
default: 20px (h-5 w-5)
md: 24px (h-6 w-6)
lg: 32px (h-8 w-8)
xl: 48px (h-12 w-12)
```

### 11.3 Image Placeholders
```
Default: /placeholder.svg
User Avatar: /placeholder-user.jpg
Logo: /placeholder-logo.svg
```

### 11.4 Image Handling
```
Incident Images: 
  - Max size: 3MB
  - Formats: SVG, PNG, JPG, GIF
  - Display: 128px x 128px, rounded-lg, object-cover
  - Hover: scale-110 transition
```

---

## 12. FORM VALIDATION & FEEDBACK

### 12.1 Error States
```
Container: p-4, bg-destructive/10, border-destructive/20
Text: text-destructive
Icon: ⚠️ or AlertCircle
Position: Top of form or inline with field
```

### 12.2 Success States
```
Container: p-4, bg-secondary/10, border-secondary/20
Text: text-secondary-foreground
Icon: Animated pulse dot or CheckCircle2
Animation: fade-in slide-in-from-top-4
```

### 12.3 Loading States
```
Button: Spinner icon + "Loading..." text
Card: Skeleton loader or pulse animation
List: "Loading incidents..." with icon
```

---

## 13. ACCESSIBILITY REQUIREMENTS

### 13.1 Color Contrast
- Text on backgrounds: WCAG AA compliant (4.5:1 minimum)
- Interactive elements: Clear focus states
- Status indicators: Color + text/icon

### 13.2 Keyboard Navigation
- Tab order: Logical flow
- Focus indicators: ring-2 ring-primary
- Skip links: For main content
- ARIA labels: For icons and buttons

### 13.3 Screen Reader Support
- Semantic HTML
- ARIA labels for icons
- Alt text for images
- Form labels associated with inputs

---

## 14. DESIGN PATTERNS

### 14.1 Empty States
```
Container: text-center, py-16, bg-muted/30, rounded-2xl, border-dashed
Icon: 64px circle, muted background
Title: text-lg, font-medium
Description: text-muted-foreground
```

### 14.2 Loading States
```
Skeleton: Animated pulse, bg-muted
Spinner: Animated spin, primary color
Text: "Loading..." with icon
```

### 14.3 Success Messages
```
Toast: Fixed top-right or inline
Style: bg-secondary/10, border-secondary/20
Animation: fade-in slide-in-from-top
Auto-dismiss: 3 seconds
```

### 14.4 Modal Patterns
```
Backdrop: Dark overlay, click to close
Content: Centered, max-w-2xl
Close: X button top-right
Actions: Bottom, right-aligned
```

---

## 15. SPECIFIC PAGE MOCKUPS NEEDED

### 15.1 User-Facing Pages
1. Landing Page (/)
2. Login Page (/auth/login)
3. Register Page (/auth/register)
4. User Dashboard - Overview Tab
5. User Dashboard - My Incidents Tab
6. User Dashboard - Report Issue Tab
7. User Dashboard - Issue Tracking Tab
8. Incident Detail Modal

### 15.2 Admin Pages
1. Admin Login Page
2. Admin Dashboard - Overview
3. Admin Dashboard - Incidents List
4. Admin Dashboard - Scheduling
5. Admin Dashboard - SLA Monitor
6. Admin Dashboard - Aging Analysis
7. Admin Dashboard - Technician Performance
8. Admin Dashboard - Heatmap
9. Admin Dashboard - Predictions
10. Admin Dashboard - User Management
11. Admin Dashboard - Settings

### 15.3 Technician Pages
1. Technician Login Page
2. Technician Dashboard - Active Assignments
3. Technician Dashboard - Completed Assignments
4. Completion Dialog with Feedback

---

## 16. ADDITIONAL DESIGN NOTES

### 16.1 Gradients
```
Header Gradient: from-primary via-primary to-secondary/30, opacity-50
Button Gradient: from-primary to-secondary
Background Gradient: from-background to-muted
```

### 16.2 Glassmorphism Effects
```
Backdrop: backdrop-blur-sm
Background: bg-white/10 or bg-card/80
Usage: Header overlays, sticky navigation
```

### 16.3 Micro-interactions
- Button press: scale-95
- Card hover: scale-[1.02]
- Icon hover: scale-110
- Smooth transitions: 200-300ms

### 16.4 Visual Hierarchy
- Primary actions: Large, primary color
- Secondary actions: Medium, outline/ghost
- Tertiary actions: Small, text links
- Information: Muted colors, smaller text

---

## 17. DESIGN TOKENS SUMMARY

### Colors
- Primary: #0F172A
- Secondary: #14B8A6
- Background: #F8FAFC
- Foreground: #0F172A
- Muted: #64748B
- Success: #10B981
- Warning: #F59E0B
- Error: #EF4444

### Spacing
- Base unit: 4px
- Common: 8px, 16px, 24px, 32px, 48px

### Typography
- Font: Geist Sans
- Sizes: 12px, 14px, 16px, 18px, 20px, 24px, 30px
- Weights: 400, 500, 600, 700

### Border Radius
- Small: 6px
- Default: 8px
- Medium: 12px
- Large: 16px
- Full: 9999px

### Shadows
- sm, md, lg, xl
- Colored shadows: shadow-primary/20, shadow-secondary/20

---

## END OF SPECIFICATION

This document contains all UI details needed to create a world-class Figma design for the Smart Maintenance Incident Tracking & Prediction System. Use this as a reference for creating pixel-perfect designs that can be easily integrated into the Next.js application.


