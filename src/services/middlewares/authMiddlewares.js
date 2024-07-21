import { loadToken } from "../../utils/storage";

export const authMiddleware = (next) => async (req) => {
  // Получение токена из localStorage или откуда-то ещё
  const token = await loadToken()
  console.log(token);
  // Если токен существует, добавляем его в заголовок Authorization
  // if (token) {
  //   req.headers.append('Authorization', `${token}`);
  // }

  return await next(req);
};
