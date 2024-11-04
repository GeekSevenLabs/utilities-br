import { expect, test } from 'vitest';
import cnpj from './cadastro-nacional-pessoa-juridica';

test('should be valid when cnpj without mask is valid', () => {
    const isValid = cnpj.isValid('96624359844781');
    expect(isValid).toBeTruthy();
});

test('should be valid when cnpj with mask is valid', () => {
    const isValid = cnpj.isValid('96.624.359/8447-81');
    expect(isValid).toBeTruthy();
});

test('should be valid when new-cnpj with mask is valid', () => {
    const isValid = cnpj.isValid('6N.GW1.4SD/XK7F-25');
    expect(isValid).toBeTruthy();
});

test('should be valid when new-cnpj without is valid', () => {
    const isValid = cnpj.isValid('6NGW14SDXK7F25');
    expect(isValid).toBeTruthy();
});

test('should be invalid when cnpj is invalid', () => {
    const isValid = cnpj.isValid('29.304.376/0001-27');
    expect(isValid).toBeFalsy();
});

test('should be invalid when cnpj is empty', () => {
    const isValid = cnpj.isValid('');
    expect(isValid).toBeFalsy();
});

test('should be invalid when cnpj is null', () => {
    const isValid = cnpj.isValid(null!);
    expect(isValid).toBeFalsy();
});

test('should be invalid when cnpj is undefined', () => {
    const isValid = cnpj.isValid(undefined!);
    expect(isValid).toBeFalsy();
});

test('should be invalid when cnpj is too short', () => {
    const isValid = cnpj.isValid('123');
    expect(isValid).toBeFalsy();
});

test('should be invalid when cnpj is too long', () => {
    const isValid = cnpj.isValid('1234567890123456');
    expect(isValid).toBeFalsy();
});

test('should be invalid when cnpj has only one digit', () => {
    const isValid = cnpj.isValid('1');
    expect(isValid).toBeFalsy();
});

test('should be invalid when cnpj has only one digit repeated', () => {
    const isValid = cnpj.isValid('11.111.111/1111-11');
    expect(isValid).toBeFalsy();
});

test('should format cnpj with mask', () => {
    const formattedCnpj = cnpj.format('29304376000128');
    expect(formattedCnpj).toBe('29.304.376/0001-28');
});

test('must return the same entry when the cnpj has an invalid pattern', () => {
    const formattedCnpj = cnpj.format('293043760001281');
    expect(formattedCnpj).toBe('293043760001281');
});

test('should not format empty cnpj', () => {
    const formattedCnpj = cnpj.format('');
    expect(formattedCnpj).toBe('');
});

test('should not format null cnpj', () => {
    const formattedCnpj = cnpj.format(null!);
    expect(formattedCnpj).toBe(null!);
});

test('should not format undefined cnpj', () => {
    const formattedCnpj = cnpj.format(undefined!);
    expect(formattedCnpj).toBe(undefined!);
});

test('should not format cnpj with invalid characters', () => {
    const formattedCnpj = cnpj.format('2930437600012A');
    expect(formattedCnpj).toBe('2930437600012A');
});

test('should not format cnpj with invalid length', () => {
    const formattedCnpj = cnpj.format('29.304.376/0001-2');
    expect(formattedCnpj).toBe('29.304.376/0001-2');
});

test('should generate a valid cnpj', () => {
    const generatedCnpj = cnpj.generate();
    const isValid = cnpj.isValid(generatedCnpj);
    expect(isValid).toBeTruthy();
});

test('should generate a valid cnpj with letters', () => {
    const generatedCnpj = cnpj.generate(false, true);
    const isValid = cnpj.isValid(generatedCnpj);
    expect(isValid).toBeTruthy();
});

test('should generate a valid cnpj with mask', () => {
    const generatedCnpj = cnpj.generate(true, false);
    const isValid = cnpj.isValid(generatedCnpj);
    expect(isValid).toBeTruthy();
    expect(generatedCnpj).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
});

test('should generate a valid cnpj with letters and mask', () => {
    const generatedCnpj = cnpj.generate(true, true);
    const isValid = cnpj.isValid(generatedCnpj);
    expect(isValid).toBeTruthy();
    expect(generatedCnpj).toMatch(
        /^[0-9A-Z]{2}\.[0-9A-Z]{3}\.[0-9A-Z]{3}\/[0-9A-Z]{4}-\d{2}$/,
    );
});
