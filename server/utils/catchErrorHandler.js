// Handle catch error
export const catchErrorHandler = (res, error) => {
  return res
    .status(error.status || 500)
    .json({ error: error.message || "Internal server error!" });
};
