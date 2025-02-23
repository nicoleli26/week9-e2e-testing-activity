
import { EnteringThirdNumberState } from './entering-third-number.state';
import { NumericKeys } from '../enums';
import { ICalculatorState, IContext, IStateData } from '../interfaces';
import { CalculatorModel } from '../models/calculator.model';
import { StateData } from '../models/state-data.model';
import { EnteringFirstNumberState } from './entering-first-number.state';

describe('states', (): void => {
  describe('EnteringThirdNumberState', (): void => {

    let enteringThirdNumberState: EnteringThirdNumberState;
    let calculatorModel: IContext;
    let stateData: IStateData;

    beforeEach((): void => {
      calculatorModel = new CalculatorModel();
      stateData = new StateData.Builder().build();
      enteringThirdNumberState = new EnteringThirdNumberState(calculatorModel, stateData);
    });

    afterEach((): void => {
      jest.clearAllMocks();
      enteringThirdNumberState = null as any;
      calculatorModel = null as any;
      stateData = null as any;
    });

    describe('digit()', (): void => {

      it('should replace firstBuffer with input if firstBuffer is 0', (): void => {

        enteringThirdNumberState.data.thirdBuffer = '0';

        enteringThirdNumberState.digit(NumericKeys.ONE);

        expect(enteringThirdNumberState.data.thirdBuffer).toEqual('1');

      });

      it('should append the input digit to the firstBuffer if firstBuffer is not 0', (): void => {

        enteringThirdNumberState.digit(NumericKeys.ONE);

        expect(enteringThirdNumberState.data.thirdBuffer).toEqual('1');

      });

    });

    describe('decimalSeparator()', (): void => {

      it('should add a decimal point to firstBuffer if the buffer is currently empty', (): void => {

        enteringThirdNumberState.decimalSeparator();

        expect(enteringThirdNumberState.data.thirdBuffer).toEqual('.');

      });

      it('should add a decimal point at the end of firstBuffer if the buffer is not empty', (): void => {

        enteringThirdNumberState.data.thirdBuffer = '12';

        enteringThirdNumberState.decimalSeparator();

        expect(enteringThirdNumberState.data.thirdBuffer).toEqual('12.');

      });

      it('should do nothing if firstBuffer already contains a decinal point', (): void => {

        enteringThirdNumberState.data.thirdBuffer = '12.34';

        enteringThirdNumberState.decimalSeparator();

        expect(enteringThirdNumberState.data.thirdBuffer).toEqual('12.34');

      });

    });

    // describe('binaryOperator()', (): void => {
    //   it.todo('should do something');
    // });

    // describe('equals()', (): void => {
    //   it.todo('should do something');
    // });

    describe('clear()', (): void => {

      it('should transition to EnteringFirstNumberState with empty state', (): void => {

        const expectedState: ICalculatorState = new EnteringFirstNumberState(calculatorModel, new StateData.Builder().build());
        jest.spyOn(calculatorModel, 'changeState').mockReturnValue(null as any);

        enteringThirdNumberState.clear();

        expect(calculatorModel.changeState)
          .toHaveBeenCalledWith(expectedState);

      });

    });

    describe('display()', (): void => {

      it('should call through to state.display()', (): void => {

        jest.spyOn(stateData, 'display').mockReturnValue('displayValue');

        enteringThirdNumberState.display();

        expect(stateData.display).toHaveBeenCalledWith();

      });

      it('should call return the value returned by state.display()', (): void => {

        jest.spyOn(stateData, 'display').mockReturnValue('displayValue');

        const returnedValue: string = enteringThirdNumberState.display();

        expect(returnedValue).toEqual('displayValue');

      });

    });

  });
});
