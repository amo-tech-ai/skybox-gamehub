// Live test of postgres.js connection
import postgres from 'postgres'

const sql = postgres({
  host: 'aws-1-us-east-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  username: 'postgres.dbocegamkdnsorhtdbni',
  password: 'Toronto2025#',
  ssl: 'require',
  idle_timeout: 20,
  max_lifetime: 60 * 30,
})

async function testConnection() {
  try {
    console.log('🔍 Testing postgres.js connection...')

    // 1. Test connection
    const [result] = await sql`SELECT 'postgres.js connected!' AS message`
    console.log('✅', result.message)

    // 2. Create test schema and table
    await sql`CREATE SCHEMA IF NOT EXISTS connectivity_test`
    await sql`
      CREATE TABLE IF NOT EXISTS connectivity_test.ping (
        id SERIAL PRIMARY KEY,
        note TEXT,
        ts TIMESTAMPTZ DEFAULT NOW()
      )
    `
    console.log('✅ Table created')

    // 3. Insert test row
    await sql`
      INSERT INTO connectivity_test.ping (id, note)
      VALUES (1, 'postgres.js CRUD test passed!')
    `
    console.log('✅ Row inserted')

    // 4. Select to verify
    const data = await sql`
      SELECT * FROM connectivity_test.ping WHERE id = 1
    `
    console.log('✅ Row retrieved:', data[0])

    // 5. Cleanup
    await sql`DROP TABLE connectivity_test.ping`
    await sql`DROP SCHEMA connectivity_test`
    console.log('✅ Cleanup complete')

    console.log('\n🎉 All postgres.js tests passed!')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    throw error
  } finally {
    await sql.end()
  }
}

testConnection()
