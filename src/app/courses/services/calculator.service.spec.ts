import {CalculatorService} from './calculator.service';
import {LoggerService} from './logger.service';
import {TestBed} from '@angular/core/testing';

describe('CalculatorService', () => {

    let calculator: CalculatorService,
        loggerSpy: any;

    beforeEach(() => {
        console.log('Calling beforEach', )
        loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);

        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                {provide: LoggerService, useValue: loggerSpy}
            ]
        })

        calculator = TestBed.get(CalculatorService);
    });

    it('should add two number', () => {
        console.log('add Test', )

        const result = calculator.add(2, 2);

        expect(result).toBe(4);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1)

    });

    it('should subtract two number', () => {
        console.log('subtract Test', )

        const result = calculator.subtract(2, 2);

        expect(result).toBe(0);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1)
    });


});