import pool from '../src/database/mysql.config';
import { test, expect } from '@jest/globals';

test('Connection pool stress test', async () => {
  const promises = [];
  for (let i = 0; i < 1000; i++) {
    promises.push(pool.query('SELECT 1 + 1 AS result'));
  }
  
  const results = await Promise.all(promises);
  results.forEach(res => {
    expect(res[0][0].result).toBe(2);
  });
}, 30000);
