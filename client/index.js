import {createApp} from 'vue';
import App from './App.vue';
import './assets/styles/global.styl';

const root = document.createElement('div');
document.body.appendChild(root);

createApp(App).mount(root);
