# AWS SQS: mensageria e desacoplamento de sistemas - [Curso](https://cursos.alura.com.br/course/aws-sqs-mensageria-desacoplamento-sistemas)

## Sumário:

- [Introdução](#introdução)
- [Trabalhando com AWS SQS via AWS-CLI](#trabalhando-com-aws-sqs-via-aws-cli)
- [Tratamento de Erros](#tratamento-de-errors)

# Introdução

Iremos entender como trafegar dados de forma segura entre dois sistemas, como replicar a mensagem para vários tipos de filas diferente (tópico), discutir e entender como se calcula o tempo de visibilidade de uma mensagem, filas FIFO e enviar mensagens através da linguagem Node js

## O que é SQS:

O SQS – Simple Queue Service – É o serviço de mensageria da AWS e, nele, podemos enviar e receber mensagens sem provisionar nenhum servidor. Este modelo é altamente escalável e confiável, pois é a própria AWS que cuida da disponibilidade deste serviço.

Sistema B não recebe a mensagem: Rede não é confiável, indisponibilidade no servidor.
Sistema A coloca a mensagem em um serviço de mensageria
Sistema B, quando disponivel, pergunta pro sistema de mensageria se existe novas mensagens
Mensagem fica salva no broker: gera tolerância a indisponibilidades e resiliencia para as nossas aplicações.

# Trabalhando com AWS SQS via AWS-CLI

## Configurando credenciais:

Criar um usuario na conta da AWS que seja a ponte entre a maquina de desenvolvimento local e o ambiente da nuvem: serviço IAM (Serviço de Gerenciamento de Identidade e Acesso)

`aws configure`

Acesso Programático: esse usuário só vai ter acesso de chamadas a API via aplicações ou linha de comando (não terá interface gráfica)

## Enviando Mensagem e Recebendo mensagens

` aws sqs send-message help`

` aws sqs receive-message`

## Excluir fila e Criar filas

`aws sqs delete-queue help`

` aws sqs create-queue help`

## Processamento de mensagens

Excluir as mensagens já processadas, como fazer?
Trabalhar com o `ReceiptHandle`

## Visibility Timeout

O que é: Tempo que a aplicação que deve levar para consumir uma mensagem
Ideal: Tempo de Recebimento da Mensagem + Tempo de Processamento + Tempo de exclusão

## Short pooling vs long pooling

`aws sqs receive-message help` - wait time seconds
Procurar sempre usar long pooling nas aplicações para economizar requisições

# Tratamento de Errors

Poison Message - mensagem que o sistema consegue consumir mas não consegue processar, o que acontece com essa mensagem que não consegue ser processada e fica voltando infinitamente pra fila?

## DLQs - Dead Letter Queues

Configuradas como destino de uma fila origem caso a mensagem possa ser uma Poision Message. Após um contador de mensagens não processadas, envia a mensagem para a DLQ.

# Ordem das mensagens

## FIFO e SQS

Mensagens podem chegar fora de odem e podem ser duplicadas.
Para isso utilizamos a FIFO (First In First Out)
Ao utilizar as filas FIFO, se uma mensagem chegar duplicada em menos de 5 minutos, ela será invalidada, caso ela chegue após os 5 minutos, pode haver duplicidade.

### Diferenças

- Taxa de Transferencia:
  - Padrão: Ilimitada
  - FIFO: Alta taxa de transferência
- Entrega:
  - Padrão: Entrega pelo menos uma vez
  - FIFO: Processa exatamente uma vez
- Ordenação:
  - Padrão: Melhor ordenação possível
  - FIFO: Entrega FIFO

### Fila FIFO na prática

_realizado_

# Vários consumidores

Mandar uma mensagem para vários consumidores ao mesmo tempo.
Solução 1: Aplicação manda pra várias filas diferentes (Ex: Sistema Financeiro e Sistema Auditoria). Problema: Aplicação precisa conhecer várias filas. Segundo probela: Cada chamada pra fila SQS demora 70ms, se fosse 10 filas seria 700ms, honerando bastante o sistema.
Solução: Tópico SNS

## Tópico:

Aplicação conhece o Tópico: Envia uma mensagem para várias filas.
Tópico responsavel por notificar as filas que uma nova mensagem existe, não so notificar mas também enviar essas mensagens.
SNS - Serviço de notificação simples

Tópicos desacoplam as inscrições (subscriptions) dos produtores de mensagem (Producers), sendo a única dependência que as aplicações precisam ter o conhecimento.

Arquiteturas orientadas e eventos utilizam tópicos agressivamente, pois a funcionalidade de fan-out se aplica constantemente em sistemas de grande demanda.
O tópico nativo da AWS chama-se SNS.

No SNS, os tipos de inscrições disponíveis são, entre outros: endpoints HTTP, filas SQS e números para envio de SMS.

# Mãos no Código

_Arquivos JS no diretorio_
