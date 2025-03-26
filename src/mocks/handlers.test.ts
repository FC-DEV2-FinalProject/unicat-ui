import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

const server = setupServer(...handlers)

beforeAll(() => {
  console.log('🟢 Starting MSW server...');
  server.listen();
  console.log('✅ MSW server is running');
})

afterEach(() => {
  console.log('🔄 Resetting MSW handlers...');
  server.resetHandlers();
})

afterAll(() => {
  console.log('🔴 Stopping MSW server...');
  server.close();
  console.log('✅ MSW server stopped');
})

describe('MSW Handlers', () => {
  it('should return mock projects data', async () => {
    console.log('📡 Making request to /api/projects...');
    const response = await fetch('/api/projects')
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBe(2)
    expect(data[0]).toHaveProperty('id')
    expect(data[0]).toHaveProperty('title')
    expect(data[0]).toHaveProperty('subtitle')
  })

  it('should return mock art styles data', async () => {
    console.log('📡 Making request to /api/art-styles...');
    const response = await fetch('/api/art-styles')
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
  })

  it('should return post project data', async () => {
    console.log('📡 Making request to /api/projects...');
    const response = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Test Project',
        subtitle: 'Test Subtitle',
        scriptTone: 'formal',
        imageStyle: 'cartoon',
      }),
    })
    const data = await response.json()
    
    expect(response.status).toBe(201)
    expect(data).toHaveProperty('id')
    expect(data).toHaveProperty('title')
  })
}) 