import { expect, test } from 'vitest';
import cpf from './cadastro-pessoa-fisica';

test('should be valid when cpf is valid', () => {
    const isValid = cpf.isValid('293.043.766-96');
    expect(isValid).toBeTruthy();
});

test('should be invalid when cpf is invalid', () => {
    const isValid = cpf.isValid('293.043.766-95');
    expect(isValid).toBeFalsy();
});

test('should be invalid when cpf is empty', () => {
    const isValid = cpf.isValid('');
    expect(isValid).toBeFalsy();
});

test('should be invalid when cpf is null', () => {
    const isValid = cpf.isValid(null!);
    expect(isValid).toBeFalsy();
});

test('should be invalid when cpf is undefined', () => {
    const isValid = cpf.isValid(undefined!);
    expect(isValid).toBeFalsy();
});

test('should be invalid when cpf is too short', () => {
    const isValid = cpf.isValid('123');
    expect(isValid).toBeFalsy();
});

test('should be invalid when cpf is too long', () => {
    const isValid = cpf.isValid('123456789012345');
    expect(isValid).toBeFalsy();
});

test('should be invalid when cpf has only one digit', () => {
    const isValid = cpf.isValid('1');
    expect(isValid).toBeFalsy();
});

test('should be invalid when cpf has only one digit repeated', () => {
    const isValid = cpf.isValid('111.111.111-11');
    expect(isValid).toBeFalsy();
});

test('should format cpf with mask', () => {
    const formattedCpf = cpf.format('29304376696');
    expect(formattedCpf).toBe('293.043.766-96');
});

test('must return the same entry when the cpf has an invalid pattern', () => {
    const formattedCpf = cpf.format('293043766956');
    expect(formattedCpf).toBe('293043766956');
});

test('should not format empty cpf', () => {
    const formattedCpf = cpf.format('');
    expect(formattedCpf).toBe('');
});

test('should not format null cpf', () => {
    const formattedCpf = cpf.format(null!);
    expect(formattedCpf).toBe(null!);
});

test('should not format undefined cpf', () => {
    const formattedCpf = cpf.format(undefined!);
    expect(formattedCpf).toBe(undefined!);
});

test('should generate a random cpf', () => {
    const generatedCpf = cpf.generate();
    expect(cpf.isValid(generatedCpf)).toBeTruthy();
});

test('should generate a random cpf with specific region', () => {
    const generatedCpf = cpf.generate(false, 7);
    expect(cpf.isValid(generatedCpf)).toBeTruthy();
    expect(generatedCpf[8]).toBe('7');
});

test('should generate a random cpf with mask', () => {
    const generatedCpf = cpf.generate(true);
    expect(cpf.isValid(generatedCpf)).toBeTruthy();
    expect(generatedCpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
});

test('should throw error when region is invalid', () => {
    expect(() => cpf.generate(false, 10)).toThrowError('Invalid region');
});

test('should throw error when region is invalid', () => {
    expect(() => cpf.generate(false, -1)).toThrowError('Invalid region');
});
