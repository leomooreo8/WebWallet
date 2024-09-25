import { toNano } from '@ton/core';
import { WebWallet } from '../wrappers/WebWallet';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const webWallet = provider.open(await WebWallet.fromInit());

    await webWallet.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(webWallet.address);

    
}
