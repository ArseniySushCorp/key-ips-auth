const errorConstructor = (message: string) => ({
  success: false,
  error: 'Unauthorized',
  message,
  statusCode: 401,
});

export const IP_NOT_VALID = errorConstructor('IP not valid');
export const KEY_NOT_VALID = errorConstructor('Key not valid');
export const IP_ALREADY_LOGIN = errorConstructor('Ip already login');
export const MORE_THEN_LIMIT = errorConstructor('Too many ips');
export const IP_NOT_EXIST = errorConstructor('Ip not included');

export const AUTHORIZED = (botData: string) => ({
  success: true,
  message: 'Authorized',
  statusCode: 200,
  botData,
});

export const LOGOUT = {
  success: true,
  error: 'Succesfully logout',
  statusCode: 200,
};
