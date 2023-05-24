import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'camel.on.prod',
    appName: 'WorkInOut',
    webDir: 'www',
    server: {
        androidScheme: 'https',
    },
};

export default config;
