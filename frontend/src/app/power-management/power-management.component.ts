import { Component, Input, OnInit } from '@angular/core';
import { ReactorVO } from '../interface/request/reactor-vo';
import { InjectorResultResponseVO } from '../interface/response/injector-result-response-vo';
import { PowerManagementService } from '../services/power-management.service';

@Component({
    selector: 'power-management',
    templateUrl: './power-management.component.html',
    providers: [PowerManagementService]
  })
  export class PowerManagementComponent  implements OnInit {

    reactor: ReactorVO;
    result: InjectorResultResponseVO;
    show: boolean;

    constructor(private _powerManagementService: PowerManagementService) { 
      this.reactor = {
        injectorDamageA: 0, 
        injectorDamageB:0, 
        injectorDamageC: 0, 
        speedOfLight:0
      }
      this.result = {
        injectorA: 0, 
        injectorB:0, 
        injectorC: 0, 
        operatingTime: '0',
        alert: ''
      }
      this.show = true;
    }

    ngOnInit(): void {
    }
    
    onSubmit(reactor: ReactorVO){
        this._powerManagementService.calculate(reactor).subscribe( result => {
        this.show = result.alert == '' ? true : false;
        this.result = result;
      })
    }
  }