import { Request, Response } from "express";
import State, { IState } from "../models/state";
import { asyncHandler } from "../middleware/errorHandler";

// Get all states with pagination
export const getStates = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [states, total] = await Promise.all([
    State.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    State.countDocuments()
  ]);

  res.json({
    data: states,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    }
  });
});

// Delete all states
export const deleteAllStates = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (req.query.confirm !== 'true') {
    res.status(400).json({
      success: false,
      error: "Add ?confirm=true to delete all states"
    });
    return;
  }
  
  const result = await State.deleteMany();
  res.json({ success: true, message: `Deleted ${result.deletedCount} states` });
});

// Create a new state
export const createState = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { stateID, stateName, stateDesc, ImagesData } = req.body;

  const newState: IState = await State.create({
    stateID,
    stateName,
    stateDesc,
    ImagesData,
  });

  res.status(201).json({ success: true, data: newState });
});

// Get specific state by name
export const getStateByName = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { stateName } = req.params;

  const state: IState | null = await State.findOne({ stateID: stateName });
  if (!state) {
    res.status(404).json({ success: false, error: "State not found" });
    return;
  }
  
  res.json({ success: true, data: state });
});

// Delete a specific state
export const deleteState = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { stateName } = req.params;

  const deletedItem: IState | null = await State.findOneAndDelete({ stateID: stateName }) as unknown as IState | null;

  if (!deletedItem) {
    res.status(404).json({ success: false, message: "State not found" });
    return;
  }

  res.json({ success: true, message: "State deleted successfully" });
});

// Update state details
export const updateState = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { stateID } = req.params;
  const { detail, detailImages } = req.body;

  const updatedState: IState | null = await State.findOneAndUpdate(
    { stateID },
    { $set: { detail, detailImages } },
    { new: true, runValidators: true }
  );

  if (!updatedState) {
    res.status(404).json({ success: false, error: "State not found" });
    return;
  }

  res.json({ success: true, data: updatedState });
});
