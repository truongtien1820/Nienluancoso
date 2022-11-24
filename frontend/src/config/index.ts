const local = {
    api: 'http://localhost:8080/',
};

const staging = {
    api: 'http://localhost:8080/',
};

let envConfig = local;

if (process.env.REACT_APP_STAGE === 'staging') {
    envConfig = staging;
} else {
    envConfig = local;
}

const environment = envConfig;

export default environment;