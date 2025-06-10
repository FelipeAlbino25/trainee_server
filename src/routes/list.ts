import { Router } from 'express';
import listController from '../controller/listController';

const routes = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all lists
 *     tags:
 *       - Lists
 *     responses:
 *       200:
 *         description: Returns an array of lists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
routes.get('/', listController.list);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new list
 *     tags:
 *       - Lists
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: My New List
 *     responses:
 *       201:
 *         description: Created - the new list object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad Request - malformed or missing name field
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       409:
 *         description: Conflict - list with that name already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
routes.post('/', listController.create);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a list by ID
 *     tags:
 *       - Lists
 *     parameters:
 *       - name: id
 *         in: path
 *         description: List ID
 *         required: true
 *         schema:
 *           type: string
 *           example: b62f91f8-5bee-47f3-8756-1d5e59552734
 *     responses:
 *       200:
 *         description: Found list object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: List not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
routes.get('/:id', listController.findById);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a list by ID
 *     tags:
 *       - Lists
 *     parameters:
 *       - name: id
 *         in: path
 *         description: List ID
 *         required: true
 *         schema:
 *           type: string
 *           example: b62f91f8-5bee-47f3-8756-1d5e59552734
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated List Name
 *     responses:
 *       200:
 *         description: Updated list object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad Request - malformed or missing name field
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: List with specified ID not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */
routes.put('/:id', listController.update);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a list by ID
 *     tags:
 *       - Lists
 *     parameters:
 *       - name: id
 *         in: path
 *         description: List ID
 *         required: true
 *         schema:
 *           type: string
 *           example: b62f91f8-5bee-47f3-8756-1d5e59552734
 *     responses:
 *       200:
 *         description: Successfully deleted, returns true
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *       404:
 *         description: List with specified ID not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Internal Server Error while deleting
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */
routes.delete('/:id', listController.deleteById);

export default routes;
