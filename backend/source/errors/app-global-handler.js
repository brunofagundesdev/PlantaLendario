import app from "../app.js";

app.setErrorHandler((error, request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      message: error.message,
    });
  }

  console.error(error);

  return reply.status(500).send({
    message: 'Erro interno no servidor',
  });
});
