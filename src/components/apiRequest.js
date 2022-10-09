const apiRequest = async (url = "", optionsObject = "", errorMessage = "") => {
  try {
    const response = await fetch(url, optionsObject);
    if (!response.ok) {
      throw Error(`Data not found. Please reload the data`);
    }
  } catch (error) {
    errorMessage = error.message;
    console.log(error);
  } finally {
    return errorMessage;
  }
};

export default apiRequest;

//  npx json-server -p 3500 -w data/db.json
// for json server
