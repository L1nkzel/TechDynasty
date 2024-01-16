import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler';
import Product from '../models/productModel';

router.get('/', asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find({});
    res.json(products);
}));


router.get('/:id', asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const product = await Product.findById(req.params.id);
    if (product !== null) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
}));

export default router;