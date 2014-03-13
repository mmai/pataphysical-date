#pataphysical-date

A javascript library which converts Gregorian dates to the [Pataphysical Calendar](http://user.icx.net/~richmond/rsr/pataphysique/pataphysique.html)

##Usage

pataphysical-date works in Node.js and the browser. It also provides a command line utility.

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

```javascript
//Display current date
var pnow = new PataphysicalDate(); //Current date by default
console.log('Today is ' + pnow.toString());

//Convert a date
var pdate = new PataphysicalDate(new Date("1903-02-21"));
console.log('Raymond Queneau est né le ' + pdate.toString()); // Raymond Queneau est né le Vendredi 27 Gueules 30

//Get the year
console.log(pdate.getFullYear()); // 30

//Get the month (begins at 0, like the javascript Date object)
console.log(pdate.getMonth()); // 5 

//Get the day
console.log(pdate.getDay()); // 27

//Get the month name
console.log(pdate.getMonthName()); // Gueules

//Get the day name
console.log(pdate.getDayName()); // Vendredi

//Get the saint of the day
console.log(pdate.getSaintOfDay()); // Ste Tabagie, cosmogène

//Get the importance of the day
console.log(pdate.getDayImportance()); // fête suprême quarte

```
