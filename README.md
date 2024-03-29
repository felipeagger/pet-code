# Pet-Code Challenge (Nodejs)

# Objetivos

API que fornece algumas informações sobre os personagens "Rick and Morty". A API retorna um ranking dos personagens que mais tem mais versões diferentes dele em outros universos, base dos personagens para integração([https://rickandmortyapi.com]).

EndPoints: 
- Personagens: Listar, exibir, filtrar, processar.
- Localizações: Listar, exibir, filtrar, processar, listar ordenadamente.
- Ranking: Listar, processar.

# Libraries Utilizadas

Express, Mongoose, Axios(Requisições HTTP), Jest e Swagger-UI(Documentacao).

Express: É o microframework mais utilizados para APIs em Nodejs.

MongoDB: É o Banco NoSQL orientado a Documento(JSON) mais utilizado.

Jest: É um dos melhores framework de testes em Nodejs.

Swagger-UI: É uma ferramente que permite a criacao de documentacao de API's, seguindo os padroes da "OpenAPI Initiative".

# Requisitos :

Deixar as Porta 8080 e 27017 do seu host local livre, pois serão essas portas que a aplicacão/mongodb ira executar.

Existe Três Maneiras de Subir a Aplicação, Usando Vagrant, Docker ou Maquina Fisica.

# Subir a Aplicacao com Vagrant:
  Acesse a raiz do projeto e rode: 
  
```  
  vagrant up --provider virtualbox
  
```

E aguardar com carinho, pois o tempo depende da internet e poder de processamento do computador.
// Entre 10 a 20 minutos (Somente a Primeira vez).

Comandos Vagrant (execute na raiz do projeto):
  
```  
  Acessar a VM via SSH:  vagrant ssh
  Desligar VM:           vagrant halt
  Excluir VM:            vagrant destroy -f   
```
Lembrando que para usar com Vagrant sera necessario de 3GB RAM livre.


# Subir a Aplicacao com Docker:
  Acesse a raiz do projeto e rode: 
  
```  
  ./dockerup.sh  
```

  Parar a Aplicacao: docker-compose down

  Caso queira persistir os dados do Container MongoDB ao para-lo, execute:

  sudo mkdir -p /var/docker/mongo/data && chmod -R a+rwx /var/docker/mongo/data


# Subir a Aplicacao na Maquina Fisica:
  Acesse a raiz do projeto e rode: 
  
```  
  ./appstart.sh   
```  


# Fluxo de Inicialização da Aplicacao

 1. Baixa e Inicializa uma Instancia Debian no Vagrant; (se usando Vagrant)
 2. Instala docker e docker-compose nessa instancia;    (se usando Vagrant)
 3. Baixa as images do Nodejs e MongoDB no docker;
 4. Docker Faz o Build da Imagem do Nodejs com o Fonte da Aplicacao;
 5. Docker-Compose sobe uma stack com o Container do Nodejs e MongoDB;

# Endereços e Servicos

No Navegador acesse: http://localhost:8080/

Aplicacao Nodejs versão 10: Porta 8080;
 
MongoDB: localhost:27017; 
- Usuario: root 
- Senha:   toor 

Vagrant:
  VM iniciará como private network (host-only) Com IP: 192.168.1.10; 

# Frameworks Utilizadas

- Nodejs com Express, Axios(Requisições Http), Mongoose(MongoDB), Jest(TDD) e Swagger(Documentacao).

# Variáveis de ambiente

- PORT; (Porta para Nodejs ouvir - Padrao 8080);

- MONGO; (IP:PORTA para Node Conectar ao Mongo);
Vagrant: 192.168.1.10:27017
Docker ou Local: 127.0.0.1:27017

# Links e Observações

Para Utilizar Vagrant é necessario ter instalado:

```  
  Vagrant: https://www.vagrantup.com/

  VirtualBox: https://www.virtualbox.org/

```  

Para Utilizar Docker é necessario ter instalado:

```  
  Docker: https://www.docker.com/

  Docker-Compose: https://docs.docker.com/compose/
  
```  

Para Utilizar em Maquina Fisica é necessario ter instalado:

```  
  Nodejs: https://nodejs.org/

  MongoDB: https://www.mongodb.com/

  Usuario e senha MongoDB Devera ser = root : toor 
  
```  
