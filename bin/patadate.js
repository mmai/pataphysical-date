#!/usr/bin/env node

'use strict';

require('../PataphysicalDate.js');

var now = new PataphysicalDate();
console.log(now.toString());
