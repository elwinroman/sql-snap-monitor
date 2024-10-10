## Como Empezar

### Local Development
```bash
git clone https://github.com/elwinroman/quality-tools
cd quality-tools
npm install
npm run dev
```

### Build
```bash
git clone https://github.com/elwinroman/quality-tools
cd quality-tools
npm install
npm run build
npm run start
```

### Docker Development
```bash
git clone https://github.com/elwinroman/quality-tools
cd quality-tools
docker-compose up omnissiah-api-dev
```

### Docker Build
```bash
git clone https://github.com/elwinroman/quality-tools
cd quality-tools
docker-compose up omnissiah-api
```

## Configuracion Variables de Entorno

Configure el servidor y las variables de entorno segun `.env.sample`

La variable **ENCRYPT_KEY** tiene que tener 32 caracteres
La variable **ENCRYPT_IV** tiene que tener 16 caracteres