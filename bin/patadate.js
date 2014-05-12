#!/usr/bin/env node

'use strict';

require('../PataphysicalDate.js');
var opts = require('opts');
var pjson = require('../package.json');

//******* Command line parsing
var options = [
  {
      short       : 'v',
      long        : 'version',
      description : 'Show version and exit',
      callback    : function () {
          console.log(pjson.version);
          process.exit(1);
      }
  }
];
var args = [ { name : 'date' , required : false } ];

opts.parse(options, args, true);

var date = opts.arg('date');
// end command line parsing

try {
    var now = new PataphysicalDate(date);
    console.log(now.toString() + " [" + now.getSaintOfDay() + "]");
} catch (e){
    console.error(e.message);
}

