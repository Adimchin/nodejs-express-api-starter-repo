import z from "zod";

export const validator = (schema) => {
  return (req, res, next) => {
    const body = req.body;

    const result = schema.safeParse(body);

    if (!result.success) {
      const errors = {};

      console.log("issues", result.error.issues);

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (field) {
          errors[field] = issue.message;
        }
      }

      return res.status(400).json({error: errors});
    };

    next();

  };
};
