# AWS SQS: mensageria e desacoplamento de sistemas - [Curso](https://cursos.alura.com.br/course/aws-sqs-mensageria-desacoplamento-sistemas)

## Sumário:

- [Introdução](#introdução)
- [SignUp API - Presentation Layer](#signup-api---presentation-layer)

## Introdução

Iremos entender como trafegar dados de forma segura entre dois sistemas, como replicar a mensagem para vários tipos de filas diferente (tópico), discutir e entender como se calcula o tempo de visibilidade de uma mensagem, filas FIFO e enviar mensagens através da linguagem Node js

### O que é SQS:

O SQS – Simple Queue Service – É o serviço de mensageria da AWS e, nele, podemos enviar e receber mensagens sem provisionar nenhum servidor. Este modelo é altamente escalável e confiável, pois é a própria AWS que cuida da disponibilidade deste serviço.

Sistema B não recebe a mensagem: Rede não é confiável, indisponibilidade no servidor.
Sistema A coloca a mensagem em um serviço de mensageria
Sistema B, quando disponivel, pergunta pro sistema de mensageria se existe novas mensagens
Mensagem fica salva no broker: gera tolerância a indisponibilidades e resiliencia para as nossas aplicações.

## Trabalhando com AWS SQS via AWS-CLI

### Configurando credenciais:

Criar um usuario na conta da AWS que seja a ponte entre a maquina de desenvolvimento local e o ambiente da nuvem: serviço IAM (Serviço de Gerenciamento de Identidade e Acesso)

Acesso Programático: esse usuário só vai ter acesso de chamadas a API via aplicações ou linha de comando (não terá interface gráfica)
