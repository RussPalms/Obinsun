// require("dotenv").config()
// const expressServer = require("./")

import type { Application, Express } from 'express';
import type RequestHandlerParams from 'express';
// import type RequestHandler from 'express'
import type Next from 'next';

// const express: Express = require('express');
// const next: typeof Next = require('next');

class ExpNexApi {
  express;
  i: number;

  constructor(expressRef: Express) {
    this.express = expressRef;
    this.i = 0;
  }

  apiInit() {
    const apiBase = '/api';
    this.express.get(`${apiBase}/get`, (req, res) => {
      res.send({ i: this.i });
    });

    this.express.post(`${apiBase}/get`, (req, res) => {
      this.i++;
      res.send({ i: this.i });
    });
  }
}

// module.exports = ExpNexApi

class ExpNexPages {
  express;
  next;
  constructor(expressRef: Express, nextRef: typeof Next) {
    this.express = expressRef;
    this.next = nextRef;
  }

  pageInit() {
    this.initSpecialPages();
    this.initDefaults();
  }

  initSpecialPages() {
    this.express.get('/my_special_page/:special_value', (req, res) => {
      const intValue = parseInt(req.params.special_value);
      if (intValue) {
        return this.next.render(req, res, `/special_int`, req.query);
      }
    });
  }
}

// class NextjsExpressRouter {
//     express
//     next

//     constructor(expressRef: Express, nextRef: typeof Next) {
//         this.express = expressRef
//         this.next = nextRef

//     async init() {
//         this.initApi()
//         this.initPages()
//         this.initErrors()
//     }

//     initApi() {
//         // return(new (require("./routes/api.js")))
//         return ((new (require(ExpNexApi)))(this.express, this.next)).init()

//     }
// }
