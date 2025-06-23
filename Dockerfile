FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose port (if needed)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
