import { Note, INote } from "../models/models.notes";
import { validateNoteInput } from "../utils/schema.validation";
import mongoose from "mongoose";

class NoteService {
  findOne(query: {
    title: Partial<INote> | { _id: mongoose.Types.ObjectId };
  }): INote | PromiseLike<INote | null> | null {
    throw new Error("Method not implemented.");
  }

  async createNote(
    title: string,
    content: string,
    categoryId: string,
    userId: string
  ): Promise<INote> {
    const errors = validateNoteInput(title, content, categoryId);
    if (errors.length > 0) throw new Error(errors.join(" "));

    const newNote = await Note.create({
      title,
      content,
      category: categoryId,
      user: userId,
    });

    return newNote;
  }
  async getAllNotes(userId: string): Promise<INote[]> {
    return await Note.find({ user: userId }).populate("category");
  }

  async getNoteById(id: string, userId: string): Promise<INote | null> {
    return await Note.findById({ _id: id, userId: userId }).populate(
      "category"
    );
  }

  async updateNote(
    id: string,
    title: string,
    content: string,
    categoryId: string,
    userId: string
  ): Promise<INote | null> {
    return await Note.findByIdAndUpdate(
      { _id: id, user: userId },
      { title, content, category: categoryId },
      {
        new: true,
      }
    ).populate("category");
  }
  async deleteNote(id: string, userId: string): Promise<INote | null> {
    return await Note.findByIdAndDelete({ _id: id, userId: userId });
  }

  async getNoteByCategoryId(id: string, userId: string, categoryId: string) {
    return await Note.find({ _id: id, user: userId, category: categoryId });
  }
}

export default new NoteService();
