FROM oven/bun:latest
WORKDIR /app

# Copy package files first for better caching
COPY package.json bun.lock ./
COPY client/package.json ./client/

# Install all dependencies (includes client and server deps)
RUN bun install

# Copy source code
COPY . .

# Build the client frontend (outputs to client/dist)
RUN cd client && bun run build

# Expose the server port
EXPOSE 3000

# Start the production server (serves API + static files)
CMD ["bun", "run", "server/index.ts"]
