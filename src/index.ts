import 'regenerator-runtime/runtime.js';
import { mount } from './ui';

async function run() {
    return mount(document.getElementById('root')!);
}

run();
