FROM node:argon

# Create app directory
RUN mkdir -p /opt/verbshaker
WORKDIR /opt/verbshaker

# Copy app
COPY . /opt/verbshaker

# Install and Deploy
RUN npm run deploy_minimal

# Expose Web Port and Set Start Command
EXPOSE 8080
CMD [ "npm", "start" ]
