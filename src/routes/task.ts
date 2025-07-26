import express from 'express';
import taskController from '../controller/TaskController';

const routes = express.Router();
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: Returns an array of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
routes.get('/', taskController.list);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - listId
 *             properties:
 *               name:
 *                 type: string
 *                 example: My new task
 *               listId:
 *                 type: string
 *                 example: b62f91f8-5bee-47f3-8756-1d5e59552734
 *     responses:
 *       201:
 *         description: Created - new task object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad Request - malformed fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: Not Found - list with listId not found
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
routes.post('/', taskController.create);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Task ID
 *         required: true
 *         schema:
 *           type: string
 *           example: b62f91f8-5bee-47f3-8756-1d5e59552734
 *     responses:
 *       200:
 *         description: Task found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad Request - malformed ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 */
routes.get('/:id', taskController.findById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update task by ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Task ID
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
 *               - listId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated task name
 *               listId:
 *                 type: string
 *                 example: b62f91f8-5bee-47f3-8756-1d5e59552734
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad Request - malformed ID or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 */
routes.put('/:id', taskController.update);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task by ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Task ID
 *         required: true
 *         schema:
 *           type: string
 *           example: b62f91f8-5bee-47f3-8756-1d5e59552734
 *     responses:
 *       200:
 *         description: Task deleted successfully (returns true)
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *       400:
 *         description: Bad Request - malformed ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 */
routes.delete('/:id', taskController.deleteById);

/**
 * @swagger
 * /tasks/listId/{listId}:
 *   get:
 *     summary: Get tasks by List ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: listId
 *         in: path
 *         description: List ID
 *         required: true
 *         schema:
 *           type: string
 *           example: b62f91f8-5bee-47f3-8756-1d5e59552734
 *     responses:
 *       200:
 *         description: Array of tasks for the given listId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Bad Request - malformed listId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: Tasks not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 */
routes.get('/listId/:listId', taskController.findByListId);

/**
 * @swagger
 * /tasks/listId/{listId}:
 *   delete:
 *     summary: Delete tasks by List ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: listId
 *         in: path
 *         description: List ID
 *         required: true
 *         schema:
 *           type: string
 *           example: b62f91f8-5bee-47f3-8756-1d5e59552734
 *     responses:
 *       200:
 *         description: Tasks deleted successfully (returns true)
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *       400:
 *         description: Bad Request - malformed listId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: List not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 */
routes.delete('/listId/:listId', taskController.deleteByListId);

/**
 * @swagger
 * /tasks/moveTask/{id}:
 *   put:
 *     summary: Move a task to another list
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Task ID
 *         required: true
 *         schema:
 *           type: string
 *           example: d53fc99a-98e5-4eb5-bc91-0cf4d973e1d9
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newListId
 *             properties:
 *               newListId:
 *                 type: string
 *                 description: ID of the new list to move the task to
 *                 example: e3aa6cd3-64b2-4522-b20d-ea7f37002fa4
 *     responses:
 *       200:
 *         description: Task successfully moved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updated:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad Request - invalid ID or body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 */
routes.put('/moveTask/:id', taskController.updateTaskListId);

export default routes;
