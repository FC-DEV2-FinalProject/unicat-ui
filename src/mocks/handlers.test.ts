import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { handlers } from './handlers'
import { MSW_CONFIG } from './config'

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
  it('should return mock projects data when MSW is enabled', async () => {
    if (!MSW_CONFIG.USE_MSW.PROJECTS) {
      console.log('⏭️ Skipping test - MSW is disabled for projects');
      return;
    }

    console.log('📡 Making request to /projects...');
    const response = await fetch(`${process.env.API_URL}/projects`, {
      headers: {
        'Authorization': 'Bearer test-token'
      }
    })
    
    const data = await response.json()
    expect(response.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBe(2)
    expect(data[0]).toHaveProperty('id')
    expect(data[0]).toHaveProperty('title')
    expect(data[0]).toHaveProperty('subtitle')
    expect(data[0]).toHaveProperty('thumbnailUrl')
    expect(data[0]).toHaveProperty('artifactUrl')
    expect(data[0]).toHaveProperty('scriptTone')
    expect(data[0]).toHaveProperty('imageStyle')
    expect(data[0]).toHaveProperty('createdAt')
  })

  it('should return mock art styles data when MSW is enabled', async () => {
    if (!MSW_CONFIG.USE_MSW.ART_STYLES) {
      console.log('⏭️ Skipping test - MSW is disabled for art styles');
      return;
    }

    console.log('📡 Making request to /art-styles...');
    const response = await fetch(`${process.env.API_URL}/art-styles`, {
      headers: {
        'Authorization': 'Bearer test-token'
      }
    })
    
    const data = await response.json()
    expect(response.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
  })

  it('should create a new project when MSW is enabled', async () => {
    if (!MSW_CONFIG.USE_MSW.PROJECTS) {
      console.log('⏭️ Skipping test - MSW is disabled for projects');
      return;
    }

    const projectData = {
      title: 'Test Project',
      subtitle: 'Test Subtitle',
      scriptTone: 'formal',
      imageStyle: 'cartoon',
    };

    console.log('📡 Making request to /projects...');
    const response = await fetch(`${process.env.API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token'
      },
      body: JSON.stringify(projectData),
    })
    
    const data = await response.json()
    expect(response.status).toBe(201)
    expect(data).toHaveProperty('id')
    expect(data).toHaveProperty('title', projectData.title)
    expect(data).toHaveProperty('subtitle', projectData.subtitle)
    expect(data).toHaveProperty('scriptTone', projectData.scriptTone)
    expect(data).toHaveProperty('imageStyle', projectData.imageStyle)
    expect(data).toHaveProperty('thumbnailUrl')
    expect(data).toHaveProperty('artifactUrl')
    expect(data).toHaveProperty('createdAt')
    expect(new Date(data.createdAt).toISOString()).toBe(data.createdAt)
  })

  it('should return 404 when no Authorization header is present', async () => {
    if (!MSW_CONFIG.USE_MSW.PROJECTS) {
      console.log('⏭️ Skipping test - MSW is disabled for projects');
      return;
    }

    console.log('📡 Making unauthorized request to /projects...');
    const response = await fetch(`${process.env.API_URL}/projects`)
    
    expect(response.status).toBe(404)
    const text = await response.text()
    expect(text).toBe('')
  })
}) 