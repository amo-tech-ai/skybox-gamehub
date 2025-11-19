# 📚 Skybox GameHub Documentation

This directory contains all technical documentation for the Skybox GameHub project, organized by topic and purpose.

---

## 📁 Directory Structure

```
docs/
├── README.md                          # This file
├── architecture/                      # System architecture & design docs
│   ├── 01-database-audit.md          # Supabase database audit
│   └── 02-database-implementation.md # Database implementation report
├── features/                          # Feature-specific documentation
│   └── events/
│       └── halloween-event-design.md # Halloween event design spec
└── progress/                         # Session summaries & progress tracking
    ├── 001-audit-progress-tracker.md # Audit progress tracker
    ├── 002-audit-summary.md          # Audit summary report
    └── 003-full-audit-report.md     # Complete audit report
```

---

## 📖 Document Guide

### 🏗️ Architecture Documentation

Located in `architecture/` - System design, database structure, and technical specifications.

**Files:**
- **01-database-audit.md** - Comprehensive Supabase database audit (October 2025)
- **02-database-implementation.md** - Database implementation status and phase 1 completion

**Audience:** Architects, backend developers, database administrators

**Reading Order:**
1. Start with 01-database-audit.md for system overview
2. Review 02-database-implementation.md for implementation status
3. Refer to specific sections as needed

---

### 🎨 Feature Documentation

Located in `features/` - Feature-specific design specs and implementation guides.

**Current Features:**
- **events/** - Event-related features
  - **halloween-event-design.md** - Halloween Party UI/UX design specification

**Usage:** Feature development, design reference, UI/UX guidelines

**When to Use:**
- Building new event pages
- Designing event-specific layouts
- Understanding feature requirements

---

### 📈 Progress Documentation

Located in `progress/` - Session summaries, audits, and progress tracking.

**Files (chronological order):**
1. **001-audit-progress-tracker.md** - Comprehensive progress tracking table
2. **002-audit-summary.md** - Quick audit summary and quick wins
3. **003-full-audit-report.md** - Complete site audit with detailed findings

**Audience:** Project managers, developers, stakeholders

**Reading Order:**
- Quick overview: Start with 002-audit-summary.md
- Detailed findings: Read 003-full-audit-report.md
- Track completion: Use 001-audit-progress-tracker.md

**Status Legend:**
- 🟢 Working / Complete
- 🟡 Partially Working / Needs Adjustment
- 🔴 Broken / Missing / Not Functional

---

## 🎯 Quick Navigation

### For Developers
1. Start with architecture docs to understand the system
2. Review progress docs to see current status
3. Use feature docs when building new features

### For Architects
1. Read architecture/ for system design
2. Review progress/ for technical debt and issues
3. Check feature/ for component patterns

### For Project Managers
1. Read progress/002-audit-summary.md for executive overview
2. Track progress with 001-audit-progress-tracker.md
3. Review 003-full-audit-report.md for detailed findings

---

## 📝 Document Naming Convention

### Numbering
- **Architecture**: Sequential by subject (01-, 02-, 03-)
- **Progress**: Chronological by date (001-, 002-, 003-)
- **Features**: Grouped by feature name, then number

### Format
- Numbers for ordering (leading zeros for sorting)
- Kebab-case for readability
- Descriptive names for searchability

Examples:
- ✅ `01-database-audit.md` (architecture)
- ✅ `001-audit-progress-tracker.md` (progress)
- ✅ `halloween-event-design.md` (feature)

---

## 🔄 Maintenance

### When to Update
- **Architecture**: After major system changes
- **Progress**: After each audit or review session
- **Features**: When features are updated or deprecated

### Contributing
1. Follow the existing numbering scheme
2. Place docs in appropriate subdirectories
3. Update this README when adding new docs
4. Keep filenames lowercase with kebab-case

---

## 📚 Related Documentation

- **Supabase Database Schema**: See `supabase/schemas/`
- **Implementation Plans**: See `supabase/plan/`
- **API Reference**: See `src/lib/` and Edge Functions
- **Component Library**: See `src/components/`

---

**Last Updated:** December 29, 2024  
**Maintained By:** Development Team  
**Status:** ✅ Active Documentation
