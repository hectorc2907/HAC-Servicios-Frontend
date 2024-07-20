export const getClientPhoneNumber = (clients, customerName) => {
  const client = clients.find((client) => client.nickName === customerName);
  return client ? client.phoneNumber : "";
};
