# 🚀 Supabase AI Cursor Rules

**6 comprehensive rules | 1,500+ lines | Production-ready**

Based on [Supabase AI Editor Rules](https://supabase.com/ui/docs/ai-editors-rules/prompts)

---

## 📋 Rules Included

### 1. **create-db-functions.mdc**
Write high-quality PostgreSQL functions with:
- `SECURITY INVOKER` best practices
- Proper `search_path` configuration
- Error handling patterns
- Trigger examples
- Immutable function optimization

**Use When:** Writing database functions or triggers

### 2. **create-migration.mdc**
Create production-safe migrations with:
- Idempotent migration patterns
- Backwards compatibility
- IF NOT EXISTS / IF EXISTS clauses
- Migration naming conventions
- Rollback procedures

**Use When:** Creating database schema migrations

### 3. **create-rls-policies.mdc**
Implement secure Row Level Security with:
- User-specific access control
- Admin-only operations
- Role-based access patterns
- Organization-level permissions
- Time-based access rules

**Use When:** Setting up database security policies

### 4. **postgres-sql-style-guide.mdc**
Write clean, performant SQL following:
- Naming conventions (snake_case)
- Formatting standards (2-space indent)
- Query best practices
- Performance optimization (indexes, CTEs)
- Data type selection

**Use When:** Writing SQL queries and schema

### 5. **use-realtime.mdc**
Implement real-time features with:
- Supabase Realtime subscriptions
- React hook patterns
- Presence tracking
- Broadcast messaging
- Live score updates

**Use When:** Building real-time functionality

### 6. **writing-supabase-edge-functions.mdc**
Develop serverless functions with:
- Typed request/response handling
- Error handling patterns
- Email notifications
- External API integration
- Webhook processing

**Use When:** Building Edge Functions for Supabase

---

## 🎯 How to Use

### In Cursor
1. Reference a file type in your prompt (e.g., "create a PostgreSQL function")
2. Cursor automatically applies matching rules
3. Rules provide context for AI code generation

### Examples

**For Database Functions:**
```
Create a function to calculate total reservations per user
```
→ Automatically uses `create-db-functions.mdc`

**For Migrations:**
```
Write a migration to add a status column to games table
```
→ Automatically uses `create-migration.mdc`

**For RLS Policies:**
```
Create RLS policies for a reservations table
```
→ Automatically uses `create-rls-policies.mdc`

**For SQL:**
```
Write a query to find upcoming games with team names
```
→ Automatically uses `postgres-sql-style-guide.mdc`

**For Real-time:**
```
Create a React hook to subscribe to live game scores
```
→ Automatically uses `use-realtime.mdc`

**For Edge Functions:**
```
Write an Edge Function to send reservation confirmation emails
```
→ Automatically uses `writing-supabase-edge-functions.mdc`

---

## 📊 Statistics

| File | Lines | Focus |
|------|-------|-------|
| create-db-functions.mdc | 130 | PL/pgSQL Functions |
| create-migration.mdc | 140 | Schema Migrations |
| create-rls-policies.mdc | 217 | Security Policies |
| postgres-sql-style-guide.mdc | 309 | SQL Best Practices |
| use-realtime.mdc | 309 | Real-time Data |
| writing-supabase-edge-functions.mdc | 400 | Serverless Functions |
| **TOTAL** | **1,505** | **Complete Guide** |

---

## 🎓 Learning Path

**Beginner:**
1. postgres-sql-style-guide.mdc - Understand SQL patterns
2. create-migration.mdc - Learn schema changes
3. create-db-functions.mdc - Add business logic

**Intermediate:**
4. create-rls-policies.mdc - Implement security
5. use-realtime.mdc - Add real-time features
6. writing-supabase-edge-functions.mdc - Build serverless

**Advanced:**
All files together for complex Supabase implementations

---

## 🔧 Project Structure

```
skybox-gamehub/
├── .cursor/
│   └── rules/
│       ├── README.md (you are here)
│       ├── create-db-functions.mdc
│       ├── create-migration.mdc
│       ├── create-rls-policies.mdc
│       ├── postgres-sql-style-guide.mdc
│       ├── use-realtime.mdc
│       └── writing-supabase-edge-functions.mdc
```

---

## 💡 Key Takeaways

### Database Functions
✅ Use `SECURITY INVOKER` by default
✅ Set `search_path = ''` for safety
✅ Use fully qualified names
✅ Add error handling

### Migrations
✅ Use `IF NOT EXISTS`/`IF EXISTS`
✅ Make migrations idempotent
✅ Document rollbacks
✅ Test before deployment

### Security (RLS)
✅ Enable RLS on all tables
✅ Use `auth.uid()` for user context
✅ Implement role-based access
✅ Start with default-deny

### SQL
✅ Use specific columns (no SELECT *)
✅ Use aliases for clarity
✅ Create indexes for filters
✅ Use CTEs for complex queries

### Real-time
✅ Filter on server-side
✅ Unsubscribe on unmount
✅ Handle connection states
✅ Use RLS policies

### Edge Functions
✅ Validate input
✅ Use environment variables
✅ Add error handling
✅ Implement CORS headers

---

## 🚀 Quick Reference

### Problem → Solution Mapping

| Problem | Use Rule |
|---------|----------|
| "How do I write a function?" | create-db-functions.mdc |
| "How do I add a column safely?" | create-migration.mdc |
| "How do I secure my tables?" | create-rls-policies.mdc |
| "How do I format my SQL?" | postgres-sql-style-guide.mdc |
| "How do I get live updates?" | use-realtime.mdc |
| "How do I send emails?" | writing-supabase-edge-functions.mdc |

---

## 📚 Source

Based on official Supabase documentation:
[Supabase AI Editors Rules](https://supabase.com/ui/docs/ai-editors-rules/prompts)

---

## ✨ Integration with Skybox Gamehub

These rules are tailored for the Skybox Gamehub project:

- **Database:** Games, Teams, Leagues, Reservations, Users
- **Security:** RLS for user data, admin operations
- **Real-time:** Live scores, game updates
- **Serverless:** Email confirmations, score webhooks

---

## 🎯 Next Steps

1. ✅ Rules installed in `.cursor/rules/`
2. ✅ Start using them in your prompts
3. ✅ Reference database schemas
4. ✅ Follow patterns in examples
5. ✅ Customize for your needs

---

**Status:** 🟢 Active
**Last Updated:** October 23, 2025
**Version:** 1.0 - Supabase Official

