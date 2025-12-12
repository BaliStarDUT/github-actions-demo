FROM alpine:latest

LABEL org.opencontainers.image.title="Portainer" 

WORKDIR /app

COPY output/x.y.z_linux_amd64 ./xyz

EXPOSE 9000
EXPOSE 8000

CMD ["./xyz"]