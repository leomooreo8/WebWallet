import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/WebWallet.tact',
    options: {
        debug: true,
    },
};
