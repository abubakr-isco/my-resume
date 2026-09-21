# Feature Specification: Portfolio Design Refresh

**Feature Branch**: `001-design-refresh` (spec dir only, no git branch)
**Created**: 2026-09-22
**Status**: Implemented

## User Scenarios & Testing

### User Story 1 - Stronger first impression (Priority: P1)
A recruiter opens the portfolio and immediately sees a polished, distinctive hero.

**Acceptance Scenarios**:
1. **Given** the page loads, **When** the hero is visible, **Then** the title, status badge and buttons form a clear visual hierarchy with depth (gradients, glow).
2. **Given** dark or light theme, **When** viewed, **Then** contrast stays readable in both.

### User Story 2 - Scannable skills and cards (Priority: P2)
Skill levels are readable at a glance and cards feel consistent.

**Acceptance Scenarios**:
1. **Given** the Skills section, **When** viewed, **Then** each skill shows a visual level meter in addition to its text label.
2. **Given** any card (skill, project, learning), **When** hovered, **Then** it lifts with a consistent accent highlight.

### User Story 3 - Comfortable everywhere (Priority: P3)
Keyboard and mobile users get equal quality.

**Acceptance Scenarios**:
1. **Given** keyboard navigation, **Then** focus rings are clearly visible.
2. **Given** `prefers-reduced-motion`, **Then** no new animation plays.
3. **Given** a 320px screen, **Then** nothing overflows horizontally.

## Requirements
- **FR-001**: Design changes MUST be CSS-first; HTML/JS only changed where unavoidable.
- **FR-002**: Existing content, IDs and JS hooks MUST NOT change.
- **FR-003**: Single accent color palette is preserved; both themes supported.
- **FR-004**: New motion MUST respect `prefers-reduced-motion`.
- **FR-005**: Code stays beginner-friendly: commented, tokens via CSS variables.

## Success Criteria
- **SC-001**: No horizontal scroll at 320px.
- **SC-002**: Text contrast ≥ 4.5:1 in both themes.
- **SC-003**: No regressions in existing behavior (filter, theme toggle, menu).

## Assumptions
- No new dependencies, fonts or images.
