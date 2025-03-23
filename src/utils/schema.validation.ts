export const validateUserInput = (
  username: string,
  email: string,
  password: string
): string[] => {
  const errors: string[] = [];

  if (!username || username.trim().length < 3) {
    errors.push("Username must be at least 3 characters long");
  }
  if (!email || !/[^\s@]+@[^\s@]+$/.test(email)) {
    errors.push("Invalid credential!");
  }
  if (!password || password.trim().length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }

  return errors;
};


export const validateNoteInput = (
  title: string,
  content: string,
  categoryId: string
): string[] => {

  const errors: string[] = [];

  if (!title || title.trim().length < 5) {
    errors.push("Title must be at least 5 characters long.");
  }

  if (!content || content.trim().length < 19) {
    errors.push("Content must be at least 10 characters long.");
  }

  if (!categoryId) {
    errors.push("Category ID is required.");
  }

  return errors;
};
