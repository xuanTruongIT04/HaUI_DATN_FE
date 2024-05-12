import { createHmac } from "crypto";

// https://payos.vn/docs/tich-hop-webhook/kiem-tra-du-lieu-voi-signature/

function convertObjToQueryStr(object) {
  return Object.keys(object)
    .filter((key) => object[key] !== undefined)
    .map((key) => {
      let value = object[key];
      // Sort nested object
      if (value && Array.isArray(value)) {
        value = JSON.stringify(value.map((val) => sortObjDataByKey(val)));
      }
      // Set empty string if null
      if ([null, undefined, "undefined", "null"].includes(value)) {
        value = "";
      }

      return `${key}=${value}`;
    })
    .join("&");
}

function sortObjDataByKey(object) {
  const orderedObject = Object.keys(object)
    .sort()
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
  return orderedObject;
}

function checkValidSignature(webhookData, checksumKey) {
  function isValidData(data, currentSignature, checksumKey) {
    const sortedDataByKey = sortObjDataByKey(data);
    const dataQueryStr = convertObjToQueryStr(sortedDataByKey);
    const dataToSignature = createHmac("sha256", checksumKey)
      .update(dataQueryStr)
      .digest("hex");
    return dataToSignature == currentSignature;
  }

  return isValidData(webhookData.data, webhookData.signature, checksumKey);
}

function hashSignature(data, checksumKey) {
  const sortedDataByKey = sortObjDataByKey(data);
  const dataQueryStr = convertObjToQueryStr(sortedDataByKey);
  const dataToSignature = createHmac("sha256", checksumKey)
  .update(dataQueryStr)
  .digest("hex");

  return dataToSignature;
}

export {
  checkValidSignature,
  hashSignature,
}
