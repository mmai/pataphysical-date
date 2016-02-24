var should = require('chai').should();

require('../PataphysicalDate');

describe('PataphysicalDate', function(){
  var pata;

  describe('PataphysicalDate()', function(){
          it('should accept no arguments', function(){
                  pata = new PataphysicalDate();
                  pata.gregorian.should.be.a('Date');
              });
          it('should accept valid dates', function(){
                  pata = new PataphysicalDate(new Date("1873-09-08"));
                  pata.gregorian.should.be.a('Date');

                  pata = new PataphysicalDate(new Date("0001-01-01"));
                  pata.gregorian.should.be.a('Date');
              });
          it('should accept valid string date representation', function(){
                  pata = new PataphysicalDate("1873-09-08");
                  pata.gregorian.should.be.a('Date');
              });
          it('should reject invalid dates', function(){
                  (function (){
                      pata = new PataphysicalDate(new Date("garbage"));
                  }).should.throw(/Invalid input date/);
          });
  });

  describe('getFullYear', function(){
          it('should give the year', function(){
                  pata = new PataphysicalDate(new Date("1873-09-08"));
                  pata.getFullYear().should.equal(1);

                  pata = new PataphysicalDate(new Date("2014-03-01"));
                  pata.getFullYear().should.equal(141);

                  pata = new PataphysicalDate(new Date("2014-10-01"));
                  pata.getFullYear().should.equal(142);
              });
      });

  describe('getMonth', function(){
          it('should give the month', function(){
                  pata = new PataphysicalDate(new Date("2015-02-01"));
                  pata.getMonth().should.equal(5);

                  pata = new PataphysicalDate(new Date("2015-03-01"));
                  pata.getMonth().should.equal(6);

                  pata = new PataphysicalDate(new Date("2015-03-23"));
                  pata.getMonth().should.equal(7);

                  pata = new PataphysicalDate(new Date("0001-01-01"));
                  pata.getMonth().should.equal(4);
              });
      });

  describe('getDay', function(){
          it('should give the day', function(){
                  pata = new PataphysicalDate(new Date("2015-03-01"));
                  pata.getDay().should.equal(7);

                  pata = new PataphysicalDate(new Date("2015-03-01 23:30"));
                  pata.getDay().should.equal(7);

                  pata = new PataphysicalDate(new Date("2015-03-02 00:30"));
                  pata.getDay().should.equal(8);
              })
      });

  describe('getMonthName', function(){
          it('should give the month name', function(){
                  pata = new PataphysicalDate(new Date("2015-03-01"));
                  pata.getMonthName().should.equal("Pédale");
              })
      });

  describe('getDayName', function(){
          it('should give the day name', function(){
                  pata = new PataphysicalDate(new Date("2015-03-01"));
                  pata.getDayName().should.equal("Samedi");
              })
      });

  describe('toString()', function(){
    it('should return a valid string', function(){
            pata = new PataphysicalDate();
            pata.gregorian.should.be.a('Date');
            pata.toString().should.be.a('String');
        });

    it('should return the correct date representation', function(){
            pata = new PataphysicalDate(new Date("2014-03-02"));
            pata.toString().should.equal('Dimanche 8 Pédale 141');
        });

    it('should display "1er" for the first day of month', function(){
            pata = new PataphysicalDate(new Date("2014-02-23"));
            pata.toString().should.equal('Dimanche 1er Pédale 141');
        });
  });

  describe('getDayImportance', function(){
    it('should return a valid string', function(){
            pata = new PataphysicalDate();
            pata.getDayImportance().should.be.a('String');
        });

    it('should return the correct importance of the day', function(){
            pata = new PataphysicalDate(new Date("2014-02-23"));
            pata.getDayImportance().should.equal('fête suprême tierce');
        });
  });

  describe('getSaintOfDay', function(){
    it('should return a valid string', function(){
            pata = new PataphysicalDate();
            pata.getSaintOfDay().should.be.a('String');
        });

    it('should return a the correct saint of the day', function(){
            pata = new PataphysicalDate(new Date("2014-03-02"));
            pata.getSaintOfDay().should.equal("LA MACHINE À INSPIRER L'AMOUR");
        });
      })

})
