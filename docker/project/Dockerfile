FROM node:lts

RUN apt-get update

WORKDIR /home/node
USER node

RUN echo "set -o allexport" >> /home/node/.bashrc
RUN echo "source /.env" >> /home/node/.bashrc
RUN echo "set +o allexport" >> /home/node/.bashrc

ENV HOME  /home/node