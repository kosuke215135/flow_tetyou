prod-docker-start:
	docker-compose down && docker-compose up --build -d
local-docker-start:
	docker compose -f docker-compose.yml down && docker compose -f docker-compose.yml up --build -d