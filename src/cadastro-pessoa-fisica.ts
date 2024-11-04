const multiplier = [10, 9, 8, 7, 6, 5, 4, 3, 2];
const maxLengthWithoutMask = 11;
const maxLengthWithMask = 14;

// Public functions

const isValid = (cpf: string): boolean => {
    const [isValid, cleanCpf] = cleanAndPreValidate(cpf);

    if (!isValid) {
        return false;
    }

    if (allDigitsAreEqual(cleanCpf)) {
        return false;
    }

    const firstVerificationDigit = calculateFirstVerificationDigit(cleanCpf);
    const secondVerificationDigit = calculateSecondVerificationDigit(cleanCpf);

    return cleanCpf.endsWith(
        firstVerificationDigit.toString() + secondVerificationDigit.toString(),
    );
};

const format = (cpf: string): string => {
    const [isValid, cleanCpf] = cleanAndPreValidate(cpf);

    if (!isValid) {
        return cpf;
    }

    return formatInternal(cleanCpf);
};

const generate = (
    formatted: boolean = false,
    region: number | null = null,
): string => {
    let randomCpf = '';

    if (region) {
        if (typeof region !== 'number' || region < 0 || region > 9) {
            throw new Error('Invalid region');
        }
        randomCpf =
            generateRandomNumber(10000000, 99999999).toString() + region;
    } else {
        randomCpf = generateRandomNumber(100000000, 999999999).toString();
    }

    randomCpf += calculateFirstVerificationDigit(randomCpf);
    randomCpf += calculateSecondVerificationDigit(randomCpf);

    return formatted ? formatInternal(randomCpf) : randomCpf;
};

// Private functions

const generateRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const formatInternal = (cpf: string): string => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

const cleanAndPreValidate = (cpf: string): [boolean, string] => {
    // O CPF não pode ser vazio e deve ter no máximo 14 caracteres (com máscara) e no mínimo 11 caracteres (sem máscara)
    if (
        !cpf ||
        cpf.trim() === '' ||
        cpf.length > maxLengthWithMask ||
        cpf.length < maxLengthWithoutMask
    ) {
        return [false, ''];
    }

    // Remove caracteres especiais e verifica se o tamanho do CPF é válido
    cpf = cpf.replace(/[.-]/g, '');
    if (cpf.length !== maxLengthWithoutMask) {
        return [false, ''];
    }

    // Remove caracteres não numéricos e verifica se o tamanho do CPF é válido
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== maxLengthWithoutMask) {
        return [false, ''];
    }

    return [true, cpf];
};

const allDigitsAreEqual = (cpf: string): boolean => {
    return cpf.split('').every((char, _index, array) => char === array[0]);
};

const calculateFirstVerificationDigit = (cpf: string): number => {
    let sum = 0;
    for (let i = 0; i < multiplier.length; i++) {
        sum += parseInt(cpf[i]!, 10) * multiplier[i]!;
    }
    return calculateDigit(sum);
};

const calculateSecondVerificationDigit = (cpf: string): number => {
    let sum = 0;
    for (let i = 0; i < multiplier.length; i++) {
        sum += parseInt(cpf[i + 1]!, 10) * multiplier[i]!;
    }
    return calculateDigit(sum);
};

const calculateDigit = (sum: number): number => {
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
};

// Export functions

export default {
    isValid,
    format,
    generate,
};
