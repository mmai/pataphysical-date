var should = require('chai').should();

require('../PataphysicalDate');

describe('PataphysicalDate', function(){
  var pata;

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

  describe('toString()', function(){
    it('should return a valid string', function(){
            pata = new PataphysicalDate();
            pata.gregorian.should.be.a('Date');
            pata.toString().should.be.a('String');
        });

    it('should return a the correct date representation', function(){
            pata = new PataphysicalDate(new Date("2014-03-02"));
            pata.toString().should.equal('Dimanche 8 Pédale 141');
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
