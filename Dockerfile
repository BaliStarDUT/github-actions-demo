FROM alpine:3.16  as production

LABEL org.opencontainers.image.title="Portainer" \
  org.opencontainers.image.description="Docker container management made simple, with the world’s most popular GUI-based container management platform." \
  org.opencontainers.image.vendor="Portainer.io" 

COPY output/x.y.z_linux_amd64 /public/portainer

WORKDIR /

EXPOSE 9000
EXPOSE 8000

ENTRYPOINT ["/portainer"]