# Используем официальный образ Nginx как базовый
FROM nginx:alpine

# Копируем ваши файлы приложения в директорию Nginx
COPY . /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
