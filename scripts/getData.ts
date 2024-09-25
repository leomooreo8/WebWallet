import { Address, fromNano, toNano } from '@ton/core';
import { WebWallet } from '../wrappers/WebWallet';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('WebWallet address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const webWallet = provider.open(WebWallet.fromAddress(address));

    const balance = await webWallet.getBalance();
    console.log(`balance before: `, fromNano(balance));
   
    await webWallet.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'IsDeploy',
            set: true,
        }
    );

    const balanceAfter = await webWallet.getBalance();
    console.log(`balance balanceAfter: `, fromNano(balanceAfter));
    //ui.write(`Balance: ${balance}`);
    
}
