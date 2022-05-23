'use strict'

var controller = {
    calculate: function(req, res){
        return res.status(200).send(
            processCalculation(req.body)
        );
    }
};

function processCalculation (params){
    var speedOfLight = params.speedOfLight;
    var injectorDamageA = params.injectorDamageA;
    var injectorDamageB = params.injectorDamageB;
    var injectorDamageC = params.injectorDamageC;
    var acceleration = 100;
    var plasmaFlow = 300;
    var extraPlasma = 99;

    var numberInjectors = 0;
    numberInjectors = injectorDamageA < 100 ? numberInjectors+1 : numberInjectors;
    numberInjectors = injectorDamageB < 100 ? numberInjectors+1 : numberInjectors;
    numberInjectors = injectorDamageC < 100 ? numberInjectors+1 : numberInjectors;

    var plasmaNeeded =  (plasmaFlow * speedOfLight) / acceleration;

    var a = plasmaFlowDamageCalculation(100 , injectorDamageA);
    var b = plasmaFlowDamageCalculation(100 , injectorDamageB);
    var c = plasmaFlowDamageCalculation(100 , injectorDamageC);
    
    var plasmaGenerated = a + b + c;
    var operatingTime = plasmaGenerated;
    if(plasmaGenerated == plasmaNeeded){
        operatingTime = 100;
    }else if(plasmaGenerated > plasmaNeeded){
        var aTemp = 0;
        var bTemp = 0;
        var cTemp = 0;
        var plasmaByInjector = Math.ceil(plasmaNeeded / numberInjectors);
        var calculatedPlasma = 0;
        var temp = [0, 0];
        while(plasmaGenerated != calculatedPlasma && calculatedPlasma != plasmaNeeded){
            temp = plasmaCalculationInjector(plasmaByInjector + temp[1], a);
            aTemp = temp[0];
            temp = plasmaCalculationInjector(plasmaByInjector + temp[1], b);
            bTemp = temp[0];
            temp = plasmaCalculationInjector(plasmaByInjector + temp[1], c);
            cTemp = temp[0];
            calculatedPlasma = aTemp + bTemp + cTemp;
        }
        a = aTemp;
        b = bTemp;
        c = cTemp;
        operatingTime = 100;
    }else if(plasmaGenerated < plasmaNeeded){
        var missingPlasma = plasmaNeeded - plasmaGenerated;
        missingPlasma = Math.ceil(missingPlasma / numberInjectors);
        if(missingPlasma > extraPlasma){
            missingPlasma = extraPlasma;
        }
        /*Inyector A*/
        var plasmaProjected = a + b + c + missingPlasma;
        var difference = 0;
        if(plasmaProjected > plasmaNeeded){
            difference = missingPlasma - (plasmaProjected - plasmaNeeded);
            a = a + difference;
        }else{
            a = a + missingPlasma;
        }
        /*Inyector B*/
        plasmaProjected = a + b + c + missingPlasma;
        if(plasmaProjected > plasmaNeeded){
            difference = missingPlasma - (plasmaProjected - plasmaNeeded);
            b = b + difference;
        }else{
            b = b + missingPlasma;
        }
        /*Inyector C*/
        plasmaProjected = a + b + c + missingPlasma;
        if(plasmaProjected > plasmaNeeded){
            difference = missingPlasma - (plasmaProjected - plasmaNeeded);
            c = c + difference;
        }else{
            c = c + missingPlasma;
        }
        operatingTime = 100 - missingPlasma;
    }
    a = injectorDamageA == 100 ? 0 : a;
    b = injectorDamageB == 100 ? 0 : b;
    c = injectorDamageC == 100 ? 0 : c;
    
    var totalPlasmaGenerated = a + b + c;
    operatingTime = totalPlasmaGenerated != plasmaNeeded ? 0 : operatingTime;
    operatingTime = operatingTime == 100 ? 'Infinito' : operatingTime;
    return {
        'injectorA': operatingTime == 0 ? 0 : a,
        'injectorB': operatingTime == 0 ? 0 : b,
        'injectorC': operatingTime == 0 ? 0 : c,
        'alert': operatingTime == 0 ? "Unable to comply" : "",
        'operatingTime': operatingTime != 'Infinito' ? operatingTime + ' minutos' : operatingTime    
    };
}
function plasmaCalculationInjector(plasmaByInjector, injector){
    var missingPlasma = 0;
    if(plasmaByInjector <= injector){
        injector = plasmaByInjector;
    }else{
        missingPlasma = plasmaByInjector - injector;
    }
    return [injector, missingPlasma];        
}
function plasmaFlowDamageCalculation(injector, damage){
    return injector - damage;
}

module.exports = controller;