const request = require('request')
const uuidv4 = require("uuid/v4")
const crypto = require('crypto')
const sign = require('jsonwebtoken').sign
const queryEncode = require("querystring").encode

const settings = require('./settings');
const server_url = 'https://api.upbit.com'


exports.getOrderStatus = (uuid) => new Promise((resolve, reject)=> {

    const API = "/v1/order"
    const body = { uuid: uuid }

    request(createGetOptions(API, body), function(error, response, body) {
        if (error) {
            resolve(error);
        }
        resolve(body);
    })
})


exports.requestMarketBuy = (symbol, amt) => new Promise((resolve, reject)=> {

    const API = "/v1/orders"
    const body = {
        market: symbol,
        price: amt,
        side: 'bid',
        ord_type: 'price',
    }

    request(createPostOptions(API, body), function(error, response, body) {
        if (error) {
            resolve(error);
        }
        resolve(body);
    })
})


function createPostOptions(api, body){

    const query = queryEncode(body)
    const token = createToken(body)

    return {
        method: 'POST',
        url: `${server_url}${api}`,
        headers: {Authorization: `Bearer ${token}`},
        json: body
    }

}

function createGetOptions(api, body){

    const query = queryEncode(body)
    const token = createToken(body)

    return {
        method: 'GET',
        url: `${server_url}${api}?${query}`,
        headers: {Authorization: `Bearer ${token}`},
        json: body
    }

}

function createToken(body){

    const query = queryEncode(body)
    const hash = crypto.createHash('sha512')
    const queryHash = hash.update(query, 'utf-8').digest('hex')

    const payload = {
        access_key: settings.getAccessKey(),
        nonce: uuidv4(),
        query_hash: queryHash,
        query_hash_alg: 'SHA512',
    }

    return sign(payload, settings.getSecretKey())

}