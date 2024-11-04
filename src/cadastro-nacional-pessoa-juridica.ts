const multiplier = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const maxLengthWithoutMask = 14;
const maxLengthWithMask = 18;
const numbersChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const lettersChars = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
];

// Public functions

const isValid = (cnpj: string): boolean => {
    const [isValid, cleanCnpj] = cleanAndPreValidate(cnpj);

    if (!isValid) {
        return false;
    }

    if (allDigitsAreEqual(cleanCnpj)) {
        return false;
    }

    const firstVerificationDigit = calculateFirstVerificationDigit(cleanCnpj);
    const secondVerificationDigit = calculateSecondVerificationDigit(cleanCnpj);

    return cleanCnpj.endsWith(
        firstVerificationDigit.toString() + secondVerificationDigit.toString(),
    );
};

const format = (cnpj: string): string => {
    const [isValid, cleanCnpj] = cleanAndPreValidate(cnpj);

    if (!isValid) {
        return cnpj;
    }

    return formatInternal(cleanCnpj);
};

const generate = (
    formatted: boolean = false,
    useLetters: boolean = false,
): string => {
    let randomCnpj = '';
    const chars = useLetters
        ? [...numbersChars, ...lettersChars]
        : numbersChars;

    for (let i = 0; i < maxLengthWithoutMask - 2; i++) {
        randomCnpj += chars[randomNumber(0, chars.length - 1)];
    }

    randomCnpj += calculateFirstVerificationDigit(randomCnpj);
    randomCnpj += calculateSecondVerificationDigit(randomCnpj);

    return formatted ? formatInternal(randomCnpj) : randomCnpj;
};

// Private functions

const randomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const formatInternal = (cnpj: string): string => {
    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
};

const cleanAndPreValidate = (cnpj: string | null): [boolean, string] => {
    if (
        !cnpj ||
        cnpj.trim() === '' ||
        cnpj.length > maxLengthWithMask ||
        cnpj.length < maxLengthWithoutMask
    ) {
        return [false, ''];
    }

    cnpj = cnpj.replace(/[-\\/.]/g, '');
    if (cnpj.length !== maxLengthWithoutMask) {
        return [false, ''];
    }

    cnpj = cnpj.toUpperCase().replace(/[^0-9A-Z]/g, '');
    if (cnpj.length !== maxLengthWithoutMask) {
        return [false, ''];
    }

    if (
        !numbersChars.includes(cnpj[12]!) ||
        !numbersChars.includes(cnpj[13]!)
    ) {
        return [false, ''];
    }

    return [true, cnpj];
};

const allDigitsAreEqual = (cnpj: string): boolean => {
    return cnpj.split('').every((char, _index, array) => char === array[0]);
};

const calculateFirstVerificationDigit = (cleanedCnpj: string): number => {
    let sum = 0;
    for (let i = 1; i < multiplier.length; i++) {
        sum += (cleanedCnpj.charCodeAt(i - 1) - 48) * multiplier[i]!;
    }
    return calculateDigit(sum);
};

const calculateSecondVerificationDigit = (cleanedCnpj: string): number => {
    let sum = 0;
    for (let i = 0; i < multiplier.length; i++) {
        sum += (cleanedCnpj.charCodeAt(i) - 48) * multiplier[i]!;
    }
    return calculateDigit(sum);
};

const calculateDigit = (sum: number): number => {
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
};

// Export module
export default {
    isValid,
    format,
    generate,
};
