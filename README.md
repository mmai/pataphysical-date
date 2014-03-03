#pataphysical-date

A javascript library which convert Gregorian dates to the [Pataphysical Calendar](http://user.icx.net/~richmond/rsr/pataphysique/pataphysique.html)

##Usage

pataphysical-date works in Node.js and the browser. It also provide a command line utility.

###Node.js

```npm install pataphysical-date```

```javascript
require('pataphysical-date');
var pnow = new PataphysicalDate();
console.log('Today is ' + pnow.toString());
```

###Browser

```html
<script src="PataphysicalDate.js"></script>
<script>
  var pnow = new PataphysicalDate();
  document.write('Today is ' + pnow.toString());
</script>
```

pataphysical-date is available as a bower package : 
```bower install pataphysical-date```

```html
<script src="bower_components/pataphysical-date/PataphysicalDate.js"></script>
```

###Command line
The npm package provide the 'patadate' command which displays the current date according to the Pataphysical calendar.

```bash
npm install -g pataphysical-date
patadate
```

###API

The API is very limited at the moment : you can display the current date, the saint of the day, and convert a gregorian date :

```javascript
//Display current date
var pnow = new PataphysicalDate(); //Current date by default
console.log('Today is ' + pnow.toString());

//Convert a date
var pdate = new PataphysicalDate(new Date("1903-02-21"));
console.log('Raymond Queneau est né le ' + pdate.toString());

//Get the saint of the day
console.log(pdate.getSaintOfDay());

```
