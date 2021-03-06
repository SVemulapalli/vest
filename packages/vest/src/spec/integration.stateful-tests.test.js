import resetState from '../../testUtils/resetState';
import runSpec from '../../testUtils/runSpec';

runSpec(vest => {
  describe('Stateful behavior', () => {
    beforeEach(() => {
      resetState();
    });
    let result;
    test.skipOnWatch('Should merge skipped fields with previous values', () => {
      result = suite(vest, 'field_1');
      expect(result.tests.field_1.errorCount).toBe(1);
      expect(result.errorCount).toBe(1);
      expect(Object.keys(result.tests)).toHaveLength(1);
      expect(result.tests).toHaveProperty('field_1');
      expect(result).toMatchSnapshot();

      result = suite(vest, 'field_5');
      expect(result.errorCount).toBe(3);
      expect(result.tests.field_1.errorCount).toBe(1);
      expect(result.tests.field_5.errorCount).toBe(2);
      expect(Object.keys(result.tests)).toHaveLength(2);
      expect(result.tests).toHaveProperty('field_1');
      expect(result.tests).toHaveProperty('field_5');
      expect(result).toMatchSnapshot();

      result = suite(vest);
      expect(result.errorCount).toBe(4);
      expect(result.tests.field_1.errorCount).toBe(1);
      expect(result.tests.field_2.errorCount).toBe(1);
      expect(result.tests.field_4.warnCount).toBe(1);
      expect(result.tests.field_5.errorCount).toBe(2);
      expect(Object.keys(result.tests)).toHaveLength(5);
      expect(result).toMatchSnapshot();
    });
  });
});

const suite = ({ create, test, enforce, ...vest }, only) =>
  create('suite_name', () => {
    vest.only(only);
    test('field_1', 'field_statement_1', () => false);
    test('field_2', 'field_statement_2', () => {
      enforce(2).equals(3);
    });
    test('field_3', 'field_statement_3', () => {});
    test('field_4', 'field_statement_4', () => {
      vest.warn();
      throw new Error();
    });
    test('field_4', 'field_statement_4', () => {
      vest.warn();
    });
    test('field_5', 'field_statement_5', () => false);
    test('field_5', 'field_statement_6', () => false);
  })();
