import express from 'express';
import { getBuyablesForSkill, getAvailableSkills } from '../services/buyablesService.js';

const router = express.Router();

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Buyables API'
  });
});

/**
 * GET /api/skills
 * Get list of available skills
 */
router.get('/skills', (req, res) => {
  const skills = getAvailableSkills();
  res.json({
    skills,
    count: skills.length
  });
});

/**
 * GET /api/buyables/:skill
 * Get buyables data for a specific skill
 */
router.get('/buyables/:skill', async (req, res, next) => {
  try {
    const { skill } = req.params;
    const data = await getBuyablesForSkill(skill);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
