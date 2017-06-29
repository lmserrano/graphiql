/**
 *  Copyright (c) Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
 */


const requireFromString = require('require-from-string');

// const schema = require('./schema');

// Configuration
const baseURL = 'http://dev.puregroupapi.com/';

// const schemaURL = '/graphql'
const schemaURL = baseURL +
    'v2/graphql?apiKey=b2c1483c-a420-4a21-aa5f-0e189fe325ea';

// The actual application
const express = require('express');
const graphqlHTTP = require('express-graphql');

// const schema = require('./schema');

const request = require('sync-request');
const res = request('GET', schemaURL, {
    headers: {
        'Content-Type': 'application/json'
    }
});

const schemaString = res.getBody('utf-8');
// console.log(schemaString);

const schema = requireFromString(schemaString);
// const schema = require(schemaString);
// const schema = undefined;

const app = express();
app.use(express.static(__dirname));
// app.use('/graphql', graphqlHTTP(() => ({ schema, graphiql: true })));
app.use(schemaURL, graphqlHTTP(() => ({ schema })));

app.listen(0, function () {
  const port = this.address().port;
  console.log(`Started on http://localhost:${port}/`);
});
