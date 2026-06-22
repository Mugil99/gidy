const Success = (msg, data = null) => {
  const properties = new Object();
  properties.error = false;
  properties.status = "Access Granted";
  properties.message = msg;
  properties.appData = data;
  return properties;
};

export default Success;
