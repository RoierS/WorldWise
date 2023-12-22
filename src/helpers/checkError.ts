export const checkError = (error: unknown) => {
  let message;
  if (error instanceof Error) message = error.message;
  else message = String(error);
  return message;
};
