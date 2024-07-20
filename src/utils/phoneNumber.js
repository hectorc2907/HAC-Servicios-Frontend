export const getClientPhoneNumber = (clients, customerName) => {
  const client = clients.find((client) => client.firstName === customerName);
  return client ? client.phoneNumber : "";
};
