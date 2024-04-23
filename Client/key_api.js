/* eslint-disable no-undef */
import { readFileSync } from 'fs'
import request from 'request'
var body = JSON.parse(readFileSync('body.json', 'utf8'))

var options = {
  method: 'POST',
  uri: 'https://api.pagar.me/core/v5/orders',
  headers: {
    Authorization:
      'Basic ' +
      Buffer.from('sk_test_b9cb57ee02c74c2881921e0f78271f4d:').toString(
        'base64'
      ),
    'Content-Type': 'application/json'
  },
  json: body
}

request(options, function (error, response, body) {
  console.log(response.body)
})
