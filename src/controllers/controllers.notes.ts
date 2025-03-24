import { Request, Response } from "express";
import { AuthenticatedRequest } from "../interfaces/interfaces.auth";
import NoteService from "../services/services.notes";

export const createNote = async (req: AuthenticatedRequest, res: Response) => {
  const { title, content, categoryId } = req.body;

  try {
    const newNote = await NoteService.createNote(
      title,
      content,
      categoryId,
      req.user.userId
    );
    res.status(201).json({
      success: true,
      message: "Note created successfully!",
      data: newNote,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getNotes = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const notes = await NoteService.getAllNotes(req.user.userId);
    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getNote = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const note = await NoteService.getNoteById(id, req.user.userId);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Note fetched successfully",
      data: note,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNote = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { title, content, categoryId } = req.body;

  try {
    const updatedNote = await NoteService.updateNote(
      id,
      title,
      content,
      categoryId,
      req.user.userId
    );
    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNote = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedNote = await NoteService.deleteNote(id, req.user.userId);
    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: deletedNote,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getNoteByCategoryId = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id, categoryId } = req.params;

  try {
    const notes = await NoteService.getNoteByCategoryId(
      id,
      categoryId,
      req.user.userId
    );
    res.status(200).json({
      success: true,
      message: "Notes fetched by category successfully",
      data: notes,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
