# Development Environment Commands
.PHONY: local down-local restart-local status logs clean help

local:
	@echo "🚀 Starting local database environment..."
	docker-compose -f docker-compose.local.yaml up -d
	@echo "✅ Local environment started successfully!"

down-local:
	@echo "🛑 Stopping local database environment..."
	docker-compose -f docker-compose.local.yaml down
	@echo "✅ Local environment stopped successfully!"

restart-local:
	@echo "🔄 Restarting local database environment..."
	docker-compose -f docker-compose.local.yaml restart
	@echo "✅ Local environment restarted successfully!"

status:
	@echo "📈 Database container status:"
	docker-compose -f docker-compose.local.yaml ps

logs:
	@echo "📋 Database container logs:"
	docker-compose -f docker-compose.local.yaml logs -f

logs-pika:
	@echo "📋 Pika database logs:"
	docker-compose -f docker-compose.local.yaml logs -f pika-database

logs-user:
	@echo "📋 User database logs:"
	docker-compose -f docker-compose.local.yaml logs -f user-database

logs-msp:
	@echo "📋 MSP database logs:"
	docker-compose -f docker-compose.local.yaml logs -f msp-database

health:
	@echo "🏥 Checking database health:"
	@docker exec pika_db pg_isready -U postgres -d pika_db && echo "✅ Pika DB: Ready" || echo "❌ Pika DB: Not Ready"
	@docker exec user_db pg_isready -U postgres -d user_db && echo "✅ User DB: Ready" || echo "❌ User DB: Not Ready"
	@docker exec msp_db pg_isready -U postgres -d msp_database && echo "✅ MSP DB: Ready" || echo "❌ MSP DB: Not Ready"

clean:
	@echo "🧹 Cleaning up Docker resources..."
	docker system prune -f
	@echo "✅ Cleanup completed!"

clean-volumes:
	@echo "⚠️  WARNING: This will delete all database data!"
	@read -p "Are you sure you want to continue? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker-compose -f docker-compose.local.yaml down -v; \
		docker volume prune -f; \
		echo "✅ All volumes cleaned!"; \
	else \
		echo "❌ Operation cancelled."; \
	fi

setup:
	@echo "🔧 Setting up development environment..."
	@if [ ! -f .env ]; then \
		echo "📝 Creating .env from .env.example..."; \
		cp .env.example .env; \
		echo "✅ .env file created. Please update database credentials if needed."; \
	else \
		echo "ℹ️  .env file already exists."; \
	fi
	@echo "📦 Installing dependencies..."
	pnpm install
	@echo "✅ Setup completed!"

help:
	@echo "🚀 Abnormal Management - Available Commands:"
	@echo ""
	@echo "Development Environment:"
	@echo "  make local        - Start all database containers"
	@echo "  make down-local   - Stop all database containers"
	@echo "  make restart-local- Restart all database containers"
	@echo "  make status       - Show container status"
	@echo ""
	@echo "Monitoring:"
	@echo "  make logs         - Show logs from all containers"
	@echo "  make logs-pika    - Show Pika database logs"
	@echo "  make logs-user    - Show User database logs"
	@echo "  make logs-msp     - Show MSP database logs"
	@echo "  make health       - Check database health status"
	@echo ""
	@echo "Maintenance:"
	@echo "  make clean        - Clean up Docker resources"
	@echo "  make clean-volumes- Clean up all volumes (DESTRUCTIVE)"
	@echo "  make setup        - Initial project setup"
	@echo "  make help         - Show this help message"

dev:
	@echo "🔥 Starting development server..."
	pnpm run dev
