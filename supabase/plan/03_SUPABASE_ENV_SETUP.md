# 🔧 Supabase Environment Setup

## ✅ Files Created

Three environment files have been created in `/home/sk/skybox/skybox-gamehub/`:

### 1. `.env` - Production Environment
- Contains actual Supabase keys
- Used for production builds
- Never commit this file to Git

### 2. `.env.local` - Local Development Environment
- Contains actual Supabase keys
- Used for local development (overrides `.env`)
- Never commit this file to Git
- Includes `VITE_DEBUG=true` for development

### 3. `.env.example` - Template (Safe to Commit)
- Contains PLACEHOLDER values only
- Share this file with team members
- Shows what keys are needed
- Safe to commit to Git

---

## 📋 Environment Variables Explained

### Client-Side Variables (Exposed to Browser)
```
VITE_SUPABASE_URL=https://dbocegamkdnsorhtdbni.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

**Prefix: `VITE_`** - Exposed to frontend JS bundle

### Server-Side Variables (Never Exposed)
```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres...
```

**No prefix** - Kept secure on server only

---

## 🔐 Security Best Practices

✅ **DO:**
- Keep `.env` and `.env.local` in `.gitignore`
- Use anon key for client-side operations
- Use service role key only on backend
- Rotate keys periodically
- Use separate keys per environment

❌ **DON'T:**
- Commit real keys to Git
- Expose service role key to frontend
- Share credentials in chat/email
- Use same key for prod & dev
- Forget to add to `.gitignore`

---

## 📝 Current Setup

**Project ID:** `dbocegamkdnsorhtdbni`

**Project URL:** `https://dbocegamkdnsorhtdbni.supabase.co`

**Database Host:** `aws-1-us-east-1.pooler.supabase.com`

**Port:** `6543` (Transaction Pooler)

---

## 🚀 How to Use in Your App

### Install Supabase Client
```bash
cd /home/sk/skybox/skybox-gamehub
npm install @supabase/supabase-js
```

### Create Supabase Hook (src/hooks/useSupabase.ts)
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useSportsGames = () => {
  const [games, setGames] = useState([]);
  
  useEffect(() => {
    const fetchGames = async () => {
      const { data } = await supabase
        .from('games')
        .select('*')
        .order('game_datetime');
      
      setGames(data);
    };
    
    fetchGames();
  }, []);
  
  return games;
};
```

### Use in Components
```typescript
import { useSportsGames } from '@/hooks/useSupabase';

function SportsSchedule() {
  const games = useSportsGames();
  
  return (
    <div>
      {games.map(game => (
        <div key={game.id}>{game.homeTeam} vs {game.awayTeam}</div>
      ))}
    </div>
  );
}
```

---

## ✅ Environment Variables Loaded

### With Vite
```
VITE_SUPABASE_URL ✅
VITE_SUPABASE_ANON_KEY ✅
VITE_SUPABASE_PUBLISHABLE_KEY ✅
VITE_SUPABASE_SECRET_KEY ✅
VITE_SUPABASE_ACCESS_TOKEN ✅
VITE_DEBUG ✅
```

### Backend Only
```
SUPABASE_SERVICE_ROLE_KEY ✅
DATABASE_URL ✅
NODE_ENV ✅
```

---

## 🔄 Switching Environments

### Development (Local)
```bash
# Uses .env.local (overrides .env)
npm run dev
```

### Production
```bash
# Uses .env
npm run build
npm run preview
```

---

## 🆘 Troubleshooting

### Variables Not Loading?
1. Check `.env.local` exists
2. Restart dev server: `npm run dev`
3. Verify `VITE_` prefix for client variables
4. Check for extra spaces/quotes

### Access Denied Error?
1. Verify anon key is correct
2. Check row-level security (RLS) policies
3. Use service role key for admin operations

### Database Connection Failed?
1. Verify DATABASE_URL is correct
2. Check if database is running
3. Use pooler endpoint (6543) not direct (5432)

---

## 📚 File Locations

```
/home/sk/skybox/skybox-gamehub/
├── .env              ✅ (Production keys)
├── .env.local        ✅ (Development keys)
├── .env.example      ✅ (Template only)
├── .gitignore        ✅ (Should exclude .env*)
└── src/
    └── hooks/
        └── useSupabase.ts (Ready to create)
```

---

## 🔑 Key Information Summary

| Setting | Value |
|---------|-------|
| **Supabase URL** | https://dbocegamkdnsorhtdbni.supabase.co |
| **Anon Key** | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRib2NlZ2Fta2Ruc29yaHRkYm5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMDg2NzUsImV4cCI6MjA3Njc4NDY3NX0.FXHEFdsYeglPlEST2-VvUI7nqVXOjQJh39T0pFIjVSs |
| **Service Role Key** | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRib2NlZ2Fta2Ruc29yaHRkYm5pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTIwODY3NSwiZXhwIjoyMDc2Nzg0Njc1fQ.bcv7IJnIo481d4qBGa0FtXYGHEuzns0G8VRYfqIkAXE |
| **Database Host** | aws-1-us-east-1.pooler.supabase.com |
| **Database Port** | 6543 |

---

## 📦 Next Steps

1. ✅ Environment files created
2. ⏳ Install Supabase client: `npm install @supabase/supabase-js`
3. ⏳ Create database tables (use migrations from earlier)
4. ⏳ Build React hooks for data fetching
5. ⏳ Integrate with SportsSchedule & TopTeams pages

---

**Status:** 🟢 Ready to Connect
**Last Updated:** October 23, 2025
**Env Files:** 3/3 Created ✅
**Configuration:** Complete ✅

