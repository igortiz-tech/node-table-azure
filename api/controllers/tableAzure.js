const axios = require("axios");
// const url = process.env.API_URL;
const url = 'https://{{storage}}.table.core.windows.net/deviceData';
const storageAccount = 'storage';
const accountKey = 'senha'
const tableName = ''
const cryptoJS = require('crypto-js');
const Base64 = require('crypto-js/enc-base64');
const HmacSha256 = require('crypto-js/hmac-sha256');

module.exports = app => {
    const controller = {};

    const date = new Date();
    let UTCstring = date.toUTCString();
    const dataToEncode = UTCstring + "\n" + `/${storageAccount}/${tableName}`;
    const encodeData = decodeURIComponent(encodeURIComponent(dataToEncode));
    const hash = HmacSha256(encodeData, Base64.parse(accountKey))
    const signature = hash.toString(cryptoJS.enc.Base64)
    const auth = "SharedKeyLite " + storageAccount + ":" + signature;

    var optionsHeaders = {
        'Content-Type': 'application/json',
        'x-ms-date': UTCstring,
        'x-ms-version': '2020-10-02',
        'Authorization': auth,
        'Accept': 'application/json;odata=nometadata',
        'DataServiceVersion': '3.0;NetFx',
        'MaxDataServiceVersion': '3.0;NetFx',
    };


    controller.listTable = async (req, res) => {
        console.log(optionsHeaders);
        try {
            const response = await axios.get(url,{
                headers: optionsHeaders
            });
            res.status(200).json({data: response.data});
        } catch (err) {
            res.status(500).json({msg: "something bad has occurred."});
        }
    }

    return controller;
}
